// Placeholder: use prisma or raw DB when ready
export type RsvpRecord = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  guests?: number;
  createdAt: Date;
};

const store: RsvpRecord[] = [];

export const rsvpRepo = {
  async findByEventId(eventId: string): Promise<RsvpRecord[]> {
    return store.filter((r) => r.eventId === eventId);
  },

  async create(data: Omit<RsvpRecord, "id" | "createdAt">): Promise<RsvpRecord> {
    const record: RsvpRecord = {
      ...data,
      id: `rsvp_${Date.now()}`,
      createdAt: new Date(),
    };
    store.push(record);
    return record;
  },
};
