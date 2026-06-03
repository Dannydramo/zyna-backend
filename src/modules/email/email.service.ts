import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend | null = null;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    if (apiKey) {
      this.resend = new Resend(apiKey);
    }
  }

  async sendInviteEmail(
    recipientEmail: string,
    recipientName: string,
    inviterName: string,
    inviteLink: string,
  ): Promise<void> {
    const subject = `You're invited to join ${inviterName}'s team on Zyna`;

    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px; }
            .button { background: #667eea; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Zyna!</h1>
            </div>
            <div class="content">
              <p>Hi ${recipientName},</p>

              <p>${inviterName} has invited you to join their team on <strong>Zyna</strong> - a customer support platform.</p>

              <p>Click the button below to accept the invitation and set up your account:</p>

              <center>
                <a href="${inviteLink}" class="button">Accept Invitation</a>
              </center>

              <p style="color: #6b7280; font-size: 14px;">
                Or copy and paste this link in your browser:
                <br/>
                <code>${inviteLink}</code>
              </p>

              <p>This link will expire in 7 days. If you didn't expect this invitation, you can ignore this email.</p>

              <div class="footer">
                <p>© 2026 Zyna. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: recipientEmail,
      subject,
      html: htmlBody,
    });
  }

  async sendWelcomeEmail(
    email: string,
    name: string,
    dashboardUrl: string,
  ): Promise<void> {
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 40px 20px; border-radius: 0 0 8px 8px; }
            .button { background: #667eea; color: white; padding: 12px 32px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Zyna, ${name}!</h1>
            </div>
            <div class="content">
              <p>Your account is ready to go! You can now log in and start managing support tickets.</p>

              <center>
                <a href="${dashboardUrl}" class="button">Go to Dashboard</a>
              </center>

              <p>If you have any questions, feel free to reach out to your team.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.sendEmail({
      to: email,
      subject: `Welcome to Zyna, ${name}!`,
      html: htmlBody,
    });
  }

  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    // If Resend is not configured, just log
    if (!this.resend) {
      this.logger.warn('Resend API key not configured, logging email instead');
      this.logger.log(`[EMAIL] ${options.subject} → ${options.to}`);
      return;
    }

    try {
      const fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';

      const result = await this.resend.emails.send({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      if (result.error) {
        this.logger.error(`Failed to send email: ${result.error.message}`);
        throw new Error(`Email send failed: ${result.error.message}`);
      }

      this.logger.log(`Email sent to ${options.to}: ${options.subject}`);
    } catch (error) {
      this.logger.error(
        `Error sending email: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw error;
    }
  }
}
