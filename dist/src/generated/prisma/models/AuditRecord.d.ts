import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AuditRecordModel = runtime.Types.Result.DefaultSelection<Prisma.$AuditRecordPayload>;
export type AggregateAuditRecord = {
    _count: AuditRecordCountAggregateOutputType | null;
    _min: AuditRecordMinAggregateOutputType | null;
    _max: AuditRecordMaxAggregateOutputType | null;
};
export type AuditRecordMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    actorType: $Enums.AuditActorType | null;
    actorId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    createdAt: Date | null;
};
export type AuditRecordMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    actorType: $Enums.AuditActorType | null;
    actorId: string | null;
    action: string | null;
    entityType: string | null;
    entityId: string | null;
    createdAt: Date | null;
};
export type AuditRecordCountAggregateOutputType = {
    id: number;
    organizationId: number;
    actorType: number;
    actorId: number;
    action: number;
    entityType: number;
    entityId: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type AuditRecordMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    actorType?: true;
    actorId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    createdAt?: true;
};
export type AuditRecordMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    actorType?: true;
    actorId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    createdAt?: true;
};
export type AuditRecordCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    actorType?: true;
    actorId?: true;
    action?: true;
    entityType?: true;
    entityId?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type AuditRecordAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditRecordWhereInput;
    orderBy?: Prisma.AuditRecordOrderByWithRelationInput | Prisma.AuditRecordOrderByWithRelationInput[];
    cursor?: Prisma.AuditRecordWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AuditRecordCountAggregateInputType;
    _min?: AuditRecordMinAggregateInputType;
    _max?: AuditRecordMaxAggregateInputType;
};
export type GetAuditRecordAggregateType<T extends AuditRecordAggregateArgs> = {
    [P in keyof T & keyof AggregateAuditRecord]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAuditRecord[P]> : Prisma.GetScalarType<T[P], AggregateAuditRecord[P]>;
};
export type AuditRecordGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditRecordWhereInput;
    orderBy?: Prisma.AuditRecordOrderByWithAggregationInput | Prisma.AuditRecordOrderByWithAggregationInput[];
    by: Prisma.AuditRecordScalarFieldEnum[] | Prisma.AuditRecordScalarFieldEnum;
    having?: Prisma.AuditRecordScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AuditRecordCountAggregateInputType | true;
    _min?: AuditRecordMinAggregateInputType;
    _max?: AuditRecordMaxAggregateInputType;
};
export type AuditRecordGroupByOutputType = {
    id: string;
    organizationId: string;
    actorType: $Enums.AuditActorType;
    actorId: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata: runtime.JsonValue;
    createdAt: Date;
    _count: AuditRecordCountAggregateOutputType | null;
    _min: AuditRecordMinAggregateOutputType | null;
    _max: AuditRecordMaxAggregateOutputType | null;
};
export type GetAuditRecordGroupByPayload<T extends AuditRecordGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AuditRecordGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AuditRecordGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AuditRecordGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AuditRecordGroupByOutputType[P]>;
}>>;
export type AuditRecordWhereInput = {
    AND?: Prisma.AuditRecordWhereInput | Prisma.AuditRecordWhereInput[];
    OR?: Prisma.AuditRecordWhereInput[];
    NOT?: Prisma.AuditRecordWhereInput | Prisma.AuditRecordWhereInput[];
    id?: Prisma.StringFilter<"AuditRecord"> | string;
    organizationId?: Prisma.StringFilter<"AuditRecord"> | string;
    actorType?: Prisma.EnumAuditActorTypeFilter<"AuditRecord"> | $Enums.AuditActorType;
    actorId?: Prisma.StringNullableFilter<"AuditRecord"> | string | null;
    action?: Prisma.StringFilter<"AuditRecord"> | string;
    entityType?: Prisma.StringFilter<"AuditRecord"> | string;
    entityId?: Prisma.StringFilter<"AuditRecord"> | string;
    metadata?: Prisma.JsonFilter<"AuditRecord">;
    createdAt?: Prisma.DateTimeFilter<"AuditRecord"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
};
export type AuditRecordOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
};
export type AuditRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AuditRecordWhereInput | Prisma.AuditRecordWhereInput[];
    OR?: Prisma.AuditRecordWhereInput[];
    NOT?: Prisma.AuditRecordWhereInput | Prisma.AuditRecordWhereInput[];
    organizationId?: Prisma.StringFilter<"AuditRecord"> | string;
    actorType?: Prisma.EnumAuditActorTypeFilter<"AuditRecord"> | $Enums.AuditActorType;
    actorId?: Prisma.StringNullableFilter<"AuditRecord"> | string | null;
    action?: Prisma.StringFilter<"AuditRecord"> | string;
    entityType?: Prisma.StringFilter<"AuditRecord"> | string;
    entityId?: Prisma.StringFilter<"AuditRecord"> | string;
    metadata?: Prisma.JsonFilter<"AuditRecord">;
    createdAt?: Prisma.DateTimeFilter<"AuditRecord"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
}, "id">;
export type AuditRecordOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    actorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AuditRecordCountOrderByAggregateInput;
    _max?: Prisma.AuditRecordMaxOrderByAggregateInput;
    _min?: Prisma.AuditRecordMinOrderByAggregateInput;
};
export type AuditRecordScalarWhereWithAggregatesInput = {
    AND?: Prisma.AuditRecordScalarWhereWithAggregatesInput | Prisma.AuditRecordScalarWhereWithAggregatesInput[];
    OR?: Prisma.AuditRecordScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AuditRecordScalarWhereWithAggregatesInput | Prisma.AuditRecordScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AuditRecord"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"AuditRecord"> | string;
    actorType?: Prisma.EnumAuditActorTypeWithAggregatesFilter<"AuditRecord"> | $Enums.AuditActorType;
    actorId?: Prisma.StringNullableWithAggregatesFilter<"AuditRecord"> | string | null;
    action?: Prisma.StringWithAggregatesFilter<"AuditRecord"> | string;
    entityType?: Prisma.StringWithAggregatesFilter<"AuditRecord"> | string;
    entityId?: Prisma.StringWithAggregatesFilter<"AuditRecord"> | string;
    metadata?: Prisma.JsonWithAggregatesFilter<"AuditRecord">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AuditRecord"> | Date | string;
};
export type AuditRecordCreateInput = {
    id?: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutAuditRecordsInput;
};
export type AuditRecordUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditRecordUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutAuditRecordsNestedInput;
};
export type AuditRecordUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordCreateManyInput = {
    id?: string;
    organizationId: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditRecordUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordListRelationFilter = {
    every?: Prisma.AuditRecordWhereInput;
    some?: Prisma.AuditRecordWhereInput;
    none?: Prisma.AuditRecordWhereInput;
};
export type AuditRecordOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AuditRecordCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditRecordMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditRecordMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    actorType?: Prisma.SortOrder;
    actorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AuditRecordCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput> | Prisma.AuditRecordCreateWithoutOrganizationInput[] | Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput | Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.AuditRecordCreateManyOrganizationInputEnvelope;
    connect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
};
export type AuditRecordUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput> | Prisma.AuditRecordCreateWithoutOrganizationInput[] | Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput | Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.AuditRecordCreateManyOrganizationInputEnvelope;
    connect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
};
export type AuditRecordUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput> | Prisma.AuditRecordCreateWithoutOrganizationInput[] | Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput | Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.AuditRecordUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.AuditRecordUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.AuditRecordCreateManyOrganizationInputEnvelope;
    set?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    disconnect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    delete?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    connect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    update?: Prisma.AuditRecordUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.AuditRecordUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.AuditRecordUpdateManyWithWhereWithoutOrganizationInput | Prisma.AuditRecordUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.AuditRecordScalarWhereInput | Prisma.AuditRecordScalarWhereInput[];
};
export type AuditRecordUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput> | Prisma.AuditRecordCreateWithoutOrganizationInput[] | Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput | Prisma.AuditRecordCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.AuditRecordUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.AuditRecordUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.AuditRecordCreateManyOrganizationInputEnvelope;
    set?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    disconnect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    delete?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    connect?: Prisma.AuditRecordWhereUniqueInput | Prisma.AuditRecordWhereUniqueInput[];
    update?: Prisma.AuditRecordUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.AuditRecordUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.AuditRecordUpdateManyWithWhereWithoutOrganizationInput | Prisma.AuditRecordUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.AuditRecordScalarWhereInput | Prisma.AuditRecordScalarWhereInput[];
};
export type EnumAuditActorTypeFieldUpdateOperationsInput = {
    set?: $Enums.AuditActorType;
};
export type AuditRecordCreateWithoutOrganizationInput = {
    id?: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditRecordUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditRecordCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.AuditRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput>;
};
export type AuditRecordCreateManyOrganizationInputEnvelope = {
    data: Prisma.AuditRecordCreateManyOrganizationInput | Prisma.AuditRecordCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type AuditRecordUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.AuditRecordWhereUniqueInput;
    update: Prisma.XOR<Prisma.AuditRecordUpdateWithoutOrganizationInput, Prisma.AuditRecordUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.AuditRecordCreateWithoutOrganizationInput, Prisma.AuditRecordUncheckedCreateWithoutOrganizationInput>;
};
export type AuditRecordUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.AuditRecordWhereUniqueInput;
    data: Prisma.XOR<Prisma.AuditRecordUpdateWithoutOrganizationInput, Prisma.AuditRecordUncheckedUpdateWithoutOrganizationInput>;
};
export type AuditRecordUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.AuditRecordScalarWhereInput;
    data: Prisma.XOR<Prisma.AuditRecordUpdateManyMutationInput, Prisma.AuditRecordUncheckedUpdateManyWithoutOrganizationInput>;
};
export type AuditRecordScalarWhereInput = {
    AND?: Prisma.AuditRecordScalarWhereInput | Prisma.AuditRecordScalarWhereInput[];
    OR?: Prisma.AuditRecordScalarWhereInput[];
    NOT?: Prisma.AuditRecordScalarWhereInput | Prisma.AuditRecordScalarWhereInput[];
    id?: Prisma.StringFilter<"AuditRecord"> | string;
    organizationId?: Prisma.StringFilter<"AuditRecord"> | string;
    actorType?: Prisma.EnumAuditActorTypeFilter<"AuditRecord"> | $Enums.AuditActorType;
    actorId?: Prisma.StringNullableFilter<"AuditRecord"> | string | null;
    action?: Prisma.StringFilter<"AuditRecord"> | string;
    entityType?: Prisma.StringFilter<"AuditRecord"> | string;
    entityId?: Prisma.StringFilter<"AuditRecord"> | string;
    metadata?: Prisma.JsonFilter<"AuditRecord">;
    createdAt?: Prisma.DateTimeFilter<"AuditRecord"> | Date | string;
};
export type AuditRecordCreateManyOrganizationInput = {
    id?: string;
    actorType: $Enums.AuditActorType;
    actorId?: string | null;
    action: string;
    entityType: string;
    entityId: string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type AuditRecordUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    actorType?: Prisma.EnumAuditActorTypeFieldUpdateOperationsInput | $Enums.AuditActorType;
    actorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    metadata?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AuditRecordSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    actorType?: boolean;
    actorId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditRecord"]>;
export type AuditRecordSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    actorType?: boolean;
    actorId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditRecord"]>;
export type AuditRecordSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    actorType?: boolean;
    actorId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["auditRecord"]>;
export type AuditRecordSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    actorType?: boolean;
    actorId?: boolean;
    action?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type AuditRecordOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "actorType" | "actorId" | "action" | "entityType" | "entityId" | "metadata" | "createdAt", ExtArgs["result"]["auditRecord"]>;
export type AuditRecordInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type AuditRecordIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type AuditRecordIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type $AuditRecordPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AuditRecord";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        actorType: $Enums.AuditActorType;
        actorId: string | null;
        action: string;
        entityType: string;
        entityId: string;
        metadata: runtime.JsonValue;
        createdAt: Date;
    }, ExtArgs["result"]["auditRecord"]>;
    composites: {};
};
export type AuditRecordGetPayload<S extends boolean | null | undefined | AuditRecordDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload, S>;
export type AuditRecordCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AuditRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AuditRecordCountAggregateInputType | true;
};
export interface AuditRecordDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AuditRecord'];
        meta: {
            name: 'AuditRecord';
        };
    };
    findUnique<T extends AuditRecordFindUniqueArgs>(args: Prisma.SelectSubset<T, AuditRecordFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AuditRecordFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AuditRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AuditRecordFindFirstArgs>(args?: Prisma.SelectSubset<T, AuditRecordFindFirstArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AuditRecordFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AuditRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AuditRecordFindManyArgs>(args?: Prisma.SelectSubset<T, AuditRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AuditRecordCreateArgs>(args: Prisma.SelectSubset<T, AuditRecordCreateArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AuditRecordCreateManyArgs>(args?: Prisma.SelectSubset<T, AuditRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AuditRecordCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AuditRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AuditRecordDeleteArgs>(args: Prisma.SelectSubset<T, AuditRecordDeleteArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AuditRecordUpdateArgs>(args: Prisma.SelectSubset<T, AuditRecordUpdateArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AuditRecordDeleteManyArgs>(args?: Prisma.SelectSubset<T, AuditRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AuditRecordUpdateManyArgs>(args: Prisma.SelectSubset<T, AuditRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AuditRecordUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AuditRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AuditRecordUpsertArgs>(args: Prisma.SelectSubset<T, AuditRecordUpsertArgs<ExtArgs>>): Prisma.Prisma__AuditRecordClient<runtime.Types.Result.GetResult<Prisma.$AuditRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AuditRecordCountArgs>(args?: Prisma.Subset<T, AuditRecordCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AuditRecordCountAggregateOutputType> : number>;
    aggregate<T extends AuditRecordAggregateArgs>(args: Prisma.Subset<T, AuditRecordAggregateArgs>): Prisma.PrismaPromise<GetAuditRecordAggregateType<T>>;
    groupBy<T extends AuditRecordGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AuditRecordGroupByArgs['orderBy'];
    } : {
        orderBy?: AuditRecordGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AuditRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AuditRecordFieldRefs;
}
export interface Prisma__AuditRecordClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AuditRecordFieldRefs {
    readonly id: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly organizationId: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly actorType: Prisma.FieldRef<"AuditRecord", 'AuditActorType'>;
    readonly actorId: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly action: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly entityType: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly entityId: Prisma.FieldRef<"AuditRecord", 'String'>;
    readonly metadata: Prisma.FieldRef<"AuditRecord", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"AuditRecord", 'DateTime'>;
}
export type AuditRecordFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    where: Prisma.AuditRecordWhereUniqueInput;
};
export type AuditRecordFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    where: Prisma.AuditRecordWhereUniqueInput;
};
export type AuditRecordFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditRecordFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditRecordFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AuditRecordCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditRecordCreateInput, Prisma.AuditRecordUncheckedCreateInput>;
};
export type AuditRecordCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AuditRecordCreateManyInput | Prisma.AuditRecordCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AuditRecordCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    data: Prisma.AuditRecordCreateManyInput | Prisma.AuditRecordCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AuditRecordIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AuditRecordUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditRecordUpdateInput, Prisma.AuditRecordUncheckedUpdateInput>;
    where: Prisma.AuditRecordWhereUniqueInput;
};
export type AuditRecordUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AuditRecordUpdateManyMutationInput, Prisma.AuditRecordUncheckedUpdateManyInput>;
    where?: Prisma.AuditRecordWhereInput;
    limit?: number;
};
export type AuditRecordUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AuditRecordUpdateManyMutationInput, Prisma.AuditRecordUncheckedUpdateManyInput>;
    where?: Prisma.AuditRecordWhereInput;
    limit?: number;
    include?: Prisma.AuditRecordIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AuditRecordUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    where: Prisma.AuditRecordWhereUniqueInput;
    create: Prisma.XOR<Prisma.AuditRecordCreateInput, Prisma.AuditRecordUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AuditRecordUpdateInput, Prisma.AuditRecordUncheckedUpdateInput>;
};
export type AuditRecordDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
    where: Prisma.AuditRecordWhereUniqueInput;
};
export type AuditRecordDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AuditRecordWhereInput;
    limit?: number;
};
export type AuditRecordDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AuditRecordSelect<ExtArgs> | null;
    omit?: Prisma.AuditRecordOmit<ExtArgs> | null;
    include?: Prisma.AuditRecordInclude<ExtArgs> | null;
};
