import type { CreateRsvpInput } from "../schemas/rsvp.schemas";
export declare const rsvpService: {
    listByEventId(eventId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        phone: string | null;
        guests: number | null;
        eventId: string;
    }[] | null>;
    create(data: CreateRsvpInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        phone: string | null;
        guests: number | null;
        eventId: string;
    } | null>;
};
//# sourceMappingURL=rsvp.service.d.ts.map