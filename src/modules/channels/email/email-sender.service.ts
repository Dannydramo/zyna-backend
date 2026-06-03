import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';

@Injectable()
export class EmailSender implements ChannelSender {
  readonly channel: Channel = 'EMAIL';
  private readonly logger = new Logger(EmailSender.name);

  constructor(private readonly config: ConfigService) {}

  async send(input: ChannelSenderInput): Promise<ChannelSenderOutput> {
    const cfg = input.org.config as {
      fromAddress: string;
      fromName: string;
    };

    const host = this.config.get<string>('SMTP_HOST');
    if (!host) {
      this.logger.warn('SMTP_HOST not configured; email send will fail');
      throw new Error('SMTP not configured');
    }

    const transport = nodemailer.createTransport({
      host,
      port: Number(this.config.get<string>('SMTP_PORT') ?? 587),
      secure: this.config.get<string>('SMTP_SECURE') === 'true',
      auth: this.config.get<string>('SMTP_USER')
        ? {
            user: this.config.get<string>('SMTP_USER'),
            pass: this.config.get<string>('SMTP_PASS'),
          }
        : undefined,
    });

    // Threading headers for email conversations
    const messageId = `<${input.message.id}@zyna-support>`;
    const headers = input.message.headers as Record<string, unknown> | null; 
    const inReplyTo = (headers?.inReplyTo as string | undefined) || undefined;
    const references = (headers?.references as string | undefined) || undefined;

    try {
      const info = await transport.sendMail({
        from: `${cfg.fromName} <${cfg.fromAddress}>`,
        to: input.to,
        subject: 'Your support response',
        text: input.message.body,
        messageId,
        inReplyTo,
        references,
      });

      this.logger.log(`Email sent from ${cfg.fromAddress} to ${input.to}; id=${info.messageId}`);

      return {
        providerMessageId: info.messageId || `local-${input.message.id}`,
        status: 'sent',
      };
    } finally {
      await transport.close();
    }
  }
}
