import { EmailVerificationService } from './email-verification.service';
import { CreateEmailConnectionDto } from './dto/create-email-connection.dto';
export declare class EmailController {
    private readonly verificationService;
    constructor(verificationService: EmailVerificationService);
    createConnection(orgId: string, dto: CreateEmailConnectionDto): Promise<{
        data: unknown;
    }>;
    verify(orgId: string): Promise<{
        data: unknown;
    }>;
}
