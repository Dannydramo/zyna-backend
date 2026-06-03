import { RequestUser } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            role: import("../../generated/prisma/enums").UserRole;
            status: import("../../generated/prisma/enums").UserStatus;
        };
    }>;
}
