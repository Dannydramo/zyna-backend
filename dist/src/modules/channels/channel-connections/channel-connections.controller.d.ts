import { ChannelConnectionsService } from './channel-connections.service';
import { ListConnectionsDto } from './dto/list-connections.dto';
import type { Channel } from '../../../generated/prisma/enums';
export declare class ChannelConnectionsController {
    private readonly connectionsService;
    constructor(connectionsService: ChannelConnectionsService);
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
    get(orgId: string, channel: string): Promise<{
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
    delete(orgId: string, channel: string): Promise<{
        data: {
            message: string;
        };
    }>;
    toggle(orgId: string, channel: string, active: string): Promise<{
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
}
