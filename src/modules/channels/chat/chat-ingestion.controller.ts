import { BadRequestException, Body, Controller, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../../prisma/prisma.service';
import { Public } from '../../../common/decorators/public.decorator';
import { ChatService } from './chat.service';

@ApiTags('chat-ingestion')
@Controller('chat')
export class ChatIngestionController {
  private readonly logger = new Logger(ChatIngestionController.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('sessions')
  @Public()
  @ApiOperation({ summary: 'Start a new chat session' })
  async startSession(@Body() dto: { widgetId: string; visitorId: string }) {
    return this.chatService.startSession(dto.widgetId, dto.visitorId);
  }

  @Post('sessions/:sessionId/messages')
  @Public()
  @ApiOperation({ summary: 'Send a chat message (visitor → agent)' })
  async sendMessage(
    @Param('sessionId') sessionId: string,
    @Body() dto: { widgetId: string; text: string; visitorEmail?: string },
  ) {
    // Find org by widgetId
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: 'CHAT', status: 'ACTIVE' },
    });

    if (!connection) {
      throw new BadRequestException('Chat channel not configured');
    }

    const cfg = connection.config as Record<string, unknown>;
    if (cfg.widgetId !== dto.widgetId) {
      throw new BadRequestException('Invalid widget ID');
    }

    return this.chatService.sendMessage(
      connection.organizationId,
      sessionId,
      dto.text,
      dto.visitorEmail,
    );
  }

  @Get('sessions/:sessionId/messages')
  @Public()
  @ApiOperation({ summary: 'Get chat messages (widget polls for new messages)' })
  async getMessages(
    @Param('sessionId') sessionId: string,
    @Query('widgetId') widgetId: string,
    @Query('since') since?: string,
  ) {
    // Find org by widgetId
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: 'CHAT', status: 'ACTIVE' },
    });

    if (!connection) {
      throw new BadRequestException('Chat channel not configured');
    }

    const cfg = connection.config as Record<string, unknown>;
    if (cfg.widgetId !== widgetId) {
      throw new BadRequestException('Invalid widget ID');
    }

    return this.chatService.getMessages(connection.organizationId, sessionId, since);
  }

  @Patch('sessions/:sessionId')
  @Public()
  @ApiOperation({ summary: 'Update session with email (visitor provides email)' })
  async updateSession(
    @Param('sessionId') sessionId: string,
    @Body() dto: { widgetId: string; email: string },
  ) {
    // Find org by widgetId
    const connection = await this.prisma.channelConnection.findFirst({
      where: { channel: 'CHAT', status: 'ACTIVE' },
    });

    if (!connection) {
      throw new BadRequestException('Chat channel not configured');
    }

    const cfg = connection.config as Record<string, unknown>;
    if (cfg.widgetId !== dto.widgetId) {
      throw new BadRequestException('Invalid widget ID');
    }

    return this.chatService.updateSession(
      connection.organizationId,
      sessionId,
      dto.email,
    );
  }
}
