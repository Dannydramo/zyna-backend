import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { WhatsAppService } from './whatsapp.service';
import { WhatsAppController } from './whatsapp.controller';
import { WhatsAppIngestionController } from './whatsapp-ingestion.controller';

@Module({
  imports: [PrismaModule],
  providers: [WhatsAppService],
  controllers: [WhatsAppController, WhatsAppIngestionController],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}
