import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private readonly logger;
    private resend;
    constructor(configService: ConfigService);
    sendInviteEmail(recipientEmail: string, recipientName: string, inviterName: string, inviteLink: string): Promise<void>;
    sendWelcomeEmail(email: string, name: string, dashboardUrl: string): Promise<void>;
    private sendEmail;
}
