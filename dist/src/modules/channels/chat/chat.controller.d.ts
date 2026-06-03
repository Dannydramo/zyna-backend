import { ChannelConnectionsService } from '../channel-connections/channel-connections.service';
import { ConfigureChatDto } from './dto/configure-chat.dto';
export declare class ChatController {
    private readonly connectionsService;
    constructor(connectionsService: ChannelConnectionsService);
    configure(orgId: string, dto: ConfigureChatDto): Promise<{
        installSnippet: string;
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: import("../../../generated/prisma/enums").Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        };
    }>;
    getConfig(orgId: string): Promise<{
        installSnippet: string;
        data: {
            id: string;
            createdAt: Date;
            organizationId: string;
            status: import("../../../generated/prisma/enums").ChannelStatus;
            channel: import("../../../generated/prisma/enums").Channel;
            updatedAt: Date;
            config: import("@prisma/client/runtime/client").JsonValue;
            verifiedAt: Date | null;
        };
    }>;
    disconnect(orgId: string): Promise<{
        data: {
            message: string;
        };
    }>;
}
