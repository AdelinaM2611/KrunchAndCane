export declare const rsvpRepo: {
    findByEventId(eventId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        phone: string | null;
        guests: number | null;
        eventId: string;
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
        email: string;
        phone: string | null;
        guests: number | null;
        eventId: string;
    }>;
};
//# sourceMappingURL=rsvp.repo.d.ts.map