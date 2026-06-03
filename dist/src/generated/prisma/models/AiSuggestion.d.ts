import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AiSuggestionModel = runtime.Types.Result.DefaultSelection<Prisma.$AiSuggestionPayload>;
export type AggregateAiSuggestion = {
    _count: AiSuggestionCountAggregateOutputType | null;
    _avg: AiSuggestionAvgAggregateOutputType | null;
    _sum: AiSuggestionSumAggregateOutputType | null;
    _min: AiSuggestionMinAggregateOutputType | null;
    _max: AiSuggestionMaxAggregateOutputType | null;
};
export type AiSuggestionAvgAggregateOutputType = {
    confidence: number | null;
};
export type AiSuggestionSumAggregateOutputType = {
    confidence: number | null;
};
export type AiSuggestionMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    ticketId: string | null;
    messageId: string | null;
    intent: string | null;
    draft: string | null;
    confidence: number | null;
    acceptedAt: Date | null;
    rejectedAt: Date | null;
    createdAt: Date | null;
};
export type AiSuggestionMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    ticketId: string | null;
    messageId: string | null;
    intent: string | null;
    draft: string | null;
    confidence: number | null;
    acceptedAt: Date | null;
    rejectedAt: Date | null;
    createdAt: Date | null;
};
export type AiSuggestionCountAggregateOutputType = {
    id: number;
    organizationId: number;
    ticketId: number;
    messageId: number;
    intent: number;
    draft: number;
    citations: number;
    confidence: number;
    acceptedAt: number;
    rejectedAt: number;
    createdAt: number;
    _all: number;
};
export type AiSuggestionAvgAggregateInputType = {
    confidence?: true;
};
export type AiSuggestionSumAggregateInputType = {
    confidence?: true;
};
export type AiSuggestionMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    ticketId?: true;
    messageId?: true;
    intent?: true;
    draft?: true;
    confidence?: true;
    acceptedAt?: true;
    rejectedAt?: true;
    createdAt?: true;
};
export type AiSuggestionMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    ticketId?: true;
    messageId?: true;
    intent?: true;
    draft?: true;
    confidence?: true;
    acceptedAt?: true;
    rejectedAt?: true;
    createdAt?: true;
};
export type AiSuggestionCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    ticketId?: true;
    messageId?: true;
    intent?: true;
    draft?: true;
    citations?: true;
    confidence?: true;
    acceptedAt?: true;
    rejectedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type AiSuggestionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSuggestionWhereInput;
    orderBy?: Prisma.AiSuggestionOrderByWithRelationInput | Prisma.AiSuggestionOrderByWithRelationInput[];
    cursor?: Prisma.AiSuggestionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AiSuggestionCountAggregateInputType;
    _avg?: AiSuggestionAvgAggregateInputType;
    _sum?: AiSuggestionSumAggregateInputType;
    _min?: AiSuggestionMinAggregateInputType;
    _max?: AiSuggestionMaxAggregateInputType;
};
export type GetAiSuggestionAggregateType<T extends AiSuggestionAggregateArgs> = {
    [P in keyof T & keyof AggregateAiSuggestion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAiSuggestion[P]> : Prisma.GetScalarType<T[P], AggregateAiSuggestion[P]>;
};
export type AiSuggestionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSuggestionWhereInput;
    orderBy?: Prisma.AiSuggestionOrderByWithAggregationInput | Prisma.AiSuggestionOrderByWithAggregationInput[];
    by: Prisma.AiSuggestionScalarFieldEnum[] | Prisma.AiSuggestionScalarFieldEnum;
    having?: Prisma.AiSuggestionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AiSuggestionCountAggregateInputType | true;
    _avg?: AiSuggestionAvgAggregateInputType;
    _sum?: AiSuggestionSumAggregateInputType;
    _min?: AiSuggestionMinAggregateInputType;
    _max?: AiSuggestionMaxAggregateInputType;
};
export type AiSuggestionGroupByOutputType = {
    id: string;
    organizationId: string;
    ticketId: string;
    messageId: string | null;
    intent: string;
    draft: string;
    citations: runtime.JsonValue;
    confidence: number;
    acceptedAt: Date | null;
    rejectedAt: Date | null;
    createdAt: Date;
    _count: AiSuggestionCountAggregateOutputType | null;
    _avg: AiSuggestionAvgAggregateOutputType | null;
    _sum: AiSuggestionSumAggregateOutputType | null;
    _min: AiSuggestionMinAggregateOutputType | null;
    _max: AiSuggestionMaxAggregateOutputType | null;
};
export type GetAiSuggestionGroupByPayload<T extends AiSuggestionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AiSuggestionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AiSuggestionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AiSuggestionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AiSuggestionGroupByOutputType[P]>;
}>>;
export type AiSuggestionWhereInput = {
    AND?: Prisma.AiSuggestionWhereInput | Prisma.AiSuggestionWhereInput[];
    OR?: Prisma.AiSuggestionWhereInput[];
    NOT?: Prisma.AiSuggestionWhereInput | Prisma.AiSuggestionWhereInput[];
    id?: Prisma.StringFilter<"AiSuggestion"> | string;
    organizationId?: Prisma.StringFilter<"AiSuggestion"> | string;
    ticketId?: Prisma.StringFilter<"AiSuggestion"> | string;
    messageId?: Prisma.StringNullableFilter<"AiSuggestion"> | string | null;
    intent?: Prisma.StringFilter<"AiSuggestion"> | string;
    draft?: Prisma.StringFilter<"AiSuggestion"> | string;
    citations?: Prisma.JsonFilter<"AiSuggestion">;
    confidence?: Prisma.FloatFilter<"AiSuggestion"> | number;
    acceptedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AiSuggestion"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    ticket?: Prisma.XOR<Prisma.TicketScalarRelationFilter, Prisma.TicketWhereInput>;
};
export type AiSuggestionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    ticketId?: Prisma.SortOrder;
    messageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    draft?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    acceptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
    ticket?: Prisma.TicketOrderByWithRelationInput;
};
export type AiSuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AiSuggestionWhereInput | Prisma.AiSuggestionWhereInput[];
    OR?: Prisma.AiSuggestionWhereInput[];
    NOT?: Prisma.AiSuggestionWhereInput | Prisma.AiSuggestionWhereInput[];
    organizationId?: Prisma.StringFilter<"AiSuggestion"> | string;
    ticketId?: Prisma.StringFilter<"AiSuggestion"> | string;
    messageId?: Prisma.StringNullableFilter<"AiSuggestion"> | string | null;
    intent?: Prisma.StringFilter<"AiSuggestion"> | string;
    draft?: Prisma.StringFilter<"AiSuggestion"> | string;
    citations?: Prisma.JsonFilter<"AiSuggestion">;
    confidence?: Prisma.FloatFilter<"AiSuggestion"> | number;
    acceptedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AiSuggestion"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    ticket?: Prisma.XOR<Prisma.TicketScalarRelationFilter, Prisma.TicketWhereInput>;
}, "id">;
export type AiSuggestionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    ticketId?: Prisma.SortOrder;
    messageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    draft?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    acceptedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AiSuggestionCountOrderByAggregateInput;
    _avg?: Prisma.AiSuggestionAvgOrderByAggregateInput;
    _max?: Prisma.AiSuggestionMaxOrderByAggregateInput;
    _min?: Prisma.AiSuggestionMinOrderByAggregateInput;
    _sum?: Prisma.AiSuggestionSumOrderByAggregateInput;
};
export type AiSuggestionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AiSuggestionScalarWhereWithAggregatesInput | Prisma.AiSuggestionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AiSuggestionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AiSuggestionScalarWhereWithAggregatesInput | Prisma.AiSuggestionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AiSuggestion"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"AiSuggestion"> | string;
    ticketId?: Prisma.StringWithAggregatesFilter<"AiSuggestion"> | string;
    messageId?: Prisma.StringNullableWithAggregatesFilter<"AiSuggestion"> | string | null;
    intent?: Prisma.StringWithAggregatesFilter<"AiSuggestion"> | string;
    draft?: Prisma.StringWithAggregatesFilter<"AiSuggestion"> | string;
    citations?: Prisma.JsonWithAggregatesFilter<"AiSuggestion">;
    confidence?: Prisma.FloatWithAggregatesFilter<"AiSuggestion"> | number;
    acceptedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AiSuggestion"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"AiSuggestion"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AiSuggestion"> | Date | string;
};
export type AiSuggestionCreateInput = {
    id?: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutAiSuggestionsInput;
    ticket: Prisma.TicketCreateNestedOneWithoutAiSuggestionsInput;
};
export type AiSuggestionUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    ticketId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutAiSuggestionsNestedInput;
    ticket?: Prisma.TicketUpdateOneRequiredWithoutAiSuggestionsNestedInput;
};
export type AiSuggestionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionCreateManyInput = {
    id?: string;
    organizationId: string;
    ticketId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionListRelationFilter = {
    every?: Prisma.AiSuggestionWhereInput;
    some?: Prisma.AiSuggestionWhereInput;
    none?: Prisma.AiSuggestionWhereInput;
};
export type AiSuggestionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AiSuggestionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    ticketId?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    draft?: Prisma.SortOrder;
    citations?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    acceptedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSuggestionAvgOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type AiSuggestionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    ticketId?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    draft?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    acceptedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSuggestionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    ticketId?: Prisma.SortOrder;
    messageId?: Prisma.SortOrder;
    intent?: Prisma.SortOrder;
    draft?: Prisma.SortOrder;
    confidence?: Prisma.SortOrder;
    acceptedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AiSuggestionSumOrderByAggregateInput = {
    confidence?: Prisma.SortOrder;
};
export type AiSuggestionCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput> | Prisma.AiSuggestionCreateWithoutOrganizationInput[] | Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput | Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.AiSuggestionCreateManyOrganizationInputEnvelope;
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
};
export type AiSuggestionUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput> | Prisma.AiSuggestionCreateWithoutOrganizationInput[] | Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput | Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.AiSuggestionCreateManyOrganizationInputEnvelope;
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
};
export type AiSuggestionUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput> | Prisma.AiSuggestionCreateWithoutOrganizationInput[] | Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput | Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.AiSuggestionUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.AiSuggestionUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.AiSuggestionCreateManyOrganizationInputEnvelope;
    set?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    disconnect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    delete?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    update?: Prisma.AiSuggestionUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.AiSuggestionUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.AiSuggestionUpdateManyWithWhereWithoutOrganizationInput | Prisma.AiSuggestionUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
};
export type AiSuggestionUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput> | Prisma.AiSuggestionCreateWithoutOrganizationInput[] | Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput | Prisma.AiSuggestionCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.AiSuggestionUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.AiSuggestionUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.AiSuggestionCreateManyOrganizationInputEnvelope;
    set?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    disconnect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    delete?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    update?: Prisma.AiSuggestionUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.AiSuggestionUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.AiSuggestionUpdateManyWithWhereWithoutOrganizationInput | Prisma.AiSuggestionUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
};
export type AiSuggestionCreateNestedManyWithoutTicketInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput> | Prisma.AiSuggestionCreateWithoutTicketInput[] | Prisma.AiSuggestionUncheckedCreateWithoutTicketInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutTicketInput | Prisma.AiSuggestionCreateOrConnectWithoutTicketInput[];
    createMany?: Prisma.AiSuggestionCreateManyTicketInputEnvelope;
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
};
export type AiSuggestionUncheckedCreateNestedManyWithoutTicketInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput> | Prisma.AiSuggestionCreateWithoutTicketInput[] | Prisma.AiSuggestionUncheckedCreateWithoutTicketInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutTicketInput | Prisma.AiSuggestionCreateOrConnectWithoutTicketInput[];
    createMany?: Prisma.AiSuggestionCreateManyTicketInputEnvelope;
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
};
export type AiSuggestionUpdateManyWithoutTicketNestedInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput> | Prisma.AiSuggestionCreateWithoutTicketInput[] | Prisma.AiSuggestionUncheckedCreateWithoutTicketInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutTicketInput | Prisma.AiSuggestionCreateOrConnectWithoutTicketInput[];
    upsert?: Prisma.AiSuggestionUpsertWithWhereUniqueWithoutTicketInput | Prisma.AiSuggestionUpsertWithWhereUniqueWithoutTicketInput[];
    createMany?: Prisma.AiSuggestionCreateManyTicketInputEnvelope;
    set?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    disconnect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    delete?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    update?: Prisma.AiSuggestionUpdateWithWhereUniqueWithoutTicketInput | Prisma.AiSuggestionUpdateWithWhereUniqueWithoutTicketInput[];
    updateMany?: Prisma.AiSuggestionUpdateManyWithWhereWithoutTicketInput | Prisma.AiSuggestionUpdateManyWithWhereWithoutTicketInput[];
    deleteMany?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
};
export type AiSuggestionUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput> | Prisma.AiSuggestionCreateWithoutTicketInput[] | Prisma.AiSuggestionUncheckedCreateWithoutTicketInput[];
    connectOrCreate?: Prisma.AiSuggestionCreateOrConnectWithoutTicketInput | Prisma.AiSuggestionCreateOrConnectWithoutTicketInput[];
    upsert?: Prisma.AiSuggestionUpsertWithWhereUniqueWithoutTicketInput | Prisma.AiSuggestionUpsertWithWhereUniqueWithoutTicketInput[];
    createMany?: Prisma.AiSuggestionCreateManyTicketInputEnvelope;
    set?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    disconnect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    delete?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    connect?: Prisma.AiSuggestionWhereUniqueInput | Prisma.AiSuggestionWhereUniqueInput[];
    update?: Prisma.AiSuggestionUpdateWithWhereUniqueWithoutTicketInput | Prisma.AiSuggestionUpdateWithWhereUniqueWithoutTicketInput[];
    updateMany?: Prisma.AiSuggestionUpdateManyWithWhereWithoutTicketInput | Prisma.AiSuggestionUpdateManyWithWhereWithoutTicketInput[];
    deleteMany?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type AiSuggestionCreateWithoutOrganizationInput = {
    id?: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
    ticket: Prisma.TicketCreateNestedOneWithoutAiSuggestionsInput;
};
export type AiSuggestionUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    ticketId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput>;
};
export type AiSuggestionCreateManyOrganizationInputEnvelope = {
    data: Prisma.AiSuggestionCreateManyOrganizationInput | Prisma.AiSuggestionCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type AiSuggestionUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AiSuggestionUpdateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.AiSuggestionCreateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedCreateWithoutOrganizationInput>;
};
export type AiSuggestionUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateWithoutOrganizationInput, Prisma.AiSuggestionUncheckedUpdateWithoutOrganizationInput>;
};
export type AiSuggestionUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.AiSuggestionScalarWhereInput;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateManyMutationInput, Prisma.AiSuggestionUncheckedUpdateManyWithoutOrganizationInput>;
};
export type AiSuggestionScalarWhereInput = {
    AND?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
    OR?: Prisma.AiSuggestionScalarWhereInput[];
    NOT?: Prisma.AiSuggestionScalarWhereInput | Prisma.AiSuggestionScalarWhereInput[];
    id?: Prisma.StringFilter<"AiSuggestion"> | string;
    organizationId?: Prisma.StringFilter<"AiSuggestion"> | string;
    ticketId?: Prisma.StringFilter<"AiSuggestion"> | string;
    messageId?: Prisma.StringNullableFilter<"AiSuggestion"> | string | null;
    intent?: Prisma.StringFilter<"AiSuggestion"> | string;
    draft?: Prisma.StringFilter<"AiSuggestion"> | string;
    citations?: Prisma.JsonFilter<"AiSuggestion">;
    confidence?: Prisma.FloatFilter<"AiSuggestion"> | number;
    acceptedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"AiSuggestion"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"AiSuggestion"> | Date | string;
};
export type AiSuggestionCreateWithoutTicketInput = {
    id?: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutAiSuggestionsInput;
};
export type AiSuggestionUncheckedCreateWithoutTicketInput = {
    id?: string;
    organizationId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionCreateOrConnectWithoutTicketInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput>;
};
export type AiSuggestionCreateManyTicketInputEnvelope = {
    data: Prisma.AiSuggestionCreateManyTicketInput | Prisma.AiSuggestionCreateManyTicketInput[];
    skipDuplicates?: boolean;
};
export type AiSuggestionUpsertWithWhereUniqueWithoutTicketInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AiSuggestionUpdateWithoutTicketInput, Prisma.AiSuggestionUncheckedUpdateWithoutTicketInput>;
    create: Prisma.XOR<Prisma.AiSuggestionCreateWithoutTicketInput, Prisma.AiSuggestionUncheckedCreateWithoutTicketInput>;
};
export type AiSuggestionUpdateWithWhereUniqueWithoutTicketInput = {
    where: Prisma.AiSuggestionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateWithoutTicketInput, Prisma.AiSuggestionUncheckedUpdateWithoutTicketInput>;
};
export type AiSuggestionUpdateManyWithWhereWithoutTicketInput = {
    where: Prisma.AiSuggestionScalarWhereInput;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateManyMutationInput, Prisma.AiSuggestionUncheckedUpdateManyWithoutTicketInput>;
};
export type AiSuggestionCreateManyOrganizationInput = {
    id?: string;
    ticketId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ticket?: Prisma.TicketUpdateOneRequiredWithoutAiSuggestionsNestedInput;
};
export type AiSuggestionUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionCreateManyTicketInput = {
    id?: string;
    organizationId: string;
    messageId?: string | null;
    intent: string;
    draft: string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence: number;
    acceptedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type AiSuggestionUpdateWithoutTicketInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutAiSuggestionsNestedInput;
};
export type AiSuggestionUncheckedUpdateWithoutTicketInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionUncheckedUpdateManyWithoutTicketInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    messageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    intent?: Prisma.StringFieldUpdateOperationsInput | string;
    draft?: Prisma.StringFieldUpdateOperationsInput | string;
    citations?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    confidence?: Prisma.FloatFieldUpdateOperationsInput | number;
    acceptedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AiSuggestionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    ticketId?: boolean;
    messageId?: boolean;
    intent?: boolean;
    draft?: boolean;
    citations?: boolean;
    confidence?: boolean;
    acceptedAt?: boolean;
    rejectedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSuggestion"]>;
export type AiSuggestionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    ticketId?: boolean;
    messageId?: boolean;
    intent?: boolean;
    draft?: boolean;
    citations?: boolean;
    confidence?: boolean;
    acceptedAt?: boolean;
    rejectedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSuggestion"]>;
export type AiSuggestionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    ticketId?: boolean;
    messageId?: boolean;
    intent?: boolean;
    draft?: boolean;
    citations?: boolean;
    confidence?: boolean;
    acceptedAt?: boolean;
    rejectedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSuggestion"]>;
export type AiSuggestionSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    ticketId?: boolean;
    messageId?: boolean;
    intent?: boolean;
    draft?: boolean;
    citations?: boolean;
    confidence?: boolean;
    acceptedAt?: boolean;
    rejectedAt?: boolean;
    createdAt?: boolean;
};
export type AiSuggestionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "ticketId" | "messageId" | "intent" | "draft" | "citations" | "confidence" | "acceptedAt" | "rejectedAt" | "createdAt", ExtArgs["result"]["aiSuggestion"]>;
export type AiSuggestionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
};
export type AiSuggestionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
};
export type AiSuggestionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    ticket?: boolean | Prisma.TicketDefaultArgs<ExtArgs>;
};
export type $AiSuggestionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AiSuggestion";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
        ticket: Prisma.$TicketPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        ticketId: string;
        messageId: string | null;
        intent: string;
        draft: string;
        citations: runtime.JsonValue;
        confidence: number;
        acceptedAt: Date | null;
        rejectedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["aiSuggestion"]>;
    composites: {};
};
export type AiSuggestionGetPayload<S extends boolean | null | undefined | AiSuggestionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload, S>;
export type AiSuggestionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AiSuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AiSuggestionCountAggregateInputType | true;
};
export interface AiSuggestionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AiSuggestion'];
        meta: {
            name: 'AiSuggestion';
        };
    };
    findUnique<T extends AiSuggestionFindUniqueArgs>(args: Prisma.SelectSubset<T, AiSuggestionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AiSuggestionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AiSuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AiSuggestionFindFirstArgs>(args?: Prisma.SelectSubset<T, AiSuggestionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AiSuggestionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AiSuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AiSuggestionFindManyArgs>(args?: Prisma.SelectSubset<T, AiSuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AiSuggestionCreateArgs>(args: Prisma.SelectSubset<T, AiSuggestionCreateArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AiSuggestionCreateManyArgs>(args?: Prisma.SelectSubset<T, AiSuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AiSuggestionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AiSuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AiSuggestionDeleteArgs>(args: Prisma.SelectSubset<T, AiSuggestionDeleteArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AiSuggestionUpdateArgs>(args: Prisma.SelectSubset<T, AiSuggestionUpdateArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AiSuggestionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AiSuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AiSuggestionUpdateManyArgs>(args: Prisma.SelectSubset<T, AiSuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AiSuggestionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AiSuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AiSuggestionUpsertArgs>(args: Prisma.SelectSubset<T, AiSuggestionUpsertArgs<ExtArgs>>): Prisma.Prisma__AiSuggestionClient<runtime.Types.Result.GetResult<Prisma.$AiSuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AiSuggestionCountArgs>(args?: Prisma.Subset<T, AiSuggestionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AiSuggestionCountAggregateOutputType> : number>;
    aggregate<T extends AiSuggestionAggregateArgs>(args: Prisma.Subset<T, AiSuggestionAggregateArgs>): Prisma.PrismaPromise<GetAiSuggestionAggregateType<T>>;
    groupBy<T extends AiSuggestionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AiSuggestionGroupByArgs['orderBy'];
    } : {
        orderBy?: AiSuggestionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AiSuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AiSuggestionFieldRefs;
}
export interface Prisma__AiSuggestionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    ticket<T extends Prisma.TicketDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TicketDefaultArgs<ExtArgs>>): Prisma.Prisma__TicketClient<runtime.Types.Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AiSuggestionFieldRefs {
    readonly id: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly organizationId: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly ticketId: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly messageId: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly intent: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly draft: Prisma.FieldRef<"AiSuggestion", 'String'>;
    readonly citations: Prisma.FieldRef<"AiSuggestion", 'Json'>;
    readonly confidence: Prisma.FieldRef<"AiSuggestion", 'Float'>;
    readonly acceptedAt: Prisma.FieldRef<"AiSuggestion", 'DateTime'>;
    readonly rejectedAt: Prisma.FieldRef<"AiSuggestion", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"AiSuggestion", 'DateTime'>;
}
export type AiSuggestionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    where: Prisma.AiSuggestionWhereUniqueInput;
};
export type AiSuggestionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    where: Prisma.AiSuggestionWhereUniqueInput;
};
export type AiSuggestionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSuggestionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSuggestionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AiSuggestionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSuggestionCreateInput, Prisma.AiSuggestionUncheckedCreateInput>;
};
export type AiSuggestionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AiSuggestionCreateManyInput | Prisma.AiSuggestionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AiSuggestionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    data: Prisma.AiSuggestionCreateManyInput | Prisma.AiSuggestionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AiSuggestionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AiSuggestionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateInput, Prisma.AiSuggestionUncheckedUpdateInput>;
    where: Prisma.AiSuggestionWhereUniqueInput;
};
export type AiSuggestionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AiSuggestionUpdateManyMutationInput, Prisma.AiSuggestionUncheckedUpdateManyInput>;
    where?: Prisma.AiSuggestionWhereInput;
    limit?: number;
};
export type AiSuggestionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSuggestionUpdateManyMutationInput, Prisma.AiSuggestionUncheckedUpdateManyInput>;
    where?: Prisma.AiSuggestionWhereInput;
    limit?: number;
    include?: Prisma.AiSuggestionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AiSuggestionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    where: Prisma.AiSuggestionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSuggestionCreateInput, Prisma.AiSuggestionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AiSuggestionUpdateInput, Prisma.AiSuggestionUncheckedUpdateInput>;
};
export type AiSuggestionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
    where: Prisma.AiSuggestionWhereUniqueInput;
};
export type AiSuggestionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSuggestionWhereInput;
    limit?: number;
};
export type AiSuggestionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSuggestionSelect<ExtArgs> | null;
    omit?: Prisma.AiSuggestionOmit<ExtArgs> | null;
    include?: Prisma.AiSuggestionInclude<ExtArgs> | null;
};
