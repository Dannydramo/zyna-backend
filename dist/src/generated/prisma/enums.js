"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStatus = exports.ChannelStatus = exports.AuditActorType = exports.MessageAuthorType = exports.MessageDirection = exports.SlaState = exports.AiStatus = exports.TicketPriority = exports.TicketStatus = exports.Channel = exports.UserStatus = exports.UserRole = void 0;
exports.UserRole = {
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    AGENT: 'AGENT'
};
exports.UserStatus = {
    AVAILABLE: 'AVAILABLE',
    AWAY: 'AWAY',
    BUSY: 'BUSY'
};
exports.Channel = {
    EMAIL: 'EMAIL',
    CHAT: 'CHAT',
    WHATSAPP: 'WHATSAPP'
};
exports.TicketStatus = {
    NEW: 'NEW',
    OPEN: 'OPEN',
    PENDING: 'PENDING',
    SOLVED: 'SOLVED',
    CLOSED: 'CLOSED'
};
exports.TicketPriority = {
    LOW: 'LOW',
    NORMAL: 'NORMAL',
    HIGH: 'HIGH',
    URGENT: 'URGENT'
};
exports.AiStatus = {
    NONE: 'NONE',
    SUGGESTED: 'SUGGESTED',
    RESOLVED: 'RESOLVED'
};
exports.SlaState = {
    OK: 'OK',
    WARNING: 'WARNING',
    BREACHED: 'BREACHED'
};
exports.MessageDirection = {
    INBOUND: 'INBOUND',
    OUTBOUND: 'OUTBOUND'
};
exports.MessageAuthorType = {
    CUSTOMER: 'CUSTOMER',
    AGENT: 'AGENT',
    AI: 'AI'
};
exports.AuditActorType = {
    USER: 'USER',
    AI: 'AI',
    SYSTEM: 'SYSTEM'
};
exports.ChannelStatus = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    ERROR: 'ERROR'
};
exports.DeliveryStatus = {
    PENDING: 'PENDING',
    SENT: 'SENT',
    DELIVERED: 'DELIVERED',
    FAILED: 'FAILED'
};
//# sourceMappingURL=enums.js.map