import type { CreateEventInput, UpdateEventInput } from "../schemas/events.schemas";
export declare const eventsService: {
    listPublicEvents(): Promise<{
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
    list(): Promise<{
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
    getById(id: string): Promise<{
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
    create(data: CreateEventInput): Promise<{
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
    update(id: string, data: UpdateEventInput): Promise<{
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
    remove(id: string): Promise<boolean>;
};
//# sourceMappingURL=events.service.d.ts.map