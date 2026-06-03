import { UserRole, UserStatus } from '../../../generated/prisma/enums';
export declare class UpdateUserDto {
    role?: UserRole;
    status?: UserStatus;
}
