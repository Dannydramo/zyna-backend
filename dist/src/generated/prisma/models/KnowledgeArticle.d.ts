import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type KnowledgeArticleModel = runtime.Types.Result.DefaultSelection<Prisma.$KnowledgeArticlePayload>;
export type AggregateKnowledgeArticle = {
    _count: KnowledgeArticleCountAggregateOutputType | null;
    _min: KnowledgeArticleMinAggregateOutputType | null;
    _max: KnowledgeArticleMaxAggregateOutputType | null;
};
export type KnowledgeArticleMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    title: string | null;
    body: string | null;
    freshnessUpdatedAt: Date | null;
    createdAt: Date | null;
};
export type KnowledgeArticleMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    title: string | null;
    body: string | null;
    freshnessUpdatedAt: Date | null;
    createdAt: Date | null;
};
export type KnowledgeArticleCountAggregateOutputType = {
    id: number;
    organizationId: number;
    title: number;
    body: number;
    tags: number;
    embedding: number;
    freshnessUpdatedAt: number;
    createdAt: number;
    _all: number;
};
export type KnowledgeArticleMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    title?: true;
    body?: true;
    freshnessUpdatedAt?: true;
    createdAt?: true;
};
export type KnowledgeArticleMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    title?: true;
    body?: true;
    freshnessUpdatedAt?: true;
    createdAt?: true;
};
export type KnowledgeArticleCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    title?: true;
    body?: true;
    tags?: true;
    embedding?: true;
    freshnessUpdatedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type KnowledgeArticleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KnowledgeArticleWhereInput;
    orderBy?: Prisma.KnowledgeArticleOrderByWithRelationInput | Prisma.KnowledgeArticleOrderByWithRelationInput[];
    cursor?: Prisma.KnowledgeArticleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | KnowledgeArticleCountAggregateInputType;
    _min?: KnowledgeArticleMinAggregateInputType;
    _max?: KnowledgeArticleMaxAggregateInputType;
};
export type GetKnowledgeArticleAggregateType<T extends KnowledgeArticleAggregateArgs> = {
    [P in keyof T & keyof AggregateKnowledgeArticle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateKnowledgeArticle[P]> : Prisma.GetScalarType<T[P], AggregateKnowledgeArticle[P]>;
};
export type KnowledgeArticleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KnowledgeArticleWhereInput;
    orderBy?: Prisma.KnowledgeArticleOrderByWithAggregationInput | Prisma.KnowledgeArticleOrderByWithAggregationInput[];
    by: Prisma.KnowledgeArticleScalarFieldEnum[] | Prisma.KnowledgeArticleScalarFieldEnum;
    having?: Prisma.KnowledgeArticleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: KnowledgeArticleCountAggregateInputType | true;
    _min?: KnowledgeArticleMinAggregateInputType;
    _max?: KnowledgeArticleMaxAggregateInputType;
};
export type KnowledgeArticleGroupByOutputType = {
    id: string;
    organizationId: string;
    title: string;
    body: string;
    tags: string[];
    embedding: runtime.JsonValue | null;
    freshnessUpdatedAt: Date;
    createdAt: Date;
    _count: KnowledgeArticleCountAggregateOutputType | null;
    _min: KnowledgeArticleMinAggregateOutputType | null;
    _max: KnowledgeArticleMaxAggregateOutputType | null;
};
export type GetKnowledgeArticleGroupByPayload<T extends KnowledgeArticleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<KnowledgeArticleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof KnowledgeArticleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], KnowledgeArticleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], KnowledgeArticleGroupByOutputType[P]>;
}>>;
export type KnowledgeArticleWhereInput = {
    AND?: Prisma.KnowledgeArticleWhereInput | Prisma.KnowledgeArticleWhereInput[];
    OR?: Prisma.KnowledgeArticleWhereInput[];
    NOT?: Prisma.KnowledgeArticleWhereInput | Prisma.KnowledgeArticleWhereInput[];
    id?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    organizationId?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    title?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    body?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    tags?: Prisma.StringNullableListFilter<"KnowledgeArticle">;
    embedding?: Prisma.JsonNullableFilter<"KnowledgeArticle">;
    freshnessUpdatedAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
};
export type KnowledgeArticleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    freshnessUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
};
export type KnowledgeArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.KnowledgeArticleWhereInput | Prisma.KnowledgeArticleWhereInput[];
    OR?: Prisma.KnowledgeArticleWhereInput[];
    NOT?: Prisma.KnowledgeArticleWhereInput | Prisma.KnowledgeArticleWhereInput[];
    organizationId?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    title?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    body?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    tags?: Prisma.StringNullableListFilter<"KnowledgeArticle">;
    embedding?: Prisma.JsonNullableFilter<"KnowledgeArticle">;
    freshnessUpdatedAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
}, "id">;
export type KnowledgeArticleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    freshnessUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.KnowledgeArticleCountOrderByAggregateInput;
    _max?: Prisma.KnowledgeArticleMaxOrderByAggregateInput;
    _min?: Prisma.KnowledgeArticleMinOrderByAggregateInput;
};
export type KnowledgeArticleScalarWhereWithAggregatesInput = {
    AND?: Prisma.KnowledgeArticleScalarWhereWithAggregatesInput | Prisma.KnowledgeArticleScalarWhereWithAggregatesInput[];
    OR?: Prisma.KnowledgeArticleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.KnowledgeArticleScalarWhereWithAggregatesInput | Prisma.KnowledgeArticleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"KnowledgeArticle"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"KnowledgeArticle"> | string;
    title?: Prisma.StringWithAggregatesFilter<"KnowledgeArticle"> | string;
    body?: Prisma.StringWithAggregatesFilter<"KnowledgeArticle"> | string;
    tags?: Prisma.StringNullableListFilter<"KnowledgeArticle">;
    embedding?: Prisma.JsonNullableWithAggregatesFilter<"KnowledgeArticle">;
    freshnessUpdatedAt?: Prisma.DateTimeWithAggregatesFilter<"KnowledgeArticle"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"KnowledgeArticle"> | Date | string;
};
export type KnowledgeArticleCreateInput = {
    id?: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutKnowledgeArticlesInput;
};
export type KnowledgeArticleUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
};
export type KnowledgeArticleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutKnowledgeArticlesNestedInput;
};
export type KnowledgeArticleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleCreateManyInput = {
    id?: string;
    organizationId: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
};
export type KnowledgeArticleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleListRelationFilter = {
    every?: Prisma.KnowledgeArticleWhereInput;
    some?: Prisma.KnowledgeArticleWhereInput;
    none?: Prisma.KnowledgeArticleWhereInput;
};
export type KnowledgeArticleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type KnowledgeArticleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    tags?: Prisma.SortOrder;
    embedding?: Prisma.SortOrder;
    freshnessUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KnowledgeArticleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    freshnessUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KnowledgeArticleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    freshnessUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type KnowledgeArticleCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput> | Prisma.KnowledgeArticleCreateWithoutOrganizationInput[] | Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput | Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.KnowledgeArticleCreateManyOrganizationInputEnvelope;
    connect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
};
export type KnowledgeArticleUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput> | Prisma.KnowledgeArticleCreateWithoutOrganizationInput[] | Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput | Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.KnowledgeArticleCreateManyOrganizationInputEnvelope;
    connect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
};
export type KnowledgeArticleUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput> | Prisma.KnowledgeArticleCreateWithoutOrganizationInput[] | Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput | Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.KnowledgeArticleUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.KnowledgeArticleUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.KnowledgeArticleCreateManyOrganizationInputEnvelope;
    set?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    disconnect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    delete?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    connect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    update?: Prisma.KnowledgeArticleUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.KnowledgeArticleUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.KnowledgeArticleUpdateManyWithWhereWithoutOrganizationInput | Prisma.KnowledgeArticleUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.KnowledgeArticleScalarWhereInput | Prisma.KnowledgeArticleScalarWhereInput[];
};
export type KnowledgeArticleUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput> | Prisma.KnowledgeArticleCreateWithoutOrganizationInput[] | Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput | Prisma.KnowledgeArticleCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.KnowledgeArticleUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.KnowledgeArticleUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.KnowledgeArticleCreateManyOrganizationInputEnvelope;
    set?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    disconnect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    delete?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    connect?: Prisma.KnowledgeArticleWhereUniqueInput | Prisma.KnowledgeArticleWhereUniqueInput[];
    update?: Prisma.KnowledgeArticleUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.KnowledgeArticleUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.KnowledgeArticleUpdateManyWithWhereWithoutOrganizationInput | Prisma.KnowledgeArticleUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.KnowledgeArticleScalarWhereInput | Prisma.KnowledgeArticleScalarWhereInput[];
};
export type KnowledgeArticleCreatetagsInput = {
    set: string[];
};
export type KnowledgeArticleUpdatetagsInput = {
    set?: string[];
    push?: string | string[];
};
export type KnowledgeArticleCreateWithoutOrganizationInput = {
    id?: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
};
export type KnowledgeArticleUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
};
export type KnowledgeArticleCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.KnowledgeArticleWhereUniqueInput;
    create: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput>;
};
export type KnowledgeArticleCreateManyOrganizationInputEnvelope = {
    data: Prisma.KnowledgeArticleCreateManyOrganizationInput | Prisma.KnowledgeArticleCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type KnowledgeArticleUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.KnowledgeArticleWhereUniqueInput;
    update: Prisma.XOR<Prisma.KnowledgeArticleUpdateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.KnowledgeArticleCreateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedCreateWithoutOrganizationInput>;
};
export type KnowledgeArticleUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.KnowledgeArticleWhereUniqueInput;
    data: Prisma.XOR<Prisma.KnowledgeArticleUpdateWithoutOrganizationInput, Prisma.KnowledgeArticleUncheckedUpdateWithoutOrganizationInput>;
};
export type KnowledgeArticleUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.KnowledgeArticleScalarWhereInput;
    data: Prisma.XOR<Prisma.KnowledgeArticleUpdateManyMutationInput, Prisma.KnowledgeArticleUncheckedUpdateManyWithoutOrganizationInput>;
};
export type KnowledgeArticleScalarWhereInput = {
    AND?: Prisma.KnowledgeArticleScalarWhereInput | Prisma.KnowledgeArticleScalarWhereInput[];
    OR?: Prisma.KnowledgeArticleScalarWhereInput[];
    NOT?: Prisma.KnowledgeArticleScalarWhereInput | Prisma.KnowledgeArticleScalarWhereInput[];
    id?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    organizationId?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    title?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    body?: Prisma.StringFilter<"KnowledgeArticle"> | string;
    tags?: Prisma.StringNullableListFilter<"KnowledgeArticle">;
    embedding?: Prisma.JsonNullableFilter<"KnowledgeArticle">;
    freshnessUpdatedAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"KnowledgeArticle"> | Date | string;
};
export type KnowledgeArticleCreateManyOrganizationInput = {
    id?: string;
    title: string;
    body: string;
    tags?: Prisma.KnowledgeArticleCreatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Date | string;
    createdAt?: Date | string;
};
export type KnowledgeArticleUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    tags?: Prisma.KnowledgeArticleUpdatetagsInput | string[];
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    freshnessUpdatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type KnowledgeArticleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    title?: boolean;
    body?: boolean;
    tags?: boolean;
    embedding?: boolean;
    freshnessUpdatedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["knowledgeArticle"]>;
export type KnowledgeArticleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    title?: boolean;
    body?: boolean;
    tags?: boolean;
    embedding?: boolean;
    freshnessUpdatedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["knowledgeArticle"]>;
export type KnowledgeArticleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    title?: boolean;
    body?: boolean;
    tags?: boolean;
    embedding?: boolean;
    freshnessUpdatedAt?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["knowledgeArticle"]>;
export type KnowledgeArticleSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    title?: boolean;
    body?: boolean;
    tags?: boolean;
    embedding?: boolean;
    freshnessUpdatedAt?: boolean;
    createdAt?: boolean;
};
export type KnowledgeArticleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "title" | "body" | "tags" | "embedding" | "freshnessUpdatedAt" | "createdAt", ExtArgs["result"]["knowledgeArticle"]>;
export type KnowledgeArticleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type KnowledgeArticleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type KnowledgeArticleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type $KnowledgeArticlePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "KnowledgeArticle";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        title: string;
        body: string;
        tags: string[];
        embedding: runtime.JsonValue | null;
        freshnessUpdatedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["knowledgeArticle"]>;
    composites: {};
};
export type KnowledgeArticleGetPayload<S extends boolean | null | undefined | KnowledgeArticleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload, S>;
export type KnowledgeArticleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<KnowledgeArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: KnowledgeArticleCountAggregateInputType | true;
};
export interface KnowledgeArticleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeArticle'];
        meta: {
            name: 'KnowledgeArticle';
        };
    };
    findUnique<T extends KnowledgeArticleFindUniqueArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends KnowledgeArticleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends KnowledgeArticleFindFirstArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleFindFirstArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends KnowledgeArticleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends KnowledgeArticleFindManyArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends KnowledgeArticleCreateArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleCreateArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends KnowledgeArticleCreateManyArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends KnowledgeArticleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends KnowledgeArticleDeleteArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleDeleteArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends KnowledgeArticleUpdateArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleUpdateArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends KnowledgeArticleDeleteManyArgs>(args?: Prisma.SelectSubset<T, KnowledgeArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends KnowledgeArticleUpdateManyArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends KnowledgeArticleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends KnowledgeArticleUpsertArgs>(args: Prisma.SelectSubset<T, KnowledgeArticleUpsertArgs<ExtArgs>>): Prisma.Prisma__KnowledgeArticleClient<runtime.Types.Result.GetResult<Prisma.$KnowledgeArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends KnowledgeArticleCountArgs>(args?: Prisma.Subset<T, KnowledgeArticleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], KnowledgeArticleCountAggregateOutputType> : number>;
    aggregate<T extends KnowledgeArticleAggregateArgs>(args: Prisma.Subset<T, KnowledgeArticleAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeArticleAggregateType<T>>;
    groupBy<T extends KnowledgeArticleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: KnowledgeArticleGroupByArgs['orderBy'];
    } : {
        orderBy?: KnowledgeArticleGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, KnowledgeArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: KnowledgeArticleFieldRefs;
}
export interface Prisma__KnowledgeArticleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface KnowledgeArticleFieldRefs {
    readonly id: Prisma.FieldRef<"KnowledgeArticle", 'String'>;
    readonly organizationId: Prisma.FieldRef<"KnowledgeArticle", 'String'>;
    readonly title: Prisma.FieldRef<"KnowledgeArticle", 'String'>;
    readonly body: Prisma.FieldRef<"KnowledgeArticle", 'String'>;
    readonly tags: Prisma.FieldRef<"KnowledgeArticle", 'String[]'>;
    readonly embedding: Prisma.FieldRef<"KnowledgeArticle", 'Json'>;
    readonly freshnessUpdatedAt: Prisma.FieldRef<"KnowledgeArticle", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"KnowledgeArticle", 'DateTime'>;
}
export type KnowledgeArticleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    where: Prisma.KnowledgeArticleWhereUniqueInput;
};
export type KnowledgeArticleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    where: Prisma.KnowledgeArticleWhereUniqueInput;
};
export type KnowledgeArticleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type KnowledgeArticleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type KnowledgeArticleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type KnowledgeArticleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KnowledgeArticleCreateInput, Prisma.KnowledgeArticleUncheckedCreateInput>;
};
export type KnowledgeArticleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.KnowledgeArticleCreateManyInput | Prisma.KnowledgeArticleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type KnowledgeArticleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    data: Prisma.KnowledgeArticleCreateManyInput | Prisma.KnowledgeArticleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.KnowledgeArticleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type KnowledgeArticleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KnowledgeArticleUpdateInput, Prisma.KnowledgeArticleUncheckedUpdateInput>;
    where: Prisma.KnowledgeArticleWhereUniqueInput;
};
export type KnowledgeArticleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.KnowledgeArticleUpdateManyMutationInput, Prisma.KnowledgeArticleUncheckedUpdateManyInput>;
    where?: Prisma.KnowledgeArticleWhereInput;
    limit?: number;
};
export type KnowledgeArticleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.KnowledgeArticleUpdateManyMutationInput, Prisma.KnowledgeArticleUncheckedUpdateManyInput>;
    where?: Prisma.KnowledgeArticleWhereInput;
    limit?: number;
    include?: Prisma.KnowledgeArticleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type KnowledgeArticleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    where: Prisma.KnowledgeArticleWhereUniqueInput;
    create: Prisma.XOR<Prisma.KnowledgeArticleCreateInput, Prisma.KnowledgeArticleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.KnowledgeArticleUpdateInput, Prisma.KnowledgeArticleUncheckedUpdateInput>;
};
export type KnowledgeArticleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
    where: Prisma.KnowledgeArticleWhereUniqueInput;
};
export type KnowledgeArticleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.KnowledgeArticleWhereInput;
    limit?: number;
};
export type KnowledgeArticleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.KnowledgeArticleSelect<ExtArgs> | null;
    omit?: Prisma.KnowledgeArticleOmit<ExtArgs> | null;
    include?: Prisma.KnowledgeArticleInclude<ExtArgs> | null;
};
