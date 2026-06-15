export declare const rsvpRepo: {
    findByEventId(eventId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        eventId: string;
        email: string;
        phone: string | null;
        guests: number | null;
    }[]>;
    create(data: {
        eventId: string;
        name: string;
        email: string;
        phone?: string | null;
        guests?: number | null;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        eventId: string;
        email: string;
        phone: string | null;
        guests: number | null;
    }>;
};
//# sourceMappingURL=rsvp.repo.d.ts.map