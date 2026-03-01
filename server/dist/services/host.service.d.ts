export declare const hostService: {
    getDashboard(hostId: string): Promise<{
        hostId: string;
        events: ({
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
        })[];
        rsvps: never[];
    }>;
    listHostEvents(hostId: string): Promise<({
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
    getEventRsvps(hostId: string, eventId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        eventId: string;
        email: string;
        phone: string | null;
        guests: number | null;
    }[] | null>;
};
//# sourceMappingURL=host.service.d.ts.map