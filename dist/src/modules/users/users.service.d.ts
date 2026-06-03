import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { UpdateUserDto } from './dto/update-user.dto';
import type { InviteUserDto } from './dto/invite-user.dto';
import type { AcceptInviteDto } from './dto/accept-invite.dto';
import { EmailService } from '../email/email.service';
export declare class UsersService {
    private readonly prisma;
    private readonly emailService;
    private readonly configService;
    constructor(prisma: PrismaService, emailService: EmailService, configService: ConfigService);
    findAll(orgId: string): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        }[];
    }>;
    update(orgId: string, id: string, dto: UpdateUserDto, actor: RequestUser): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
    invite(orgId: string, dto: InviteUserDto, actor: RequestUser): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
    acceptInvite(dto: AcceptInviteDto): Promise<{
        data: {
            id: string;
            name: string;
            organizationId: string;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
}
