import type { Prisma } from "@prisma/client";
export declare const eventsRepo: {
    listActiveEvents(): Promise<{
        id: string;
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
    create(data: Prisma.EventCreateInput): Promise<{
        id: string;
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