import type { Prisma } from "@prisma/client";
export declare const eventsRepo: {
    listActiveEvents(): Promise<{
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByIdAndHostId(id: string, hostId: string): Promise<{
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    listByHostId(hostId: string): Promise<({
        _count: {
            rsvps: number;
        };
    } & {
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    create(data: Prisma.EventCreateInput): Promise<{
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: Prisma.EventUpdateInput): Promise<{
        id: string;
        hostId: string | null;
        name: string;
        location: string;
        startAt: Date;
        endAt: Date;
        description: string;
        status: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<boolean>;
};
//# sourceMappingURL=events.repo.d.ts.map