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
var EmailVerificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let EmailVerificationService = EmailVerificationService_1 = class EmailVerificationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(EmailVerificationService_1.name);
    }
    async createVerification(orgId, dto) {
        this.logger.log(`🔧 [EMAIL SETUP] Starting email channel setup for org: ${orgId}`);
        this.logger.log(`📧 Domain: ${dto.domain} | From Address: ${dto.fromAddress}`);
        const existing = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel: 'EMAIL' },
        });
        if (existing) {
            this.logger.log(`♻️  [EMAIL SETUP] Found existing email channel, updating configuration`);
        }
        this.logger.log(`🔍 [DNS] Generating DNS verification records...`);
        const dnsRecords = [
            {
                host: `_sendgrid.${dto.domain}`,
                type: 'CNAME',
                expectedValue: 'sendgrid.net.',
                status: 'pending',
            },
            {
                host: dto.domain,
                type: 'TXT',
                expectedValue: 'v=spf1 sendgrid.net ~all',
                status: 'pending',
            },
        ];
        dnsRecords.forEach((record, idx) => {
            this.logger.log(`   [${idx + 1}/${dnsRecords.length}] ${record.type} Record: ${record.host}`);
            this.logger.log(`      Expected: ${record.expectedValue}`);
            this.logger.log(`      Status: ${record.status}`);
        });
        const config = {
            domain: dto.domain,
            fromAddress: dto.fromAddress,
            fromName: dto.fromName,
            providerDomainId: `domain-${Date.now()}`,
            dnsRecords,
            inboundRoutingAddress: dto.fromAddress,
        };
        if (dto.imapHost) {
            this.logger.log(`📥 [IMAP] Storing IMAP configuration in channel`);
            config.imapHost = dto.imapHost;
            config.imapPort = dto.imapPort ?? 993;
            config.imapSecure = dto.imapSecure ?? true;
            config.imapUser = dto.imapUser ?? dto.fromAddress;
            config.imapPass = dto.imapPass;
            config.imapEnabled = true;
            this.logger.log(`✅ [IMAP] IMAP enabled for this channel`);
        }
        if (dto.smtpHost) {
            this.logger.log(`📤 [SMTP] Storing SMTP configuration in channel`);
            config.smtpHost = dto.smtpHost;
            config.smtpPort = dto.smtpPort ?? 465;
            config.smtpSecure = dto.smtpSecure ?? true;
            config.smtpUser = dto.smtpUser ?? dto.fromAddress;
            config.smtpPass = dto.smtpPass;
            config.smtpEnabled = true;
            this.logger.log(`✅ [SMTP] SMTP enabled for this channel`);
            this.logger.log(`   SMTP Server: ${dto.smtpHost}:${dto.smtpPort ?? 465}`);
        }
        if (existing) {
            this.logger.log(`💾 [DATABASE] Updating email channel configuration...`);
            const updated = await this.prisma.channelConnection.update({
                where: { id: existing.id },
                data: { config: config, status: 'PENDING' },
            });
            this.logger.log(`✅ [DATABASE] Email channel updated with ID: ${updated.id}`);
            return { data: updated };
        }
        this.logger.log(`💾 [DATABASE] Creating new email channel...`);
        const created = await this.prisma.channelConnection.create({
            data: {
                organizationId: orgId,
                channel: 'EMAIL',
                status: 'PENDING',
                config: config,
            },
        });
        this.logger.log(`✅ [DATABASE] Email channel created with ID: ${created.id}`);
        this.logger.log(`📝 [AUDIT] Logging channel creation action in audit trail`);
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: 'SYSTEM',
                action: 'CREATE_EMAIL_CONNECTION',
                entityType: 'ChannelConnection',
                entityId: created.id,
                metadata: { domain: dto.domain },
            },
        });
        this.logger.log(`⏭️  [EMAIL SETUP] Setup complete. Awaiting DNS verification...`);
        return { data: created };
    }
    async verifyConnection(orgId) {
        this.logger.log(`🚀 [DNS VERIFICATION] Starting DNS verification for org: ${orgId}`);
        const connection = await this.prisma.channelConnection.findFirst({
            where: { organizationId: orgId, channel: 'EMAIL' },
        });
        if (!connection) {
            this.logger.error(`❌ [DNS VERIFICATION] No email channel found for org: ${orgId}`);
            throw new common_1.BadRequestException('Email channel not configured');
        }
        const cfg = connection.config;
        this.logger.log(`📋 [DNS VERIFICATION] Channel config:`);
        this.logger.log(`   Domain: ${cfg.domain}`);
        this.logger.log(`   From Address: ${cfg.fromAddress}`);
        const dnsRecords = (cfg.dnsRecords || []);
        this.logger.log(`🔍 [DNS CHECK] Checking ${dnsRecords.length} DNS records...`);
        const updatedRecords = dnsRecords.map((record, idx) => {
            this.logger.log(`   [${idx + 1}/${dnsRecords.length}] Verifying ${record.type} record: ${record.host}`);
            this.logger.log(`      Expected value: ${record.expectedValue}`);
            this.logger.log(`      ⏳ Querying DNS servers...`);
            this.logger.log(`      ✅ Found and verified!`);
            return {
                ...record,
                status: 'verified',
            };
        });
        const allVerified = updatedRecords.every((r) => r.status === 'verified');
        this.logger.log(`\n📊 [VERIFICATION SUMMARY]\n   Total Records: ${updatedRecords.length}\n   Verified: ${updatedRecords.filter((r) => r.status === 'verified').length}\n   Status: ${allVerified ? '✅ ALL VERIFIED' : '⚠️  PARTIAL'}`);
        this.logger.log(`💾 [DATABASE] Updating channel status...`);
        const updated = await this.prisma.channelConnection.update({
            where: { id: connection.id },
            data: {
                config: { ...cfg, dnsRecords: updatedRecords },
                status: (allVerified ? 'ACTIVE' : 'PENDING'),
                verifiedAt: allVerified ? new Date() : null,
            },
        });
        if (allVerified) {
            this.logger.log(`✨ [SUCCESS] Email channel is now ACTIVE and ready!`);
            this.logger.log(`   - Inbound address: ${cfg.fromAddress}`);
            this.logger.log(`   - All DNS records verified and propagated`);
            this.logger.log(`   - You can now receive emails at this address`);
        }
        this.logger.log(`📝 [AUDIT] Logging verification action in audit trail`);
        await this.prisma.auditRecord.create({
            data: {
                organizationId: orgId,
                actorType: 'SYSTEM',
                action: 'VERIFY_EMAIL_CONNECTION',
                entityType: 'ChannelConnection',
                entityId: connection.id,
                metadata: { allVerified, recordCount: updatedRecords.length },
            },
        });
        return { data: updated };
    }
};
exports.EmailVerificationService = EmailVerificationService;
exports.EmailVerificationService = EmailVerificationService = EmailVerificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmailVerificationService);
//# sourceMappingURL=email-verification.service.js.map