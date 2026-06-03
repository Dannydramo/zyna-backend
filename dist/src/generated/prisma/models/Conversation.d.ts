import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ConversationModel = runtime.Types.Result.DefaultSelection<Prisma.$ConversationPayload>;
export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type ConversationMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    customerId: string | null;
    channel: $Enums.Channel | null;
    externalThreadId: string | null;
    createdAt: Date | null;
};
export type ConversationMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    customerId: string | null;
    channel: $Enums.Channel | null;
    externalThreadId: string | null;
    createdAt: Date | null;
};
export type ConversationCountAggregateOutputType = {
    id: number;
    organizationId: number;
    customerId: number;
    channel: number;
    externalThreadId: number;
    createdAt: number;
    _all: number;
};
export type ConversationMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    customerId?: true;
    channel?: true;
    externalThreadId?: true;
    createdAt?: true;
};
export type ConversationMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    customerId?: true;
    channel?: true;
    externalThreadId?: true;
    createdAt?: true;
};
export type ConversationCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    customerId?: true;
    channel?: true;
    externalThreadId?: true;
    createdAt?: true;
    _all?: true;
};
export type ConversationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithRelationInput | Prisma.ConversationOrderByWithRelationInput[];
    cursor?: Prisma.ConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConversationCountAggregateInputType;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
    [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConversation[P]> : Prisma.GetScalarType<T[P], AggregateConversation[P]>;
};
export type ConversationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    orderBy?: Prisma.ConversationOrderByWithAggregationInput | Prisma.ConversationOrderByWithAggregationInput[];
    by: Prisma.ConversationScalarFieldEnum[] | Prisma.ConversationScalarFieldEnum;
    having?: Prisma.ConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConversationCountAggregateInputType | true;
    _min?: ConversationMinAggregateInputType;
    _max?: ConversationMaxAggregateInputType;
};
export type ConversationGroupByOutputType = {
    id: string;
    organizationId: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId: string | null;
    createdAt: Date;
    _count: ConversationCountAggregateOutputType | null;
    _min: ConversationMinAggregateOutputType | null;
    _max: ConversationMaxAggregateOutputType | null;
};
export type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConversationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConversationGroupByOutputType[P]>;
}>>;
export type ConversationWhereInput = {
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    organizationId?: Prisma.StringFilter<"Conversation"> | string;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    channel?: Prisma.EnumChannelFilter<"Conversation"> | $Enums.Channel;
    externalThreadId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
    ticket?: Prisma.XOR<Prisma.TicketNullableScalarRelationFilter, Prisma.TicketWhereInput> | null;
};
export type ConversationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    externalThreadId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
    customer?: Prisma.CustomerOrderByWithRelationInput;
    messages?: Prisma.MessageOrderByRelationAggregateInput;
    ticket?: Prisma.TicketOrderByWithRelationInput;
};
export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    OR?: Prisma.ConversationWhereInput[];
    NOT?: Prisma.ConversationWhereInput | Prisma.ConversationWhereInput[];
    organizationId?: Prisma.StringFilter<"Conversation"> | string;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    channel?: Prisma.EnumChannelFilter<"Conversation"> | $Enums.Channel;
    externalThreadId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    customer?: Prisma.XOR<Prisma.CustomerScalarRelationFilter, Prisma.CustomerWhereInput>;
    messages?: Prisma.MessageListRelationFilter;
    ticket?: Prisma.XOR<Prisma.TicketNullableScalarRelationFilter, Prisma.TicketWhereInput> | null;
}, "id">;
export type ConversationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    externalThreadId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ConversationCountOrderByAggregateInput;
    _max?: Prisma.ConversationMaxOrderByAggregateInput;
    _min?: Prisma.ConversationMinOrderByAggregateInput;
};
export type ConversationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConversationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConversationScalarWhereWithAggregatesInput | Prisma.ConversationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"Conversation"> | string;
    channel?: Prisma.EnumChannelWithAggregatesFilter<"Conversation"> | $Enums.Channel;
    externalThreadId?: Prisma.StringNullableWithAggregatesFilter<"Conversation"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Conversation"> | Date | string;
};
export type ConversationCreateInput = {
    id?: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutConversationsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketCreateNestedOneWithoutConversationInput;
};
export type ConversationUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketUncheckedCreateNestedOneWithoutConversationInput;
};
export type ConversationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutConversationsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUncheckedUpdateOneWithoutConversationNestedInput;
};
export type ConversationCreateManyInput = {
    id?: string;
    organizationId: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
};
export type ConversationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationListRelationFilter = {
    every?: Prisma.ConversationWhereInput;
    some?: Prisma.ConversationWhereInput;
    none?: Prisma.ConversationWhereInput;
};
export type ConversationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ConversationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    externalThreadId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConversationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    externalThreadId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConversationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    externalThreadId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConversationScalarRelationFilter = {
    is?: Prisma.ConversationWhereInput;
    isNot?: Prisma.ConversationWhereInput;
};
export type ConversationCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput> | Prisma.ConversationCreateWithoutOrganizationInput[] | Prisma.ConversationUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrganizationInput | Prisma.ConversationCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.ConversationCreateManyOrganizationInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput> | Prisma.ConversationCreateWithoutOrganizationInput[] | Prisma.ConversationUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrganizationInput | Prisma.ConversationCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.ConversationCreateManyOrganizationInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput> | Prisma.ConversationCreateWithoutOrganizationInput[] | Prisma.ConversationUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrganizationInput | Prisma.ConversationCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.ConversationUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.ConversationCreateManyOrganizationInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.ConversationUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutOrganizationInput | Prisma.ConversationUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput> | Prisma.ConversationCreateWithoutOrganizationInput[] | Prisma.ConversationUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutOrganizationInput | Prisma.ConversationCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.ConversationUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.ConversationCreateManyOrganizationInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.ConversationUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutOrganizationInput | Prisma.ConversationUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
};
export type ConversationUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput | Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type ConversationUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput> | Prisma.ConversationCreateWithoutCustomerInput[] | Prisma.ConversationUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutCustomerInput | Prisma.ConversationCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.ConversationCreateManyCustomerInputEnvelope;
    set?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    disconnect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    delete?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    connect?: Prisma.ConversationWhereUniqueInput | Prisma.ConversationWhereUniqueInput[];
    update?: Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput | Prisma.ConversationUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput | Prisma.ConversationUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
};
export type EnumChannelFieldUpdateOperationsInput = {
    set?: $Enums.Channel;
};
export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.ConversationUpsertWithoutMessagesInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutMessagesInput, Prisma.ConversationUpdateWithoutMessagesInput>, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationCreateNestedOneWithoutTicketInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutTicketInput, Prisma.ConversationUncheckedCreateWithoutTicketInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutTicketInput;
    connect?: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateOneRequiredWithoutTicketNestedInput = {
    create?: Prisma.XOR<Prisma.ConversationCreateWithoutTicketInput, Prisma.ConversationUncheckedCreateWithoutTicketInput>;
    connectOrCreate?: Prisma.ConversationCreateOrConnectWithoutTicketInput;
    upsert?: Prisma.ConversationUpsertWithoutTicketInput;
    connect?: Prisma.ConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ConversationUpdateToOneWithWhereWithoutTicketInput, Prisma.ConversationUpdateWithoutTicketInput>, Prisma.ConversationUncheckedUpdateWithoutTicketInput>;
};
export type ConversationCreateWithoutOrganizationInput = {
    id?: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    customer: Prisma.CustomerCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketCreateNestedOneWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketUncheckedCreateNestedOneWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput>;
};
export type ConversationCreateManyOrganizationInputEnvelope = {
    data: Prisma.ConversationCreateManyOrganizationInput | Prisma.ConversationCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutOrganizationInput, Prisma.ConversationUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutOrganizationInput, Prisma.ConversationUncheckedCreateWithoutOrganizationInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutOrganizationInput, Prisma.ConversationUncheckedUpdateWithoutOrganizationInput>;
};
export type ConversationUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutOrganizationInput>;
};
export type ConversationScalarWhereInput = {
    AND?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    OR?: Prisma.ConversationScalarWhereInput[];
    NOT?: Prisma.ConversationScalarWhereInput | Prisma.ConversationScalarWhereInput[];
    id?: Prisma.StringFilter<"Conversation"> | string;
    organizationId?: Prisma.StringFilter<"Conversation"> | string;
    customerId?: Prisma.StringFilter<"Conversation"> | string;
    channel?: Prisma.EnumChannelFilter<"Conversation"> | $Enums.Channel;
    externalThreadId?: Prisma.StringNullableFilter<"Conversation"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Conversation"> | Date | string;
};
export type ConversationCreateWithoutCustomerInput = {
    id?: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketCreateNestedOneWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutCustomerInput = {
    id?: string;
    organizationId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
    ticket?: Prisma.TicketUncheckedCreateNestedOneWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput>;
};
export type ConversationCreateManyCustomerInputEnvelope = {
    data: Prisma.ConversationCreateManyCustomerInput | Prisma.ConversationCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type ConversationUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutCustomerInput, Prisma.ConversationUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutCustomerInput, Prisma.ConversationUncheckedCreateWithoutCustomerInput>;
};
export type ConversationUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.ConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutCustomerInput, Prisma.ConversationUncheckedUpdateWithoutCustomerInput>;
};
export type ConversationUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.ConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyWithoutCustomerInput>;
};
export type ConversationCreateWithoutMessagesInput = {
    id?: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutConversationsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutConversationsInput;
    ticket?: Prisma.TicketCreateNestedOneWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    organizationId: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    ticket?: Prisma.TicketUncheckedCreateNestedOneWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
};
export type ConversationUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutMessagesInput, Prisma.ConversationUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutMessagesInput, Prisma.ConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ConversationUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutConversationsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutConversationsNestedInput;
    ticket?: Prisma.TicketUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ticket?: Prisma.TicketUncheckedUpdateOneWithoutConversationNestedInput;
};
export type ConversationCreateWithoutTicketInput = {
    id?: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutConversationsInput;
    customer: Prisma.CustomerCreateNestedOneWithoutConversationsInput;
    messages?: Prisma.MessageCreateNestedManyWithoutConversationInput;
};
export type ConversationUncheckedCreateWithoutTicketInput = {
    id?: string;
    organizationId: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
    messages?: Prisma.MessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ConversationCreateOrConnectWithoutTicketInput = {
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutTicketInput, Prisma.ConversationUncheckedCreateWithoutTicketInput>;
};
export type ConversationUpsertWithoutTicketInput = {
    update: Prisma.XOR<Prisma.ConversationUpdateWithoutTicketInput, Prisma.ConversationUncheckedUpdateWithoutTicketInput>;
    create: Prisma.XOR<Prisma.ConversationCreateWithoutTicketInput, Prisma.ConversationUncheckedCreateWithoutTicketInput>;
    where?: Prisma.ConversationWhereInput;
};
export type ConversationUpdateToOneWithWhereWithoutTicketInput = {
    where?: Prisma.ConversationWhereInput;
    data: Prisma.XOR<Prisma.ConversationUpdateWithoutTicketInput, Prisma.ConversationUncheckedUpdateWithoutTicketInput>;
};
export type ConversationUpdateWithoutTicketInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutConversationsNestedInput;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutTicketInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ConversationCreateManyOrganizationInput = {
    id?: string;
    customerId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
};
export type ConversationUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.CustomerUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUncheckedUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCreateManyCustomerInput = {
    id?: string;
    organizationId: string;
    channel: $Enums.Channel;
    externalThreadId?: string | null;
    createdAt?: Date | string;
};
export type ConversationUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutConversationsNestedInput;
    messages?: Prisma.MessageUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.MessageUncheckedUpdateManyWithoutConversationNestedInput;
    ticket?: Prisma.TicketUncheckedUpdateOneWithoutConversationNestedInput;
};
export type ConversationUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    externalThreadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConversationCountOutputType = {
    messages: number;
};
export type ConversationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs;
};
export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationCountOutputTypeSelect<ExtArgs> | null;
};
export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MessageWhereInput;
};
export type ConversationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    customerId?: boolean;
    channel?: boolean;
    externalThreadId?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    ticket?: boolean | Prisma.Conversation$ticketArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    customerId?: boolean;
    channel?: boolean;
    externalThreadId?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    customerId?: boolean;
    channel?: boolean;
    externalThreadId?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["conversation"]>;
export type ConversationSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    customerId?: boolean;
    channel?: boolean;
    externalThreadId?: boolean;
    createdAt?: boolean;
};
export type ConversationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "customerId" | "channel" | "externalThreadId" | "createdAt", ExtArgs["result"]["conversation"]>;
export type ConversationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.Conversation$messagesArgs<ExtArgs>;
    ticket?: boolean | Prisma.Conversation$ticketArgs<ExtArgs>;
    _count?: boolean | Prisma.ConversationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ConversationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
};
export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.CustomerDefaultArgs<ExtArgs>;
};
export type $ConversationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Conversation";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
        customer: Prisma.$CustomerPayload<ExtArgs>;
        messages: Prisma.$MessagePayload<ExtArgs>[];
        ticket: Prisma.$TicketPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        customerId: string;
        channel: $Enums.Channel;
        externalThreadId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["conversation"]>;
    composites: {};
};
export type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConversationPayload, S>;
export type ConversationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConversationCountAggregateInputType | true;
};
export interface ConversationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Conversation'];
        meta: {
            name: 'Conversation';
        };
    };
    findUnique<T extends ConversationFindUniqueArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConversationFindFirstArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConversationFindManyArgs>(args?: Prisma.SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConversationCreateArgs>(args: Prisma.SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConversationCreateManyArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConversationDeleteArgs>(args: Prisma.SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConversationUpdateArgs>(args: Prisma.SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConversationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConversationUpdateManyArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConversationUpsertArgs>(args: Prisma.SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma.Prisma__ConversationClient<runtime.Types.Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConversationCountArgs>(args?: Prisma.Subset<T, ConversationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConversationCountAggregateOutputType> : number>;
    aggregate<T extends ConversationAggregateArgs>(args: Prisma.Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>;
    groupBy<T extends ConversationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConversationGroupByArgs['orderBy'];
    } : {
        orderBy?: ConversationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConversationFieldRefs;
}
export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.CustomerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CustomerDefaultArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.Conversation$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ticket<T extends Prisma.Conversation$ticketArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Conversation$ticketArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConversationFieldRefs {
    readonly id: Prisma.FieldRef<"Conversation", 'String'>;
    readonly organizationId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly customerId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly channel: Prisma.FieldRef<"Conversation", 'Channel'>;
    readonly externalThreadId: Prisma.FieldRef<"Conversation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Conversation", 'DateTime'>;
}
export type ConversationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ConversationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
};
export type ConversationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConversationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.ConversationCreateManyInput | Prisma.ConversationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ConversationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type ConversationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConversationUpdateManyMutationInput, Prisma.ConversationUncheckedUpdateManyInput>;
    where?: Prisma.ConversationWhereInput;
    limit?: number;
    include?: Prisma.ConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ConversationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConversationCreateInput, Prisma.ConversationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConversationUpdateInput, Prisma.ConversationUncheckedUpdateInput>;
};
export type ConversationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
    where: Prisma.ConversationWhereUniqueInput;
};
export type ConversationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConversationWhereInput;
    limit?: number;
};
export type Conversation$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MessageSelect<ExtArgs> | null;
    omit?: Prisma.MessageOmit<ExtArgs> | null;
    include?: Prisma.MessageInclude<ExtArgs> | null;
    where?: Prisma.MessageWhereInput;
    orderBy?: Prisma.MessageOrderByWithRelationInput | Prisma.MessageOrderByWithRelationInput[];
    cursor?: Prisma.MessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MessageScalarFieldEnum | Prisma.MessageScalarFieldEnum[];
};
export type Conversation$ticketArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TicketSelect<ExtArgs> | null;
    omit?: Prisma.TicketOmit<ExtArgs> | null;
    include?: Prisma.TicketInclude<ExtArgs> | null;
    where?: Prisma.TicketWhereInput;
};
export type ConversationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConversationSelect<ExtArgs> | null;
    omit?: Prisma.ConversationOmit<ExtArgs> | null;
    include?: Prisma.ConversationInclude<ExtArgs> | null;
};
