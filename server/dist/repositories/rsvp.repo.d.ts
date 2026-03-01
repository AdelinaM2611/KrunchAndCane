export type RsvpRecord = {
    id: string;
    eventId: string;
    name: string;
    email: string;
    guests?: number;
    createdAt: Date;
};
export declare const rsvpRepo: {
    findByEventId(eventId: string): Promise<RsvpRecord[]>;
    create(data: Omit<RsvpRecord, "id" | "createdAt">): Promise<RsvpRecord>;
};
//# sourceMappingURL=rsvp.repo.d.ts.map