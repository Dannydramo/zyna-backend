export declare class SendEmailDto {
    to: string;
    subject: string;
    body: string;
    from?: string;
    inReplyTo?: string;
    smtpConfig?: {
        host?: string;
        port?: number;
        secure?: boolean;
        user?: string;
        pass?: string;
    };
}
