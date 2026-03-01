"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostRepo = void 0;
const store = [];
exports.hostRepo = {
    async findByEmail(email) {
        return store.find((h) => h.email.toLowerCase() === email.toLowerCase()) ?? null;
    },
    async create(data) {
        const record = {
            ...data,
            id: `host_${Date.now()}`,
            createdAt: new Date(),
        };
        store.push(record);
        return record;
    },
};
//# sourceMappingURL=host.repo.js.map