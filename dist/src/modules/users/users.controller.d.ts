import { RequestUser } from '../../common/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(orgId: string, user: RequestUser, id: string, dto: UpdateUserDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
    invite(orgId: string, user: RequestUser, dto: InviteUserDto): Promise<{
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
