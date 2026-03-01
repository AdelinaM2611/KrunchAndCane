import type { CreateEventInput, UpdateEventInput } from "../schemas/events.schemas";
export declare const eventsService: {
    listPublicEvents(): Promise<{
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
    list(): Promise<{
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
    getById(id: string): Promise<{
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
    create(data: CreateEventInput, hostId: string): Promise<{
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
    update(id: string, data: UpdateEventInput, hostId: string): Promise<{
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
    cancel(id: string, hostId: string): Promise<{
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
    remove(id: string): Promise<boolean>;
};
//# sourceMappingURL=events.service.d.ts.map