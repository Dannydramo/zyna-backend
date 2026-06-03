export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly MANAGER: "MANAGER";
    readonly AGENT: "AGENT";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly AVAILABLE: "AVAILABLE";
    readonly AWAY: "AWAY";
    readonly BUSY: "BUSY";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const Channel: {
    readonly EMAIL: "EMAIL";
    readonly CHAT: "CHAT";
    readonly WHATSAPP: "WHATSAPP";
};
export type Channel = (typeof Channel)[keyof typeof Channel];
export declare const TicketStatus: {
    readonly NEW: "NEW";
    readonly OPEN: "OPEN";
    readonly PENDING: "PENDING";
    readonly SOLVED: "SOLVED";
    readonly CLOSED: "CLOSED";
};
export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];
export declare const TicketPriority: {
    readonly LOW: "LOW";
    readonly NORMAL: "NORMAL";
    readonly HIGH: "HIGH";
    readonly URGENT: "URGENT";
};
export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];
export declare const AiStatus: {
    readonly NONE: "NONE";
    readonly SUGGESTED: "SUGGESTED";
    readonly RESOLVED: "RESOLVED";
};
export type AiStatus = (typeof AiStatus)[keyof typeof AiStatus];
export declare const SlaState: {
    readonly OK: "OK";
    readonly WARNING: "WARNING";
    readonly BREACHED: "BREACHED";
};
export type SlaState = (typeof SlaState)[keyof typeof SlaState];
export declare const MessageDirection: {
    readonly INBOUND: "INBOUND";
    readonly OUTBOUND: "OUTBOUND";
};
export type MessageDirection = (typeof MessageDirection)[keyof typeof MessageDirection];
export declare const MessageAuthorType: {
    readonly CUSTOMER: "CUSTOMER";
    readonly AGENT: "AGENT";
    readonly AI: "AI";
};
export type MessageAuthorType = (typeof MessageAuthorType)[keyof typeof MessageAuthorType];
export declare const AuditActorType: {
    readonly USER: "USER";
    readonly AI: "AI";
    readonly SYSTEM: "SYSTEM";
};
export type AuditActorType = (typeof AuditActorType)[keyof typeof AuditActorType];
export declare const ChannelStatus: {
    readonly PENDING: "PENDING";
    readonly ACTIVE: "ACTIVE";
    readonly ERROR: "ERROR";
};
export type ChannelStatus = (typeof ChannelStatus)[keyof typeof ChannelStatus];
export declare const DeliveryStatus: {
    readonly PENDING: "PENDING";
    readonly SENT: "SENT";
    readonly DELIVERED: "DELIVERED";
    readonly FAILED: "FAILED";
};
export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus];
