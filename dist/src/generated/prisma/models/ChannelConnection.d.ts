import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type ChannelConnectionModel = runtime.Types.Result.DefaultSelection<Prisma.$ChannelConnectionPayload>;
export type AggregateChannelConnection = {
    _count: ChannelConnectionCountAggregateOutputType | null;
    _min: ChannelConnectionMinAggregateOutputType | null;
    _max: ChannelConnectionMaxAggregateOutputType | null;
};
export type ChannelConnectionMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    channel: $Enums.Channel | null;
    status: $Enums.ChannelStatus | null;
    verifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChannelConnectionMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    channel: $Enums.Channel | null;
    status: $Enums.ChannelStatus | null;
    verifiedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChannelConnectionCountAggregateOutputType = {
    id: number;
    organizationId: number;
    channel: number;
    status: number;
    config: number;
    verifiedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChannelConnectionMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    channel?: true;
    status?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChannelConnectionMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    channel?: true;
    status?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChannelConnectionCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    channel?: true;
    status?: true;
    config?: true;
    verifiedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChannelConnectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChannelConnectionWhereInput;
    orderBy?: Prisma.ChannelConnectionOrderByWithRelationInput | Prisma.ChannelConnectionOrderByWithRelationInput[];
    cursor?: Prisma.ChannelConnectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChannelConnectionCountAggregateInputType;
    _min?: ChannelConnectionMinAggregateInputType;
    _max?: ChannelConnectionMaxAggregateInputType;
};
export type GetChannelConnectionAggregateType<T extends ChannelConnectionAggregateArgs> = {
    [P in keyof T & keyof AggregateChannelConnection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChannelConnection[P]> : Prisma.GetScalarType<T[P], AggregateChannelConnection[P]>;
};
export type ChannelConnectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChannelConnectionWhereInput;
    orderBy?: Prisma.ChannelConnectionOrderByWithAggregationInput | Prisma.ChannelConnectionOrderByWithAggregationInput[];
    by: Prisma.ChannelConnectionScalarFieldEnum[] | Prisma.ChannelConnectionScalarFieldEnum;
    having?: Prisma.ChannelConnectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChannelConnectionCountAggregateInputType | true;
    _min?: ChannelConnectionMinAggregateInputType;
    _max?: ChannelConnectionMaxAggregateInputType;
};
export type ChannelConnectionGroupByOutputType = {
    id: string;
    organizationId: string;
    channel: $Enums.Channel;
    status: $Enums.ChannelStatus;
    config: runtime.JsonValue;
    verifiedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ChannelConnectionCountAggregateOutputType | null;
    _min: ChannelConnectionMinAggregateOutputType | null;
    _max: ChannelConnectionMaxAggregateOutputType | null;
};
export type GetChannelConnectionGroupByPayload<T extends ChannelConnectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChannelConnectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChannelConnectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChannelConnectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChannelConnectionGroupByOutputType[P]>;
}>>;
export type ChannelConnectionWhereInput = {
    AND?: Prisma.ChannelConnectionWhereInput | Prisma.ChannelConnectionWhereInput[];
    OR?: Prisma.ChannelConnectionWhereInput[];
    NOT?: Prisma.ChannelConnectionWhereInput | Prisma.ChannelConnectionWhereInput[];
    id?: Prisma.StringFilter<"ChannelConnection"> | string;
    organizationId?: Prisma.StringFilter<"ChannelConnection"> | string;
    channel?: Prisma.EnumChannelFilter<"ChannelConnection"> | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFilter<"ChannelConnection"> | $Enums.ChannelStatus;
    config?: Prisma.JsonFilter<"ChannelConnection">;
    verifiedAt?: Prisma.DateTimeNullableFilter<"ChannelConnection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
};
export type ChannelConnectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    config?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
};
export type ChannelConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    organizationId_channel?: Prisma.ChannelConnectionOrganizationIdChannelCompoundUniqueInput;
    AND?: Prisma.ChannelConnectionWhereInput | Prisma.ChannelConnectionWhereInput[];
    OR?: Prisma.ChannelConnectionWhereInput[];
    NOT?: Prisma.ChannelConnectionWhereInput | Prisma.ChannelConnectionWhereInput[];
    organizationId?: Prisma.StringFilter<"ChannelConnection"> | string;
    channel?: Prisma.EnumChannelFilter<"ChannelConnection"> | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFilter<"ChannelConnection"> | $Enums.ChannelStatus;
    config?: Prisma.JsonFilter<"ChannelConnection">;
    verifiedAt?: Prisma.DateTimeNullableFilter<"ChannelConnection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
}, "id" | "organizationId_channel">;
export type ChannelConnectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    config?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChannelConnectionCountOrderByAggregateInput;
    _max?: Prisma.ChannelConnectionMaxOrderByAggregateInput;
    _min?: Prisma.ChannelConnectionMinOrderByAggregateInput;
};
export type ChannelConnectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChannelConnectionScalarWhereWithAggregatesInput | Prisma.ChannelConnectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChannelConnectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChannelConnectionScalarWhereWithAggregatesInput | Prisma.ChannelConnectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ChannelConnection"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"ChannelConnection"> | string;
    channel?: Prisma.EnumChannelWithAggregatesFilter<"ChannelConnection"> | $Enums.Channel;
    status?: Prisma.EnumChannelStatusWithAggregatesFilter<"ChannelConnection"> | $Enums.ChannelStatus;
    config?: Prisma.JsonWithAggregatesFilter<"ChannelConnection">;
    verifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ChannelConnection"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ChannelConnection"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ChannelConnection"> | Date | string;
};
export type ChannelConnectionCreateInput = {
    id?: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutChannelConnectionsInput;
};
export type ChannelConnectionUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChannelConnectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutChannelConnectionsNestedInput;
};
export type ChannelConnectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionCreateManyInput = {
    id?: string;
    organizationId: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChannelConnectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionListRelationFilter = {
    every?: Prisma.ChannelConnectionWhereInput;
    some?: Prisma.ChannelConnectionWhereInput;
    none?: Prisma.ChannelConnectionWhereInput;
};
export type ChannelConnectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChannelConnectionOrganizationIdChannelCompoundUniqueInput = {
    organizationId: string;
    channel: $Enums.Channel;
};
export type ChannelConnectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    config?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChannelConnectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChannelConnectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    channel?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    verifiedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChannelConnectionCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput> | Prisma.ChannelConnectionCreateWithoutOrganizationInput[] | Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput | Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.ChannelConnectionCreateManyOrganizationInputEnvelope;
    connect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
};
export type ChannelConnectionUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput> | Prisma.ChannelConnectionCreateWithoutOrganizationInput[] | Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput | Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.ChannelConnectionCreateManyOrganizationInputEnvelope;
    connect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
};
export type ChannelConnectionUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput> | Prisma.ChannelConnectionCreateWithoutOrganizationInput[] | Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput | Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.ChannelConnectionUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.ChannelConnectionUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.ChannelConnectionCreateManyOrganizationInputEnvelope;
    set?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    disconnect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    delete?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    connect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    update?: Prisma.ChannelConnectionUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.ChannelConnectionUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.ChannelConnectionUpdateManyWithWhereWithoutOrganizationInput | Prisma.ChannelConnectionUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.ChannelConnectionScalarWhereInput | Prisma.ChannelConnectionScalarWhereInput[];
};
export type ChannelConnectionUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput> | Prisma.ChannelConnectionCreateWithoutOrganizationInput[] | Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput | Prisma.ChannelConnectionCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.ChannelConnectionUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.ChannelConnectionUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.ChannelConnectionCreateManyOrganizationInputEnvelope;
    set?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    disconnect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    delete?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    connect?: Prisma.ChannelConnectionWhereUniqueInput | Prisma.ChannelConnectionWhereUniqueInput[];
    update?: Prisma.ChannelConnectionUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.ChannelConnectionUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.ChannelConnectionUpdateManyWithWhereWithoutOrganizationInput | Prisma.ChannelConnectionUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.ChannelConnectionScalarWhereInput | Prisma.ChannelConnectionScalarWhereInput[];
};
export type EnumChannelStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChannelStatus;
};
export type ChannelConnectionCreateWithoutOrganizationInput = {
    id?: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChannelConnectionUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChannelConnectionCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.ChannelConnectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput>;
};
export type ChannelConnectionCreateManyOrganizationInputEnvelope = {
    data: Prisma.ChannelConnectionCreateManyOrganizationInput | Prisma.ChannelConnectionCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type ChannelConnectionUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.ChannelConnectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChannelConnectionUpdateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.ChannelConnectionCreateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedCreateWithoutOrganizationInput>;
};
export type ChannelConnectionUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.ChannelConnectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChannelConnectionUpdateWithoutOrganizationInput, Prisma.ChannelConnectionUncheckedUpdateWithoutOrganizationInput>;
};
export type ChannelConnectionUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.ChannelConnectionScalarWhereInput;
    data: Prisma.XOR<Prisma.ChannelConnectionUpdateManyMutationInput, Prisma.ChannelConnectionUncheckedUpdateManyWithoutOrganizationInput>;
};
export type ChannelConnectionScalarWhereInput = {
    AND?: Prisma.ChannelConnectionScalarWhereInput | Prisma.ChannelConnectionScalarWhereInput[];
    OR?: Prisma.ChannelConnectionScalarWhereInput[];
    NOT?: Prisma.ChannelConnectionScalarWhereInput | Prisma.ChannelConnectionScalarWhereInput[];
    id?: Prisma.StringFilter<"ChannelConnection"> | string;
    organizationId?: Prisma.StringFilter<"ChannelConnection"> | string;
    channel?: Prisma.EnumChannelFilter<"ChannelConnection"> | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFilter<"ChannelConnection"> | $Enums.ChannelStatus;
    config?: Prisma.JsonFilter<"ChannelConnection">;
    verifiedAt?: Prisma.DateTimeNullableFilter<"ChannelConnection"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChannelConnection"> | Date | string;
};
export type ChannelConnectionCreateManyOrganizationInput = {
    id?: string;
    channel: $Enums.Channel;
    status?: $Enums.ChannelStatus;
    config: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChannelConnectionUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    channel?: Prisma.EnumChannelFieldUpdateOperationsInput | $Enums.Channel;
    status?: Prisma.EnumChannelStatusFieldUpdateOperationsInput | $Enums.ChannelStatus;
    config?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    verifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChannelConnectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    channel?: boolean;
    status?: boolean;
    config?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["channelConnection"]>;
export type ChannelConnectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    channel?: boolean;
    status?: boolean;
    config?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["channelConnection"]>;
export type ChannelConnectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    channel?: boolean;
    status?: boolean;
    config?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["channelConnection"]>;
export type ChannelConnectionSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    channel?: boolean;
    status?: boolean;
    config?: boolean;
    verifiedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChannelConnectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "channel" | "status" | "config" | "verifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["channelConnection"]>;
export type ChannelConnectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type ChannelConnectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type ChannelConnectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type $ChannelConnectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ChannelConnection";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        channel: $Enums.Channel;
        status: $Enums.ChannelStatus;
        config: runtime.JsonValue;
        verifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["channelConnection"]>;
    composites: {};
};
export type ChannelConnectionGetPayload<S extends boolean | null | undefined | ChannelConnectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload, S>;
export type ChannelConnectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChannelConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChannelConnectionCountAggregateInputType | true;
};
export interface ChannelConnectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ChannelConnection'];
        meta: {
            name: 'ChannelConnection';
        };
    };
    findUnique<T extends ChannelConnectionFindUniqueArgs>(args: Prisma.SelectSubset<T, ChannelConnectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChannelConnectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChannelConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChannelConnectionFindFirstArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChannelConnectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChannelConnectionFindManyArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChannelConnectionCreateArgs>(args: Prisma.SelectSubset<T, ChannelConnectionCreateArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChannelConnectionCreateManyArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChannelConnectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChannelConnectionDeleteArgs>(args: Prisma.SelectSubset<T, ChannelConnectionDeleteArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChannelConnectionUpdateArgs>(args: Prisma.SelectSubset<T, ChannelConnectionUpdateArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChannelConnectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChannelConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChannelConnectionUpdateManyArgs>(args: Prisma.SelectSubset<T, ChannelConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChannelConnectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChannelConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChannelConnectionUpsertArgs>(args: Prisma.SelectSubset<T, ChannelConnectionUpsertArgs<ExtArgs>>): Prisma.Prisma__ChannelConnectionClient<runtime.Types.Result.GetResult<Prisma.$ChannelConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChannelConnectionCountArgs>(args?: Prisma.Subset<T, ChannelConnectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChannelConnectionCountAggregateOutputType> : number>;
    aggregate<T extends ChannelConnectionAggregateArgs>(args: Prisma.Subset<T, ChannelConnectionAggregateArgs>): Prisma.PrismaPromise<GetChannelConnectionAggregateType<T>>;
    groupBy<T extends ChannelConnectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChannelConnectionGroupByArgs['orderBy'];
    } : {
        orderBy?: ChannelConnectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChannelConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChannelConnectionFieldRefs;
}
export interface Prisma__ChannelConnectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChannelConnectionFieldRefs {
    readonly id: Prisma.FieldRef<"ChannelConnection", 'String'>;
    readonly organizationId: Prisma.FieldRef<"ChannelConnection", 'String'>;
    readonly channel: Prisma.FieldRef<"ChannelConnection", 'Channel'>;
    readonly status: Prisma.FieldRef<"ChannelConnection", 'ChannelStatus'>;
    readonly config: Prisma.FieldRef<"ChannelConnection", 'Json'>;
    readonly verifiedAt: Prisma.FieldRef<"ChannelConnection", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ChannelConnection", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ChannelConnection", 'DateTime'>;
}
export type ChannelConnectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    where: Prisma.ChannelConnectionWhereUniqueInput;
};
export type ChannelConnectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    where: Prisma.ChannelConnectionWhereUniqueInput;
};
export type ChannelConnectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChannelConnectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChannelConnectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChannelConnectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChannelConnectionCreateInput, Prisma.ChannelConnectionUncheckedCreateInput>;
};
export type ChannelConnectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChannelConnectionCreateManyInput | Prisma.ChannelConnectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChannelConnectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    data: Prisma.ChannelConnectionCreateManyInput | Prisma.ChannelConnectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChannelConnectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChannelConnectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChannelConnectionUpdateInput, Prisma.ChannelConnectionUncheckedUpdateInput>;
    where: Prisma.ChannelConnectionWhereUniqueInput;
};
export type ChannelConnectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChannelConnectionUpdateManyMutationInput, Prisma.ChannelConnectionUncheckedUpdateManyInput>;
    where?: Prisma.ChannelConnectionWhereInput;
    limit?: number;
};
export type ChannelConnectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChannelConnectionUpdateManyMutationInput, Prisma.ChannelConnectionUncheckedUpdateManyInput>;
    where?: Prisma.ChannelConnectionWhereInput;
    limit?: number;
    include?: Prisma.ChannelConnectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChannelConnectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    where: Prisma.ChannelConnectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChannelConnectionCreateInput, Prisma.ChannelConnectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChannelConnectionUpdateInput, Prisma.ChannelConnectionUncheckedUpdateInput>;
};
export type ChannelConnectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
    where: Prisma.ChannelConnectionWhereUniqueInput;
};
export type ChannelConnectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChannelConnectionWhereInput;
    limit?: number;
};
export type ChannelConnectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChannelConnectionSelect<ExtArgs> | null;
    omit?: Prisma.ChannelConnectionOmit<ExtArgs> | null;
    include?: Prisma.ChannelConnectionInclude<ExtArgs> | null;
};
