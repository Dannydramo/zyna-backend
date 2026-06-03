import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Logger, BadRequestException } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../../prisma/prisma.service';
import { IngestionService } from '../../ingestion/ingestion.service';
import { ChatSender } from './chat-sender.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server!: Server;
  private readonly logger = new Logger(ChatGateway.name);
  private visitorSockets: Map<string, string> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly ingestionService: IngestionService,
    private readonly chatSender: ChatSender,
  ) {}

  async handleConnection(client: Socket) {
    const widgetId = client.handshake.auth?.widgetId;
    const visitorId = client.handshake.auth?.visitorId;

    if (!widgetId || !visitorId) {
      client.disconnect();
      return;
    }

    // Verify widget ID is valid (belongs to an active chat channel)
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: 'CHAT' },
    });

    if (!connection) {
      client.disconnect();
      return;
    }

    const cfg = connection.config as Record<string, unknown>;
    if (cfg.widgetId !== widgetId) {
      client.disconnect();
      return;
    }

    this.visitorSockets.set(visitorId, client.id);
    this.chatSender.registerSocket(visitorId, client);
    this.logger.log(`Chat visitor connected: ${visitorId}`);
  }

  async handleDisconnect(client: Socket) {
    for (const [visitorId, socketId] of this.visitorSockets) {
      if (socketId === client.id) {
        this.visitorSockets.delete(visitorId);
        this.chatSender.unregisterSocket(visitorId);
        this.logger.log(`Chat visitor disconnected: ${visitorId}`);
        break;
      }
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: { widgetId: string; visitorId: string; text: string },
  ) {
    const { visitorId, text } = payload;

    // Find the org for this widget
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: 'CHAT' },
    });

    if (!connection) {
      throw new BadRequestException('Chat channel not configured');
    }

    // Ingest as email-like message (simplified)
    // In production, parse visitorEmail, map to customer, etc.
    await this.ingestionService.ingestEmail(connection.organizationId, {
      fromEmail: `${visitorId}@chat`,
      subject: 'Chat Message',
      body: text,
      messageId: `chat-${Date.now()}`,
      threadId: visitorId,
    } as any);

    return { ok: true };
  }
}
