export type HostRecord = {
    id: string;
    email: string;
    name?: string;
    createdAt: Date;
};
export declare const hostRepo: {
    findByEmail(email: string): Promise<HostRecord | null>;
    create(data: Omit<HostRecord, "id" | "createdAt">): Promise<HostRecord>;
};
//# sourceMappingURL=host.repo.d.ts.map