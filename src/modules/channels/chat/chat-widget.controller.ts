import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Public } from '../../../common/decorators/public.decorator';

// Public controller - no auth required for widget script
@Controller('chat-widget.js')
export class ChatWidgetController {
  @Get()
  @Public()
  serveWidget(@Res() res: Response) {
    try {
      // In production dist folder: dist/src/modules/channels/chat/
      // We need to go up to dist/src then to dist/public
      const widgetPath = join(__dirname, '..', '..', '..', '..', '..', 'public', 'chat-widget.js');
      const script = readFileSync(widgetPath, 'utf-8');
      res.setHeader('Content-Type', 'application/javascript');
      res.send(script);
    } catch (error) {
      // Fallback: try from project root
      try {
        const fallbackPath = join(process.cwd(), 'public', 'chat-widget.js');
        const script = readFileSync(fallbackPath, 'utf-8');
        res.setHeader('Content-Type', 'application/javascript');
        res.send(script);
      } catch (err) {
        console.error('Widget not found:', error);
        res.status(404).send('Widget script not found');
      }
    }
  }
}
