import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type OrganizationModel = runtime.Types.Result.DefaultSelection<Prisma.$OrganizationPayload>;
export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null;
    _min: OrganizationMinAggregateOutputType | null;
    _max: OrganizationMaxAggregateOutputType | null;
};
export type OrganizationMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type OrganizationMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type OrganizationCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    _all: number;
};
export type OrganizationMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type OrganizationMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type OrganizationCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    _all?: true;
};
export type OrganizationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrganizationCountAggregateInputType;
    _min?: OrganizationMinAggregateInputType;
    _max?: OrganizationMaxAggregateInputType;
};
export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
    [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrganization[P]> : Prisma.GetScalarType<T[P], AggregateOrganization[P]>;
};
export type OrganizationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithAggregationInput | Prisma.OrganizationOrderByWithAggregationInput[];
    by: Prisma.OrganizationScalarFieldEnum[] | Prisma.OrganizationScalarFieldEnum;
    having?: Prisma.OrganizationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrganizationCountAggregateInputType | true;
    _min?: OrganizationMinAggregateInputType;
    _max?: OrganizationMaxAggregateInputType;
};
export type OrganizationGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    _count: OrganizationCountAggregateOutputType | null;
    _min: OrganizationMinAggregateOutputType | null;
    _max: OrganizationMaxAggregateOutputType | null;
};
export type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrganizationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrganizationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrganizationGroupByOutputType[P]>;
}>>;
export type OrganizationWhereInput = {
    AND?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    OR?: Prisma.OrganizationWhereInput[];
    NOT?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    id?: Prisma.StringFilter<"Organization"> | string;
    name?: Prisma.StringFilter<"Organization"> | string;
    createdAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    customers?: Prisma.CustomerListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    tickets?: Prisma.TicketListRelationFilter;
    auditRecords?: Prisma.AuditRecordListRelationFilter;
    slaPolicies?: Prisma.SlaPolicyListRelationFilter;
    knowledgeArticles?: Prisma.KnowledgeArticleListRelationFilter;
    aiSuggestions?: Prisma.AiSuggestionListRelationFilter;
    channelConnections?: Prisma.ChannelConnectionListRelationFilter;
};
export type OrganizationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    users?: Prisma.UserOrderByRelationAggregateInput;
    customers?: Prisma.CustomerOrderByRelationAggregateInput;
    conversations?: Prisma.ConversationOrderByRelationAggregateInput;
    tickets?: Prisma.TicketOrderByRelationAggregateInput;
    auditRecords?: Prisma.AuditRecordOrderByRelationAggregateInput;
    slaPolicies?: Prisma.SlaPolicyOrderByRelationAggregateInput;
    knowledgeArticles?: Prisma.KnowledgeArticleOrderByRelationAggregateInput;
    aiSuggestions?: Prisma.AiSuggestionOrderByRelationAggregateInput;
    channelConnections?: Prisma.ChannelConnectionOrderByRelationAggregateInput;
};
export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    OR?: Prisma.OrganizationWhereInput[];
    NOT?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    name?: Prisma.StringFilter<"Organization"> | string;
    createdAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    customers?: Prisma.CustomerListRelationFilter;
    conversations?: Prisma.ConversationListRelationFilter;
    tickets?: Prisma.TicketListRelationFilter;
    auditRecords?: Prisma.AuditRecordListRelationFilter;
    slaPolicies?: Prisma.SlaPolicyListRelationFilter;
    knowledgeArticles?: Prisma.KnowledgeArticleListRelationFilter;
    aiSuggestions?: Prisma.AiSuggestionListRelationFilter;
    channelConnections?: Prisma.ChannelConnectionListRelationFilter;
}, "id">;
export type OrganizationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OrganizationCountOrderByAggregateInput;
    _max?: Prisma.OrganizationMaxOrderByAggregateInput;
    _min?: Prisma.OrganizationMinOrderByAggregateInput;
};
export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrganizationScalarWhereWithAggregatesInput | Prisma.OrganizationScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrganizationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrganizationScalarWhereWithAggregatesInput | Prisma.OrganizationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Organization"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Organization"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Organization"> | Date | string;
};
export type OrganizationCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type OrganizationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrganizationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrganizationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OrganizationScalarRelationFilter = {
    is?: Prisma.OrganizationWhereInput;
    isNot?: Prisma.OrganizationWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutUsersInput, Prisma.OrganizationUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutUsersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutUsersInput, Prisma.OrganizationUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.OrganizationUpsertWithoutUsersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutUsersInput, Prisma.OrganizationUpdateWithoutUsersInput>, Prisma.OrganizationUncheckedUpdateWithoutUsersInput>;
};
export type OrganizationCreateNestedOneWithoutCustomersInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutCustomersInput, Prisma.OrganizationUncheckedCreateWithoutCustomersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutCustomersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutCustomersNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutCustomersInput, Prisma.OrganizationUncheckedCreateWithoutCustomersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutCustomersInput;
    upsert?: Prisma.OrganizationUpsertWithoutCustomersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutCustomersInput, Prisma.OrganizationUpdateWithoutCustomersInput>, Prisma.OrganizationUncheckedUpdateWithoutCustomersInput>;
};
export type OrganizationCreateNestedOneWithoutConversationsInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutConversationsInput, Prisma.OrganizationUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutConversationsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutConversationsInput, Prisma.OrganizationUncheckedCreateWithoutConversationsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutConversationsInput;
    upsert?: Prisma.OrganizationUpsertWithoutConversationsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutConversationsInput, Prisma.OrganizationUpdateWithoutConversationsInput>, Prisma.OrganizationUncheckedUpdateWithoutConversationsInput>;
};
export type OrganizationCreateNestedOneWithoutTicketsInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutTicketsInput, Prisma.OrganizationUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutTicketsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutTicketsInput, Prisma.OrganizationUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutTicketsInput;
    upsert?: Prisma.OrganizationUpsertWithoutTicketsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutTicketsInput, Prisma.OrganizationUpdateWithoutTicketsInput>, Prisma.OrganizationUncheckedUpdateWithoutTicketsInput>;
};
export type OrganizationCreateNestedOneWithoutSlaPoliciesInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedCreateWithoutSlaPoliciesInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutSlaPoliciesInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutSlaPoliciesNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedCreateWithoutSlaPoliciesInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutSlaPoliciesInput;
    upsert?: Prisma.OrganizationUpsertWithoutSlaPoliciesInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutSlaPoliciesInput, Prisma.OrganizationUpdateWithoutSlaPoliciesInput>, Prisma.OrganizationUncheckedUpdateWithoutSlaPoliciesInput>;
};
export type OrganizationCreateNestedOneWithoutKnowledgeArticlesInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedCreateWithoutKnowledgeArticlesInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutKnowledgeArticlesInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutKnowledgeArticlesNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedCreateWithoutKnowledgeArticlesInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutKnowledgeArticlesInput;
    upsert?: Prisma.OrganizationUpsertWithoutKnowledgeArticlesInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutKnowledgeArticlesInput, Prisma.OrganizationUpdateWithoutKnowledgeArticlesInput>, Prisma.OrganizationUncheckedUpdateWithoutKnowledgeArticlesInput>;
};
export type OrganizationCreateNestedOneWithoutAiSuggestionsInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedCreateWithoutAiSuggestionsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutAiSuggestionsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutAiSuggestionsNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedCreateWithoutAiSuggestionsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutAiSuggestionsInput;
    upsert?: Prisma.OrganizationUpsertWithoutAiSuggestionsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutAiSuggestionsInput, Prisma.OrganizationUpdateWithoutAiSuggestionsInput>, Prisma.OrganizationUncheckedUpdateWithoutAiSuggestionsInput>;
};
export type OrganizationCreateNestedOneWithoutAuditRecordsInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedCreateWithoutAuditRecordsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutAuditRecordsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutAuditRecordsNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedCreateWithoutAuditRecordsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutAuditRecordsInput;
    upsert?: Prisma.OrganizationUpsertWithoutAuditRecordsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutAuditRecordsInput, Prisma.OrganizationUpdateWithoutAuditRecordsInput>, Prisma.OrganizationUncheckedUpdateWithoutAuditRecordsInput>;
};
export type OrganizationCreateNestedOneWithoutChannelConnectionsInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedCreateWithoutChannelConnectionsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutChannelConnectionsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutChannelConnectionsNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedCreateWithoutChannelConnectionsInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutChannelConnectionsInput;
    upsert?: Prisma.OrganizationUpsertWithoutChannelConnectionsInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutChannelConnectionsInput, Prisma.OrganizationUpdateWithoutChannelConnectionsInput>, Prisma.OrganizationUncheckedUpdateWithoutChannelConnectionsInput>;
};
export type OrganizationCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutUsersInput, Prisma.OrganizationUncheckedCreateWithoutUsersInput>;
};
export type OrganizationUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutUsersInput, Prisma.OrganizationUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutUsersInput, Prisma.OrganizationUncheckedCreateWithoutUsersInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutUsersInput, Prisma.OrganizationUncheckedUpdateWithoutUsersInput>;
};
export type OrganizationUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutCustomersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutCustomersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutCustomersInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutCustomersInput, Prisma.OrganizationUncheckedCreateWithoutCustomersInput>;
};
export type OrganizationUpsertWithoutCustomersInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutCustomersInput, Prisma.OrganizationUncheckedUpdateWithoutCustomersInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutCustomersInput, Prisma.OrganizationUncheckedCreateWithoutCustomersInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutCustomersInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutCustomersInput, Prisma.OrganizationUncheckedUpdateWithoutCustomersInput>;
};
export type OrganizationUpdateWithoutCustomersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutCustomersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutConversationsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutConversationsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutConversationsInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutConversationsInput, Prisma.OrganizationUncheckedCreateWithoutConversationsInput>;
};
export type OrganizationUpsertWithoutConversationsInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutConversationsInput, Prisma.OrganizationUncheckedUpdateWithoutConversationsInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutConversationsInput, Prisma.OrganizationUncheckedCreateWithoutConversationsInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutConversationsInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutConversationsInput, Prisma.OrganizationUncheckedUpdateWithoutConversationsInput>;
};
export type OrganizationUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutTicketsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutTicketsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutTicketsInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutTicketsInput, Prisma.OrganizationUncheckedCreateWithoutTicketsInput>;
};
export type OrganizationUpsertWithoutTicketsInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutTicketsInput, Prisma.OrganizationUncheckedUpdateWithoutTicketsInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutTicketsInput, Prisma.OrganizationUncheckedCreateWithoutTicketsInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutTicketsInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutTicketsInput, Prisma.OrganizationUncheckedUpdateWithoutTicketsInput>;
};
export type OrganizationUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutSlaPoliciesInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutSlaPoliciesInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutSlaPoliciesInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedCreateWithoutSlaPoliciesInput>;
};
export type OrganizationUpsertWithoutSlaPoliciesInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedUpdateWithoutSlaPoliciesInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedCreateWithoutSlaPoliciesInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutSlaPoliciesInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutSlaPoliciesInput, Prisma.OrganizationUncheckedUpdateWithoutSlaPoliciesInput>;
};
export type OrganizationUpdateWithoutSlaPoliciesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutSlaPoliciesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutKnowledgeArticlesInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutKnowledgeArticlesInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutKnowledgeArticlesInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedCreateWithoutKnowledgeArticlesInput>;
};
export type OrganizationUpsertWithoutKnowledgeArticlesInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedUpdateWithoutKnowledgeArticlesInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedCreateWithoutKnowledgeArticlesInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutKnowledgeArticlesInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutKnowledgeArticlesInput, Prisma.OrganizationUncheckedUpdateWithoutKnowledgeArticlesInput>;
};
export type OrganizationUpdateWithoutKnowledgeArticlesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutKnowledgeArticlesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutAiSuggestionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutAiSuggestionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutAiSuggestionsInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedCreateWithoutAiSuggestionsInput>;
};
export type OrganizationUpsertWithoutAiSuggestionsInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedUpdateWithoutAiSuggestionsInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedCreateWithoutAiSuggestionsInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutAiSuggestionsInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutAiSuggestionsInput, Prisma.OrganizationUncheckedUpdateWithoutAiSuggestionsInput>;
};
export type OrganizationUpdateWithoutAiSuggestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutAiSuggestionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutAuditRecordsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutAuditRecordsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutAuditRecordsInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedCreateWithoutAuditRecordsInput>;
};
export type OrganizationUpsertWithoutAuditRecordsInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedUpdateWithoutAuditRecordsInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedCreateWithoutAuditRecordsInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutAuditRecordsInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutAuditRecordsInput, Prisma.OrganizationUncheckedUpdateWithoutAuditRecordsInput>;
};
export type OrganizationUpdateWithoutAuditRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutAuditRecordsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
    channelConnections?: Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateWithoutChannelConnectionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutChannelConnectionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutOrganizationInput;
    customers?: Prisma.CustomerUncheckedCreateNestedManyWithoutOrganizationInput;
    conversations?: Prisma.ConversationUncheckedCreateNestedManyWithoutOrganizationInput;
    tickets?: Prisma.TicketUncheckedCreateNestedManyWithoutOrganizationInput;
    auditRecords?: Prisma.AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutChannelConnectionsInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedCreateWithoutChannelConnectionsInput>;
};
export type OrganizationUpsertWithoutChannelConnectionsInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedUpdateWithoutChannelConnectionsInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedCreateWithoutChannelConnectionsInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutChannelConnectionsInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutChannelConnectionsInput, Prisma.OrganizationUncheckedUpdateWithoutChannelConnectionsInput>;
};
export type OrganizationUpdateWithoutChannelConnectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutChannelConnectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutOrganizationNestedInput;
    customers?: Prisma.CustomerUncheckedUpdateManyWithoutOrganizationNestedInput;
    conversations?: Prisma.ConversationUncheckedUpdateManyWithoutOrganizationNestedInput;
    tickets?: Prisma.TicketUncheckedUpdateManyWithoutOrganizationNestedInput;
    auditRecords?: Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput;
    slaPolicies?: Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput;
    knowledgeArticles?: Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput;
    aiSuggestions?: Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCountOutputType = {
    users: number;
    customers: number;
    conversations: number;
    tickets: number;
    auditRecords: number;
    slaPolicies: number;
    knowledgeArticles: number;
    aiSuggestions: number;
    channelConnections: number;
};
export type OrganizationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs;
    customers?: boolean | OrganizationCountOutputTypeCountCustomersArgs;
    conversations?: boolean | OrganizationCountOutputTypeCountConversationsArgs;
    tickets?: boolean | OrganizationCountOutputTypeCountTicketsArgs;
    auditRecords?: boolean | OrganizationCountOutputTypeCountAuditRecordsArgs;
    slaPolicies?: boolean | OrganizationCountOutputTypeCountSlaPoliciesArgs;
    knowledgeArticles?: boolean | OrganizationCountOutputTypeCountKnowledgeArticlesArgs;
    aiSuggestions?: boolean | OrganizationCountOutputTypeCountAiSuggestionsArgs;
    channelConnections?: boolean | OrganizationCountOutputTypeCountChannelConnectionsArgs;
};
export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationCountOutputTypeSelect<ExtArgs> | null;
};
export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type OrganizationCountOutputTypeCountCustomersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
};
export type OrganizationCountOutputTypeCountConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
};
export type OrganizationCountOutputTypeCountTicketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TicketWhereInput;
};
export type OrganizationCountOutputTypeCountAuditRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditRecordWhereInput;
};
export type OrganizationCountOutputTypeCountSlaPoliciesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlaPolicyWhereInput;
};
export type OrganizationCountOutputTypeCountKnowledgeArticlesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KnowledgeArticleWhereInput;
};
export type OrganizationCountOutputTypeCountAiSuggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSuggestionWhereInput;
};
export type OrganizationCountOutputTypeCountChannelConnectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChannelConnectionWhereInput;
};
export type OrganizationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    users?: boolean | Prisma.Organization$usersArgs<ExtArgs>;
    customers?: boolean | Prisma.Organization$customersArgs<ExtArgs>;
    conversations?: boolean | Prisma.Organization$conversationsArgs<ExtArgs>;
    tickets?: boolean | Prisma.Organization$ticketsArgs<ExtArgs>;
    auditRecords?: boolean | Prisma.Organization$auditRecordsArgs<ExtArgs>;
    slaPolicies?: boolean | Prisma.Organization$slaPoliciesArgs<ExtArgs>;
    knowledgeArticles?: boolean | Prisma.Organization$knowledgeArticlesArgs<ExtArgs>;
    aiSuggestions?: boolean | Prisma.Organization$aiSuggestionsArgs<ExtArgs>;
    channelConnections?: boolean | Prisma.Organization$channelConnectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OrganizationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
};
export type OrganizationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["organization"]>;
export type OrganizationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.Organization$usersArgs<ExtArgs>;
    customers?: boolean | Prisma.Organization$customersArgs<ExtArgs>;
    conversations?: boolean | Prisma.Organization$conversationsArgs<ExtArgs>;
    tickets?: boolean | Prisma.Organization$ticketsArgs<ExtArgs>;
    auditRecords?: boolean | Prisma.Organization$auditRecordsArgs<ExtArgs>;
    slaPolicies?: boolean | Prisma.Organization$slaPoliciesArgs<ExtArgs>;
    knowledgeArticles?: boolean | Prisma.Organization$knowledgeArticlesArgs<ExtArgs>;
    aiSuggestions?: boolean | Prisma.Organization$aiSuggestionsArgs<ExtArgs>;
    channelConnections?: boolean | Prisma.Organization$channelConnectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OrganizationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $OrganizationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Organization";
    objects: {
        users: Prisma.$UserPayload<ExtArgs>[];
        customers: Prisma.$CustomerPayload<ExtArgs>[];
        conversations: Prisma.$ConversationPayload<ExtArgs>[];
        tickets: Prisma.$TicketPayload<ExtArgs>[];
        auditRecords: Prisma.$AuditRecordPayload<ExtArgs>[];
        slaPolicies: Prisma.$SlaPolicyPayload<ExtArgs>[];
        knowledgeArticles: Prisma.$KnowledgeArticlePayload<ExtArgs>[];
        aiSuggestions: Prisma.$AiSuggestionPayload<ExtArgs>[];
        channelConnections: Prisma.$ChannelConnectionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
    }, ExtArgs["result"]["organization"]>;
    composites: {};
};
export type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrganizationPayload, S>;
export type OrganizationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrganizationCountAggregateInputType | true;
};
export interface OrganizationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Organization'];
        meta: {
            name: 'Organization';
        };
    };
    findUnique<T extends OrganizationFindUniqueArgs>(args: Prisma.SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrganizationFindFirstArgs>(args?: Prisma.SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrganizationFindManyArgs>(args?: Prisma.SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrganizationCreateArgs>(args: Prisma.SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrganizationCreateManyArgs>(args?: Prisma.SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrganizationDeleteArgs>(args: Prisma.SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrganizationUpdateArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrganizationUpdateManyArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrganizationUpsertArgs>(args: Prisma.SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrganizationCountArgs>(args?: Prisma.Subset<T, OrganizationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrganizationCountAggregateOutputType> : number>;
    aggregate<T extends OrganizationAggregateArgs>(args: Prisma.Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>;
    groupBy<T extends OrganizationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrganizationGroupByArgs['orderBy'];
    } : {
        orderBy?: OrganizationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrganizationFieldRefs;
}
export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.Organization$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customers<T extends Prisma.Organization$customersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$customersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    conversations<T extends Prisma.Organization$conversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tickets<T extends Prisma.Organization$ticketsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditRecords<T extends Prisma.Organization$auditRecordsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$auditRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    slaPolicies<T extends Prisma.Organization$slaPoliciesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$slaPoliciesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    knowledgeArticles<T extends Prisma.Organization$knowledgeArticlesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$knowledgeArticlesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    aiSuggestions<T extends Prisma.Organization$aiSuggestionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$aiSuggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    channelConnections<T extends Prisma.Organization$channelConnectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$channelConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrganizationFieldRefs {
    readonly id: Prisma.FieldRef<"Organization", 'String'>;
    readonly name: Prisma.FieldRef<"Organization", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Organization", 'DateTime'>;
}
export type OrganizationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationCreateInput, Prisma.OrganizationUncheckedCreateInput>;
};
export type OrganizationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrganizationCreateManyInput | Prisma.OrganizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrganizationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    data: Prisma.OrganizationCreateManyInput | Prisma.OrganizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrganizationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationUpdateInput, Prisma.OrganizationUncheckedUpdateInput>;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
};
export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
};
export type OrganizationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateInput, Prisma.OrganizationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrganizationUpdateInput, Prisma.OrganizationUncheckedUpdateInput>;
};
export type OrganizationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
};
export type Organization$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type Organization$customersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type Organization$conversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConversationScalarFieldEnum | Prisma.ConversationScalarFieldEnum[];
};
export type Organization$ticketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
    orderBy?: Prisma.TicketOrderByWithRelationInput | Prisma.TicketOrderByWithRelationInput[];
    cursor?: Prisma.TicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TicketScalarFieldEnum | Prisma.TicketScalarFieldEnum[];
};
export type Organization$auditRecordsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    where?: Prisma.AuditRecordWhereInput;
    orderBy?: Prisma.AuditRecordOrderByWithRelationInput | Prisma.AuditRecordOrderByWithRelationInput[];
    cursor?: Prisma.AuditRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AuditRecordScalarFieldEnum | Prisma.AuditRecordScalarFieldEnum[];
};
export type Organization$slaPoliciesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    where?: Prisma.SlaPolicyWhereInput;
    orderBy?: Prisma.SlaPolicyOrderByWithRelationInput | Prisma.SlaPolicyOrderByWithRelationInput[];
    cursor?: Prisma.SlaPolicyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SlaPolicyScalarFieldEnum | Prisma.SlaPolicyScalarFieldEnum[];
};
export type Organization$knowledgeArticlesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    where?: Prisma.KnowledgeArticleWhereInput;
    orderBy?: Prisma.KnowledgeArticleOrderByWithRelationInput | Prisma.KnowledgeArticleOrderByWithRelationInput[];
    cursor?: Prisma.KnowledgeArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.KnowledgeArticleScalarFieldEnum | Prisma.KnowledgeArticleScalarFieldEnum[];
};
export type Organization$aiSuggestionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    where?: Prisma.AiSuggestionWhereInput;
    orderBy?: Prisma.AiSuggestionOrderByWithRelationInput | Prisma.AiSuggestionOrderByWithRelationInput[];
    cursor?: Prisma.AiSuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiSuggestionScalarFieldEnum | Prisma.AiSuggestionScalarFieldEnum[];
};
export type Organization$channelConnectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    where?: Prisma.ChannelConnectionWhereInput;
    orderBy?: Prisma.ChannelConnectionOrderByWithRelationInput | Prisma.ChannelConnectionOrderByWithRelationInput[];
    cursor?: Prisma.ChannelConnectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChannelConnectionScalarFieldEnum | Prisma.ChannelConnectionScalarFieldEnum[];
};
export type OrganizationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
};
