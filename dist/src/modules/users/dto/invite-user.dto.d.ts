import { UserRole } from '../../../generated/prisma/enums';
export declare class InviteUserDto {
    email: string;
    name: string;
    role: UserRole;
}
