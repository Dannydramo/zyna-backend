export declare class CreateEmailConnectionDto {
    domain: string;
    fromAddress: string;
    fromName: string;
    imapHost?: string;
    imapPort?: number;
    imapSecure?: boolean;
    imapUser?: string;
    imapPass?: string;
    smtpHost?: string;
    smtpPort?: number;
    smtpSecure?: boolean;
    smtpUser?: string;
    smtpPass?: string;
}
