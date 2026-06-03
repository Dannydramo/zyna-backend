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
exports.ListTicketsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../common/dto/pagination.dto");
const enums_1 = require("../../../generated/prisma/enums");
class ListTicketsDto extends pagination_dto_1.PaginationDto {
}
exports.ListTicketsDto = ListTicketsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['all', 'assigned', 'unassigned', 'ai-handled'],
        description: 'Filter tickets by category',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "tab", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.TicketStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.TicketStatus),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.Channel }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.Channel),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "channel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.TicketPriority }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.TicketPriority),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: enums_1.AiStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.AiStatus),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "aiStatus", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter by assignee ID' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "assigneeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Search by subject, customer name, or email',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListTicketsDto.prototype, "q", void 0);
//# sourceMappingURL=list-tickets.dto.js.map