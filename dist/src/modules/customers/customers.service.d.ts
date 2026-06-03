import { PrismaService } from '../../prisma/prisma.service';
import type { PaginatedResponse } from '../../common/dto/pagination.dto';
import type { ListCustomersDto } from './dto/list-customers.dto';
import type { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(orgId: string, query: ListCustomersDto): Promise<PaginatedResponse<unknown>>;
    findOne(orgId: string, id: string): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            phone: string | null;
            avatarUrl: string | null;
            attributes: import("@prisma/client/runtime/client").JsonValue;
            notes: string | null;
            conversations: ({
                messages: {
                    id: string;
                    createdAt: Date;
                    organizationId: string;
                    conversationId: string;
                    direction: import("../../generated/prisma/enums").MessageDirection;
                    body: string;
                    authorType: import("../../generated/prisma/enums").MessageAuthorType;
                    authorId: string | null;
                    externalMessageId: string | null;
                    providerMessageId: string | null;
                    deliveryStatus: import("../../generated/prisma/enums").DeliveryStatus;
                    headers: import("@prisma/client/runtime/client").JsonValue;
                }[];
            } & {
                id: string;
                createdAt: Date;
                organizationId: string;
                customerId: string;
                channel: import("../../generated/prisma/enums").Channel;
                externalThreadId: string | null;
            })[];
            tickets: ({
                assignee: {
                    id: string;
                    name: string;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                organizationId: string;
                status: import("../../generated/prisma/enums").TicketStatus;
                customerId: string;
                channel: import("../../generated/prisma/enums").Channel;
                conversationId: string;
                subject: string;
                priority: import("../../generated/prisma/enums").TicketPriority;
                assigneeId: string | null;
                tags: string[];
                aiStatus: import("../../generated/prisma/enums").AiStatus;
                intent: string | null;
                slaState: import("../../generated/prisma/enums").SlaState;
                firstResponseDueAt: Date | null;
                resolutionDueAt: Date | null;
                firstResponseAt: Date | null;
                solvedAt: Date | null;
                deletedAt: Date | null;
                updatedAt: Date;
            })[];
        };
    }>;
    update(orgId: string, id: string, dto: UpdateCustomerDto): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            phone: string | null;
            avatarUrl: string | null;
            attributes: import("@prisma/client/runtime/client").JsonValue;
            notes: string | null;
        };
    }>;
}
