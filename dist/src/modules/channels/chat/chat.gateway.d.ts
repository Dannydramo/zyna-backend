import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../../prisma/prisma.service';
import { IngestionService } from '../../ingestion/ingestion.service';
import { ChatSender } from './chat-sender.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    private readonly ingestionService;
    private readonly chatSender;
    server: Server;
    private readonly logger;
    private visitorSockets;
    constructor(prisma: PrismaService, ingestionService: IngestionService, chatSender: ChatSender);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleMessage(payload: {
        widgetId: string;
        visitorId: string;
        text: string;
    }): Promise<{
        ok: boolean;
    }>;
}
