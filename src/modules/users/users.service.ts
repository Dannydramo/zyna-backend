import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditActorType } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { InviteUserDto } from './dto/invite-user.dto';
import type { AcceptInviteDto } from './dto/accept-invite.dto';
import { EmailService } from '../email/email.service';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(orgId: string) {
    const users = await this.prisma.user.findMany({
      where: { organizationId: orgId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { name: 'asc' },
    });
    return { data: users };
  }

  async update(
    orgId: string,
    id: string,
    dto: UpdateUserDto,
    actor: RequestUser,
  ) {
    const existing = await this.prisma.user.findFirst({
      where: { id, organizationId: orgId },
    });
    if (!existing) throw new NotFoundException(`User ${id} not found`);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.role !== undefined && { role: dto.role }),
        ...(dto.status !== undefined && { status: dto.status }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.USER,
        actorId: actor.sub,
        action: 'UPDATE',
        entityType: 'User',
        entityId: id,
        metadata: dto as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });

    return { data: user };
  }

  async invite(orgId: string, dto: InviteUserDto, actor: RequestUser) {
    // Check if user already exists in organization
    const existing = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
        organizationId: orgId,
      },
    });

    if (existing) {
      throw new ConflictException(
        `User with email ${dto.email} already exists in this organization`,
      );
    }

    // Generate invite token (random + expires in 7 days)
    const inviteToken = randomBytes(32).toString('hex');
    const inviteTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Create new user with PENDING status
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        role: dto.role,
        organizationId: orgId,
        inviteToken,
        inviteTokenExpiresAt,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    // Log the invite action
    await this.prisma.auditRecord.create({
      data: {
        organizationId: orgId,
        actorType: AuditActorType.USER,
        actorId: actor.sub,
        action: 'INVITE',
        entityType: 'User',
        entityId: user.id,
        metadata: {
          email: dto.email,
          name: dto.name,
          role: dto.role,
        } as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });

    // Build invite link
    const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
    const inviteLink = `${frontendUrl}/invite/${inviteToken}`;

    // Send invite email
    try {
      const inviterUser = await this.prisma.user.findFirst({
        where: { id: actor.sub },
      });
      const inviterName = inviterUser?.name || 'Your team';

      await this.emailService.sendInviteEmail(
        dto.email,
        dto.name,
        inviterName,
        inviteLink,
      );
    } catch (error) {
      console.error('Failed to send invite email:', error);
      // Don't fail the invite if email fails - user is created, just log the error
    }

    return { data: user };
  }

  async acceptInvite(dto: AcceptInviteDto) {
    // Find user by invite token
    const user = await this.prisma.user.findFirst({
      where: {
        inviteToken: dto.token,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired invite token');
    }

    // Check if token is expired
    if (user.inviteTokenExpiresAt && user.inviteTokenExpiresAt < new Date()) {
      throw new BadRequestException('Invite token has expired');
    }

    // Hash the password
    const passwordHash = createHash('sha256')
      .update(dto.password)
      .digest('hex');

    // Update user: set password, clear invite token
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        inviteToken: null,
        inviteTokenExpiresAt: null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        organizationId: true,
      },
    });

    // Log the acceptance
    await this.prisma.auditRecord.create({
      data: {
        organizationId: user.organizationId,
        actorType: AuditActorType.USER,
        actorId: user.id,
        action: 'ACCEPT_INVITE',
        entityType: 'User',
        entityId: user.id,
        metadata: { email: user.email } as unknown as Parameters<
          typeof this.prisma.auditRecord.create
        >[0]['data']['metadata'],
      },
    });

    // Send welcome email
    try {
      const frontendUrl = this.configService.get('FRONTEND_URL') || 'http://localhost:3000';
      await this.emailService.sendWelcomeEmail(
        user.email,
        user.name,
        `${frontendUrl}/dashboard`,
      );
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }

    return { data: updatedUser };
  }
}
