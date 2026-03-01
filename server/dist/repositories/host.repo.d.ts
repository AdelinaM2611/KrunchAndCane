export declare const hostRepo: {
    findByEmail(email: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
    } | null>;
    findById(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
    } | null>;
    create(data: {
        email: string;
        passwordHash: string;
        name?: string | null;
    }): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        passwordHash: string;
    }>;
};
//# sourceMappingURL=host.repo.d.ts.map