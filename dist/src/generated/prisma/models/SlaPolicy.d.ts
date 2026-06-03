import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SlaPolicyModel = runtime.Types.Result.DefaultSelection<Prisma.$SlaPolicyPayload>;
export type AggregateSlaPolicy = {
    _count: SlaPolicyCountAggregateOutputType | null;
    _avg: SlaPolicyAvgAggregateOutputType | null;
    _sum: SlaPolicySumAggregateOutputType | null;
    _min: SlaPolicyMinAggregateOutputType | null;
    _max: SlaPolicyMaxAggregateOutputType | null;
};
export type SlaPolicyAvgAggregateOutputType = {
    firstResponseMinutes: number | null;
    resolutionMinutes: number | null;
};
export type SlaPolicySumAggregateOutputType = {
    firstResponseMinutes: number | null;
    resolutionMinutes: number | null;
};
export type SlaPolicyMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    name: string | null;
    firstResponseMinutes: number | null;
    resolutionMinutes: number | null;
    createdAt: Date | null;
};
export type SlaPolicyMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    name: string | null;
    firstResponseMinutes: number | null;
    resolutionMinutes: number | null;
    createdAt: Date | null;
};
export type SlaPolicyCountAggregateOutputType = {
    id: number;
    organizationId: number;
    name: number;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt: number;
    _all: number;
};
export type SlaPolicyAvgAggregateInputType = {
    firstResponseMinutes?: true;
    resolutionMinutes?: true;
};
export type SlaPolicySumAggregateInputType = {
    firstResponseMinutes?: true;
    resolutionMinutes?: true;
};
export type SlaPolicyMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    name?: true;
    firstResponseMinutes?: true;
    resolutionMinutes?: true;
    createdAt?: true;
};
export type SlaPolicyMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    name?: true;
    firstResponseMinutes?: true;
    resolutionMinutes?: true;
    createdAt?: true;
};
export type SlaPolicyCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    name?: true;
    firstResponseMinutes?: true;
    resolutionMinutes?: true;
    createdAt?: true;
    _all?: true;
};
export type SlaPolicyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlaPolicyWhereInput;
    orderBy?: Prisma.SlaPolicyOrderByWithRelationInput | Prisma.SlaPolicyOrderByWithRelationInput[];
    cursor?: Prisma.SlaPolicyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SlaPolicyCountAggregateInputType;
    _avg?: SlaPolicyAvgAggregateInputType;
    _sum?: SlaPolicySumAggregateInputType;
    _min?: SlaPolicyMinAggregateInputType;
    _max?: SlaPolicyMaxAggregateInputType;
};
export type GetSlaPolicyAggregateType<T extends SlaPolicyAggregateArgs> = {
    [P in keyof T & keyof AggregateSlaPolicy]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSlaPolicy[P]> : Prisma.GetScalarType<T[P], AggregateSlaPolicy[P]>;
};
export type SlaPolicyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlaPolicyWhereInput;
    orderBy?: Prisma.SlaPolicyOrderByWithAggregationInput | Prisma.SlaPolicyOrderByWithAggregationInput[];
    by: Prisma.SlaPolicyScalarFieldEnum[] | Prisma.SlaPolicyScalarFieldEnum;
    having?: Prisma.SlaPolicyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SlaPolicyCountAggregateInputType | true;
    _avg?: SlaPolicyAvgAggregateInputType;
    _sum?: SlaPolicySumAggregateInputType;
    _min?: SlaPolicyMinAggregateInputType;
    _max?: SlaPolicyMaxAggregateInputType;
};
export type SlaPolicyGroupByOutputType = {
    id: string;
    organizationId: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt: Date;
    _count: SlaPolicyCountAggregateOutputType | null;
    _avg: SlaPolicyAvgAggregateOutputType | null;
    _sum: SlaPolicySumAggregateOutputType | null;
    _min: SlaPolicyMinAggregateOutputType | null;
    _max: SlaPolicyMaxAggregateOutputType | null;
};
export type GetSlaPolicyGroupByPayload<T extends SlaPolicyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SlaPolicyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SlaPolicyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SlaPolicyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SlaPolicyGroupByOutputType[P]>;
}>>;
export type SlaPolicyWhereInput = {
    AND?: Prisma.SlaPolicyWhereInput | Prisma.SlaPolicyWhereInput[];
    OR?: Prisma.SlaPolicyWhereInput[];
    NOT?: Prisma.SlaPolicyWhereInput | Prisma.SlaPolicyWhereInput[];
    id?: Prisma.StringFilter<"SlaPolicy"> | string;
    organizationId?: Prisma.StringFilter<"SlaPolicy"> | string;
    name?: Prisma.StringFilter<"SlaPolicy"> | string;
    firstResponseMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    resolutionMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    createdAt?: Prisma.DateTimeFilter<"SlaPolicy"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
};
export type SlaPolicyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
};
export type SlaPolicyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SlaPolicyWhereInput | Prisma.SlaPolicyWhereInput[];
    OR?: Prisma.SlaPolicyWhereInput[];
    NOT?: Prisma.SlaPolicyWhereInput | Prisma.SlaPolicyWhereInput[];
    organizationId?: Prisma.StringFilter<"SlaPolicy"> | string;
    name?: Prisma.StringFilter<"SlaPolicy"> | string;
    firstResponseMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    resolutionMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    createdAt?: Prisma.DateTimeFilter<"SlaPolicy"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
}, "id">;
export type SlaPolicyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SlaPolicyCountOrderByAggregateInput;
    _avg?: Prisma.SlaPolicyAvgOrderByAggregateInput;
    _max?: Prisma.SlaPolicyMaxOrderByAggregateInput;
    _min?: Prisma.SlaPolicyMinOrderByAggregateInput;
    _sum?: Prisma.SlaPolicySumOrderByAggregateInput;
};
export type SlaPolicyScalarWhereWithAggregatesInput = {
    AND?: Prisma.SlaPolicyScalarWhereWithAggregatesInput | Prisma.SlaPolicyScalarWhereWithAggregatesInput[];
    OR?: Prisma.SlaPolicyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SlaPolicyScalarWhereWithAggregatesInput | Prisma.SlaPolicyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SlaPolicy"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"SlaPolicy"> | string;
    name?: Prisma.StringWithAggregatesFilter<"SlaPolicy"> | string;
    firstResponseMinutes?: Prisma.IntWithAggregatesFilter<"SlaPolicy"> | number;
    resolutionMinutes?: Prisma.IntWithAggregatesFilter<"SlaPolicy"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SlaPolicy"> | Date | string;
};
export type SlaPolicyCreateInput = {
    id?: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutSlaPoliciesInput;
};
export type SlaPolicyUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
};
export type SlaPolicyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutSlaPoliciesNestedInput;
};
export type SlaPolicyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicyCreateManyInput = {
    id?: string;
    organizationId: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
};
export type SlaPolicyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicyListRelationFilter = {
    every?: Prisma.SlaPolicyWhereInput;
    some?: Prisma.SlaPolicyWhereInput;
    none?: Prisma.SlaPolicyWhereInput;
};
export type SlaPolicyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SlaPolicyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SlaPolicyAvgOrderByAggregateInput = {
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
};
export type SlaPolicyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SlaPolicyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SlaPolicySumOrderByAggregateInput = {
    firstResponseMinutes?: Prisma.SortOrder;
    resolutionMinutes?: Prisma.SortOrder;
};
export type SlaPolicyCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput> | Prisma.SlaPolicyCreateWithoutOrganizationInput[] | Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput | Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.SlaPolicyCreateManyOrganizationInputEnvelope;
    connect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
};
export type SlaPolicyUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput> | Prisma.SlaPolicyCreateWithoutOrganizationInput[] | Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput | Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.SlaPolicyCreateManyOrganizationInputEnvelope;
    connect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
};
export type SlaPolicyUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput> | Prisma.SlaPolicyCreateWithoutOrganizationInput[] | Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput | Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.SlaPolicyUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.SlaPolicyUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.SlaPolicyCreateManyOrganizationInputEnvelope;
    set?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    disconnect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    delete?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    connect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    update?: Prisma.SlaPolicyUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.SlaPolicyUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.SlaPolicyUpdateManyWithWhereWithoutOrganizationInput | Prisma.SlaPolicyUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.SlaPolicyScalarWhereInput | Prisma.SlaPolicyScalarWhereInput[];
};
export type SlaPolicyUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput> | Prisma.SlaPolicyCreateWithoutOrganizationInput[] | Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput | Prisma.SlaPolicyCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.SlaPolicyUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.SlaPolicyUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.SlaPolicyCreateManyOrganizationInputEnvelope;
    set?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    disconnect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    delete?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    connect?: Prisma.SlaPolicyWhereUniqueInput | Prisma.SlaPolicyWhereUniqueInput[];
    update?: Prisma.SlaPolicyUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.SlaPolicyUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.SlaPolicyUpdateManyWithWhereWithoutOrganizationInput | Prisma.SlaPolicyUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.SlaPolicyScalarWhereInput | Prisma.SlaPolicyScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SlaPolicyCreateWithoutOrganizationInput = {
    id?: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
};
export type SlaPolicyUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
};
export type SlaPolicyCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.SlaPolicyWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput>;
};
export type SlaPolicyCreateManyOrganizationInputEnvelope = {
    data: Prisma.SlaPolicyCreateManyOrganizationInput | Prisma.SlaPolicyCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type SlaPolicyUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.SlaPolicyWhereUniqueInput;
    update: Prisma.XOR<Prisma.SlaPolicyUpdateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.SlaPolicyCreateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedCreateWithoutOrganizationInput>;
};
export type SlaPolicyUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.SlaPolicyWhereUniqueInput;
    data: Prisma.XOR<Prisma.SlaPolicyUpdateWithoutOrganizationInput, Prisma.SlaPolicyUncheckedUpdateWithoutOrganizationInput>;
};
export type SlaPolicyUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.SlaPolicyScalarWhereInput;
    data: Prisma.XOR<Prisma.SlaPolicyUpdateManyMutationInput, Prisma.SlaPolicyUncheckedUpdateManyWithoutOrganizationInput>;
};
export type SlaPolicyScalarWhereInput = {
    AND?: Prisma.SlaPolicyScalarWhereInput | Prisma.SlaPolicyScalarWhereInput[];
    OR?: Prisma.SlaPolicyScalarWhereInput[];
    NOT?: Prisma.SlaPolicyScalarWhereInput | Prisma.SlaPolicyScalarWhereInput[];
    id?: Prisma.StringFilter<"SlaPolicy"> | string;
    organizationId?: Prisma.StringFilter<"SlaPolicy"> | string;
    name?: Prisma.StringFilter<"SlaPolicy"> | string;
    firstResponseMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    resolutionMinutes?: Prisma.IntFilter<"SlaPolicy"> | number;
    createdAt?: Prisma.DateTimeFilter<"SlaPolicy"> | Date | string;
};
export type SlaPolicyCreateManyOrganizationInput = {
    id?: string;
    name: string;
    firstResponseMinutes: number;
    resolutionMinutes: number;
    createdAt?: Date | string;
};
export type SlaPolicyUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicyUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicyUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    firstResponseMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    resolutionMinutes?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlaPolicySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    name?: boolean;
    firstResponseMinutes?: boolean;
    resolutionMinutes?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slaPolicy"]>;
export type SlaPolicySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    name?: boolean;
    firstResponseMinutes?: boolean;
    resolutionMinutes?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slaPolicy"]>;
export type SlaPolicySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    name?: boolean;
    firstResponseMinutes?: boolean;
    resolutionMinutes?: boolean;
    createdAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slaPolicy"]>;
export type SlaPolicySelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    name?: boolean;
    firstResponseMinutes?: boolean;
    resolutionMinutes?: boolean;
    createdAt?: boolean;
};
export type SlaPolicyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "name" | "firstResponseMinutes" | "resolutionMinutes" | "createdAt", ExtArgs["result"]["slaPolicy"]>;
export type SlaPolicyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type SlaPolicyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type SlaPolicyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
};
export type $SlaPolicyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SlaPolicy";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        name: string;
        firstResponseMinutes: number;
        resolutionMinutes: number;
        createdAt: Date;
    }, ExtArgs["result"]["slaPolicy"]>;
    composites: {};
};
export type SlaPolicyGetPayload<S extends boolean | null | undefined | SlaPolicyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload, S>;
export type SlaPolicyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SlaPolicyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SlaPolicyCountAggregateInputType | true;
};
export interface SlaPolicyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SlaPolicy'];
        meta: {
            name: 'SlaPolicy';
        };
    };
    findUnique<T extends SlaPolicyFindUniqueArgs>(args: Prisma.SelectSubset<T, SlaPolicyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SlaPolicyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SlaPolicyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SlaPolicyFindFirstArgs>(args?: Prisma.SelectSubset<T, SlaPolicyFindFirstArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SlaPolicyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SlaPolicyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SlaPolicyFindManyArgs>(args?: Prisma.SelectSubset<T, SlaPolicyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SlaPolicyCreateArgs>(args: Prisma.SelectSubset<T, SlaPolicyCreateArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SlaPolicyCreateManyArgs>(args?: Prisma.SelectSubset<T, SlaPolicyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SlaPolicyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SlaPolicyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SlaPolicyDeleteArgs>(args: Prisma.SelectSubset<T, SlaPolicyDeleteArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SlaPolicyUpdateArgs>(args: Prisma.SelectSubset<T, SlaPolicyUpdateArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SlaPolicyDeleteManyArgs>(args?: Prisma.SelectSubset<T, SlaPolicyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SlaPolicyUpdateManyArgs>(args: Prisma.SelectSubset<T, SlaPolicyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SlaPolicyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SlaPolicyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SlaPolicyUpsertArgs>(args: Prisma.SelectSubset<T, SlaPolicyUpsertArgs<ExtArgs>>): Prisma.Prisma__SlaPolicyClient<runtime.Types.Result.GetResult<Prisma.$SlaPolicyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SlaPolicyCountArgs>(args?: Prisma.Subset<T, SlaPolicyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SlaPolicyCountAggregateOutputType> : number>;
    aggregate<T extends SlaPolicyAggregateArgs>(args: Prisma.Subset<T, SlaPolicyAggregateArgs>): Prisma.PrismaPromise<GetSlaPolicyAggregateType<T>>;
    groupBy<T extends SlaPolicyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SlaPolicyGroupByArgs['orderBy'];
    } : {
        orderBy?: SlaPolicyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SlaPolicyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlaPolicyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SlaPolicyFieldRefs;
}
export interface Prisma__SlaPolicyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SlaPolicyFieldRefs {
    readonly id: Prisma.FieldRef<"SlaPolicy", 'String'>;
    readonly organizationId: Prisma.FieldRef<"SlaPolicy", 'String'>;
    readonly name: Prisma.FieldRef<"SlaPolicy", 'String'>;
    readonly firstResponseMinutes: Prisma.FieldRef<"SlaPolicy", 'Int'>;
    readonly resolutionMinutes: Prisma.FieldRef<"SlaPolicy", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"SlaPolicy", 'DateTime'>;
}
export type SlaPolicyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    where: Prisma.SlaPolicyWhereUniqueInput;
};
export type SlaPolicyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    where: Prisma.SlaPolicyWhereUniqueInput;
};
export type SlaPolicyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SlaPolicyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SlaPolicyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SlaPolicyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlaPolicyCreateInput, Prisma.SlaPolicyUncheckedCreateInput>;
};
export type SlaPolicyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SlaPolicyCreateManyInput | Prisma.SlaPolicyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SlaPolicyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    data: Prisma.SlaPolicyCreateManyInput | Prisma.SlaPolicyCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SlaPolicyIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SlaPolicyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlaPolicyUpdateInput, Prisma.SlaPolicyUncheckedUpdateInput>;
    where: Prisma.SlaPolicyWhereUniqueInput;
};
export type SlaPolicyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SlaPolicyUpdateManyMutationInput, Prisma.SlaPolicyUncheckedUpdateManyInput>;
    where?: Prisma.SlaPolicyWhereInput;
    limit?: number;
};
export type SlaPolicyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlaPolicyUpdateManyMutationInput, Prisma.SlaPolicyUncheckedUpdateManyInput>;
    where?: Prisma.SlaPolicyWhereInput;
    limit?: number;
    include?: Prisma.SlaPolicyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SlaPolicyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    where: Prisma.SlaPolicyWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlaPolicyCreateInput, Prisma.SlaPolicyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SlaPolicyUpdateInput, Prisma.SlaPolicyUncheckedUpdateInput>;
};
export type SlaPolicyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
    where: Prisma.SlaPolicyWhereUniqueInput;
};
export type SlaPolicyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlaPolicyWhereInput;
    limit?: number;
};
export type SlaPolicyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlaPolicySelect<ExtArgs> | null;
    omit?: Prisma.SlaPolicyOmit<ExtArgs> | null;
    include?: Prisma.SlaPolicyInclude<ExtArgs> | null;
};
