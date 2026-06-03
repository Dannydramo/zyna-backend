import { Injectable, Logger } from '@nestjs/common';
import type { Channel } from '../../../generated/prisma/enums';
import type { ChannelSender, ChannelSenderInput, ChannelSenderOutput } from '../dispatcher/channel-sender.interface';

@Injectable()
export class ChatSender implements ChannelSender {
  readonly channel: Channel = 'CHAT';
  private readonly logger = new Logger(ChatSender.name);
  private socketConnections: Map<string, unknown> = new Map();

  constructor() {}

  registerSocket(visitorId: string, socket: unknown) {
    this.socketConnections.set(visitorId, socket);
    this.logger.debug(`Chat socket registered for visitor: ${visitorId}`);
  }

  unregisterSocket(visitorId: string) {
    this.socketConnections.delete(visitorId);
  }

  async send(input: ChannelSenderInput): Promise<ChannelSenderOutput> {
    const messageId = `chat-${input.message.id}`;

    // In a real implementation, emit over socket.io
    // For now, just track the message
    this.logger.log(`Chat message queued for ${input.to}: ${messageId}`);

    return {
      providerMessageId: messageId,
      status: 'sent',
    };
  }
}
