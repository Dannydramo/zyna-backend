import { ChannelConnectionsService } from '../channel-connections/channel-connections.service';
import { ConnectWhatsAppDto } from './dto/connect-whatsapp.dto';
export declare class WhatsAppController {
    private readonly connectionsService;
    constructor(connectionsService: ChannelConnectionsService);
    connect(orgId: string, dto: ConnectWhatsAppDto): Promise<{
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
    getConnection(orgId: string): Promise<{
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
