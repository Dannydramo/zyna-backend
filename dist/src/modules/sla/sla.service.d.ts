import { SlaState, TicketStatus } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
export declare class SlaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recomputeAll(): Promise<void>;
    recomputeTicket(orgId: string, ticketId: string): Promise<{
        id: string;
        createdAt: Date;
        organizationId: string;
        status: TicketStatus;
        customerId: string;
        channel: import("../../generated/prisma/enums").Channel;
        conversationId: string;
        subject: string;
        priority: import("../../generated/prisma/enums").TicketPriority;
        assigneeId: string | null;
        tags: string[];
        aiStatus: import("../../generated/prisma/enums").AiStatus;
        intent: string | null;
        slaState: SlaState;
        firstResponseDueAt: Date | null;
        resolutionDueAt: Date | null;
        firstResponseAt: Date | null;
        solvedAt: Date | null;
        deletedAt: Date | null;
        updatedAt: Date;
    } | null>;
    getDefaultPolicy(orgId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        organizationId: string;
        firstResponseMinutes: number;
        resolutionMinutes: number;
    }>;
    private computeState;
}
