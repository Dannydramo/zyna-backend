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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailConnectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateEmailConnectionDto {
}
exports.CreateEmailConnectionDto = CreateEmailConnectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The sending domain (e.g. example.com)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The sending email address (e.g. support@example.com)' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "fromAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The display name for outbound emails' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "fromName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMAP host for receiving emails (e.g. imap.gmail.com)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "imapHost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMAP port (default 993)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEmailConnectionDto.prototype, "imapPort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Use SSL/TLS for IMAP (default true)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEmailConnectionDto.prototype, "imapSecure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMAP username (default: fromAddress)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "imapUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'IMAP password', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "imapPass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SMTP host for sending emails (e.g. smtp.gmail.com)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "smtpHost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SMTP port (typically 465 for SSL or 587 for TLS)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateEmailConnectionDto.prototype, "smtpPort", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Use SSL/TLS for SMTP (default true)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateEmailConnectionDto.prototype, "smtpSecure", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SMTP username (default: fromAddress)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "smtpUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'SMTP password (your email account password)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmailConnectionDto.prototype, "smtpPass", void 0);
//# sourceMappingURL=create-email-connection.dto.js.map