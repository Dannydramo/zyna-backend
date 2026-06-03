"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const resend_1 = require("resend");
let EmailService = EmailService_1 = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EmailService_1.name);
        this.resend = null;
        const apiKey = this.configService.get('RESEND_API_KEY');
        if (apiKey) {
            this.resend = new resend_1.Resend(apiKey);
        }
    }
    async sendInviteEmail(recipientEmail, recipientName, inviterName, inviteLink) {
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
    async sendWelcomeEmail(email, name, dashboardUrl) {
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
    async sendEmail(options) {
        if (!this.resend) {
            this.logger.warn('Resend API key not configured, logging email instead');
            this.logger.log(`[EMAIL] ${options.subject} → ${options.to}`);
            return;
        }
        try {
            const fromEmail = this.configService.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
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
        }
        catch (error) {
            this.logger.error(`Error sending email: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map