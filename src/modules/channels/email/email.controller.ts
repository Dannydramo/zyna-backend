import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentOrg } from '../../../common/decorators/current-org.decorator';
import { OrgGuard } from '../../../common/guards/org.guard';
import { EmailVerificationService } from './email-verification.service';
import { CreateEmailConnectionDto } from './dto/create-email-connection.dto';

@ApiTags('channels-email')
@UseGuards(OrgGuard)
@Controller('channels/email')
export class EmailController {
  constructor(private readonly verificationService: EmailVerificationService) {}

  @Post()
  @ApiOperation({
    summary:
      'Create/update email channel connection and generate DNS records for verification',
  })
  createConnection(
    @CurrentOrg() orgId: string,
    @Body() dto: CreateEmailConnectionDto,
  ) {
    return this.verificationService.createVerification(orgId, dto);
  }

  @Post('verify')
  @ApiOperation({
    summary:
      'Verify DNS records and activate email channel (calls provider verify API)',
  })
  verify(@CurrentOrg() orgId: string) {
    return this.verificationService.verifyConnection(orgId);
  }
}
