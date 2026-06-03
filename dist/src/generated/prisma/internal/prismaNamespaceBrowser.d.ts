import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Organization: "Organization";
    readonly User: "User";
    readonly Customer: "Customer";
    readonly Conversation: "Conversation";
    readonly Message: "Message";
    readonly Ticket: "Ticket";
    readonly SlaPolicy: "SlaPolicy";
    readonly KnowledgeArticle: "KnowledgeArticle";
    readonly AiSuggestion: "AiSuggestion";
    readonly AuditRecord: "AuditRecord";
    readonly ChannelConnection: "ChannelConnection";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const OrganizationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly name: "name";
    readonly role: "role";
    readonly status: "status";
    readonly inviteToken: "inviteToken";
    readonly inviteTokenExpiresAt: "inviteTokenExpiresAt";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const CustomerScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly name: "name";
    readonly email: "email";
    readonly phone: "phone";
    readonly avatarUrl: "avatarUrl";
    readonly attributes: "attributes";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
};
export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly customerId: "customerId";
    readonly channel: "channel";
    readonly externalThreadId: "externalThreadId";
    readonly createdAt: "createdAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly conversationId: "conversationId";
    readonly direction: "direction";
    readonly body: "body";
    readonly authorType: "authorType";
    readonly authorId: "authorId";
    readonly externalMessageId: "externalMessageId";
    readonly providerMessageId: "providerMessageId";
    readonly deliveryStatus: "deliveryStatus";
    readonly headers: "headers";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const TicketScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly conversationId: "conversationId";
    readonly customerId: "customerId";
    readonly subject: "subject";
    readonly status: "status";
    readonly priority: "priority";
    readonly assigneeId: "assigneeId";
    readonly channel: "channel";
    readonly tags: "tags";
    readonly aiStatus: "aiStatus";
    readonly intent: "intent";
    readonly slaState: "slaState";
    readonly firstResponseDueAt: "firstResponseDueAt";
    readonly resolutionDueAt: "resolutionDueAt";
    readonly firstResponseAt: "firstResponseAt";
    readonly solvedAt: "solvedAt";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum];
export declare const SlaPolicyScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly name: "name";
    readonly firstResponseMinutes: "firstResponseMinutes";
    readonly resolutionMinutes: "resolutionMinutes";
    readonly createdAt: "createdAt";
};
export type SlaPolicyScalarFieldEnum = (typeof SlaPolicyScalarFieldEnum)[keyof typeof SlaPolicyScalarFieldEnum];
export declare const KnowledgeArticleScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly title: "title";
    readonly body: "body";
    readonly tags: "tags";
    readonly embedding: "embedding";
    readonly freshnessUpdatedAt: "freshnessUpdatedAt";
    readonly createdAt: "createdAt";
};
export type KnowledgeArticleScalarFieldEnum = (typeof KnowledgeArticleScalarFieldEnum)[keyof typeof KnowledgeArticleScalarFieldEnum];
export declare const AiSuggestionScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly ticketId: "ticketId";
    readonly messageId: "messageId";
    readonly intent: "intent";
    readonly draft: "draft";
    readonly citations: "citations";
    readonly confidence: "confidence";
    readonly acceptedAt: "acceptedAt";
    readonly rejectedAt: "rejectedAt";
    readonly createdAt: "createdAt";
};
export type AiSuggestionScalarFieldEnum = (typeof AiSuggestionScalarFieldEnum)[keyof typeof AiSuggestionScalarFieldEnum];
export declare const AuditRecordScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly actorType: "actorType";
    readonly actorId: "actorId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type AuditRecordScalarFieldEnum = (typeof AuditRecordScalarFieldEnum)[keyof typeof AuditRecordScalarFieldEnum];
export declare const ChannelConnectionScalarFieldEnum: {
    readonly id: "id";
    readonly organizationId: "organizationId";
    readonly channel: "channel";
    readonly status: "status";
    readonly config: "config";
    readonly verifiedAt: "verifiedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChannelConnectionScalarFieldEnum = (typeof ChannelConnectionScalarFieldEnum)[keyof typeof ChannelConnectionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
