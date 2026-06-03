import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import type { RequestUser } from '../../common/decorators/current-user.decorator';
import type { LoginDto } from './dto/login.dto';
import type { SignupDto } from './dto/signup.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly logger;
    constructor(prisma: PrismaService, jwt: JwtService);
    signup(dto: SignupDto): Promise<{
        data: {
            accessToken: string;
            user: {
                id: string;
                organizationId: string;
                email: string;
                name: string;
                role: string;
                status: string;
            };
        };
    }>;
    login(dto: LoginDto): Promise<{
        data: {
            accessToken: string;
            user: {
                id: string;
                organizationId: string;
                email: string;
                name: string;
                role: string;
                status: string;
            };
        };
    }>;
    me(user: RequestUser): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            organizationId: string;
            email: string;
            role: UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
    private buildAuthResponse;
}
