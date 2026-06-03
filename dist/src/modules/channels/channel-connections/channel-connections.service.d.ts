import { PrismaService } from '../../../prisma/prisma.service';
import type { Channel } from '../../../generated/prisma/enums';
import type { ListConnectionsDto } from './dto/list-connections.dto';
export declare class ChannelConnectionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: ListConnectionsDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    get(orgId: string, channel: Channel): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        };
    }>;
    getOrCreate(orgId: string, channel: Channel): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        };
    }>;
    update(orgId: string, channel: Channel, config: Record<string, unknown>, status?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        };
    }>;
    delete(orgId: string, channel: Channel): Promise<{
        data: {
            message: string;
        };
    }>;
}
