import { PrismaService } from '../../../prisma/prisma.service';
import type { CreateEmailConnectionDto } from './dto/create-email-connection.dto';
export declare class EmailVerificationService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createVerification(orgId: string, dto: CreateEmailConnectionDto): Promise<{
        data: unknown;
    }>;
    verifyConnection(orgId: string): Promise<{
        data: unknown;
    }>;
}
