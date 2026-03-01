// Placeholder: use prisma or raw DB when ready (host/user entities)
export type HostRecord = {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
};

const store: HostRecord[] = [];

export const hostRepo = {
  async findByEmail(email: string): Promise<HostRecord | null> {
    return store.find((h) => h.email.toLowerCase() === email.toLowerCase()) ?? null;
  },

  async create(data: Omit<HostRecord, "id" | "createdAt">): Promise<HostRecord> {
    const record: HostRecord = {
      ...data,
      id: `host_${Date.now()}`,
      createdAt: new Date(),
    };
    store.push(record);
    return record;
  },
};
