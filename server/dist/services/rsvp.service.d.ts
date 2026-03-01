import type { CreateRsvpInput } from "../schemas/rsvp.schemas";
export declare const rsvpService: {
    listByEventId(eventId: string): Promise<import("../repositories/rsvp.repo").RsvpRecord[] | null>;
    create(data: CreateRsvpInput): Promise<import("../repositories/rsvp.repo").RsvpRecord | null>;
};
//# sourceMappingURL=rsvp.service.d.ts.map