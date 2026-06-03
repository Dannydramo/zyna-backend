"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineExtension = exports.JsonNullValueFilter = exports.NullsOrder = exports.QueryMode = exports.NullableJsonNullValueInput = exports.JsonNullValueInput = exports.SortOrder = exports.ChannelConnectionScalarFieldEnum = exports.AuditRecordScalarFieldEnum = exports.AiSuggestionScalarFieldEnum = exports.KnowledgeArticleScalarFieldEnum = exports.SlaPolicyScalarFieldEnum = exports.TicketScalarFieldEnum = exports.MessageScalarFieldEnum = exports.ConversationScalarFieldEnum = exports.CustomerScalarFieldEnum = exports.UserScalarFieldEnum = exports.OrganizationScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.8.0",
    engine: "3c6e192761c0362d496ed980de936e2f3cebcd3a"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Organization: 'Organization',
    User: 'User',
    Customer: 'Customer',
    Conversation: 'Conversation',
    Message: 'Message',
    Ticket: 'Ticket',
    SlaPolicy: 'SlaPolicy',
    KnowledgeArticle: 'KnowledgeArticle',
    AiSuggestion: 'AiSuggestion',
    AuditRecord: 'AuditRecord',
    ChannelConnection: 'ChannelConnection'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.OrganizationScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    email: 'email',
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    status: 'status',
    inviteToken: 'inviteToken',
    inviteTokenExpiresAt: 'inviteTokenExpiresAt',
    createdAt: 'createdAt'
};
exports.CustomerScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    email: 'email',
    phone: 'phone',
    avatarUrl: 'avatarUrl',
    attributes: 'attributes',
    notes: 'notes',
    createdAt: 'createdAt'
};
exports.ConversationScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    customerId: 'customerId',
    channel: 'channel',
    externalThreadId: 'externalThreadId',
    createdAt: 'createdAt'
};
exports.MessageScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    conversationId: 'conversationId',
    direction: 'direction',
    body: 'body',
    authorType: 'authorType',
    authorId: 'authorId',
    externalMessageId: 'externalMessageId',
    providerMessageId: 'providerMessageId',
    deliveryStatus: 'deliveryStatus',
    headers: 'headers',
    createdAt: 'createdAt'
};
exports.TicketScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    conversationId: 'conversationId',
    customerId: 'customerId',
    subject: 'subject',
    status: 'status',
    priority: 'priority',
    assigneeId: 'assigneeId',
    channel: 'channel',
    tags: 'tags',
    aiStatus: 'aiStatus',
    intent: 'intent',
    slaState: 'slaState',
    firstResponseDueAt: 'firstResponseDueAt',
    resolutionDueAt: 'resolutionDueAt',
    firstResponseAt: 'firstResponseAt',
    solvedAt: 'solvedAt',
    deletedAt: 'deletedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SlaPolicyScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    name: 'name',
    firstResponseMinutes: 'firstResponseMinutes',
    resolutionMinutes: 'resolutionMinutes',
    createdAt: 'createdAt'
};
exports.KnowledgeArticleScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    title: 'title',
    body: 'body',
    tags: 'tags',
    embedding: 'embedding',
    freshnessUpdatedAt: 'freshnessUpdatedAt',
    createdAt: 'createdAt'
};
exports.AiSuggestionScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    ticketId: 'ticketId',
    messageId: 'messageId',
    intent: 'intent',
    draft: 'draft',
    citations: 'citations',
    confidence: 'confidence',
    acceptedAt: 'acceptedAt',
    rejectedAt: 'rejectedAt',
    createdAt: 'createdAt'
};
exports.AuditRecordScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    actorType: 'actorType',
    actorId: 'actorId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    createdAt: 'createdAt'
};
exports.ChannelConnectionScalarFieldEnum = {
    id: 'id',
    organizationId: 'organizationId',
    channel: 'channel',
    status: 'status',
    config: 'config',
    verifiedAt: 'verifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullableJsonNullValueInput = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map