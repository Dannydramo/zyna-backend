import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuditActorType, UserRole } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { LoginDto } from './dto/login.dto';
import type { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });
    if (existing) throw new ConflictException('Email is already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const org = await this.prisma.organization.create({
      data: {
        name: dto.organizationName,
        users: {
          create: {
            email: dto.email,
            name: dto.name,
            passwordHash,
            role: UserRole.ADMIN,
          },
        },
        slaPolicies: {
          create: {
            name: 'Default support SLA',
            firstResponseMinutes: 60,
            resolutionMinutes: 1440,
          },
        },
      },
      include: { users: true },
    });

    const user = org.users[0];
    await this.prisma.auditRecord.create({
      data: {
        organizationId: org.id,
        actorType: AuditActorType.USER,
        actorId: user.id,
        action: 'SIGNUP',
        entityType: 'Organization',
        entityId: org.id,
        metadata: { email: user.email },
      },
    });

    return { data: this.buildAuthResponse(user) };
  }

  async login(dto: LoginDto) {

    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!user) {
      this.logger.warn(`User not found: ${dto.email}`);
      throw new NotFoundException('Invalid email or password');
    }

    this.logger.debug(`User found: ${user.email}, comparing password...`);

    if (!user.passwordHash) {
      this.logger.warn(`No password set for user: ${dto.email} (invite pending)`);
      throw new NotFoundException('Invalid email or password');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);

    if (!ok) {
   
      throw new NotFoundException('Invalid email or password');
    }
    return { data: this.buildAuthResponse(user) };
  }

  async me(user: RequestUser) {
    const record = await this.prisma.user.findFirst({
      where: { id: user.sub, organizationId: user.organizationId },
      select: {
        id: true,
        organizationId: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });
    if (!record) throw new UnauthorizedException();
    return { data: record };
  }

  private buildAuthResponse(user: {
    id: string;
    organizationId: string;
    email: string;
    name: string;
    role: string;
    status: string;
  }) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      organizationId: user.organizationId,
      email: user.email,
      role: user.role,
    });
    return {
      accessToken,
      user: {
        id: user.id,
        organizationId: user.organizationId,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
      },
    };
  }
}
