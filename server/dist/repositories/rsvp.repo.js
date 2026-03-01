"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpRepo = void 0;
const store = [];
exports.rsvpRepo = {
    async findByEventId(eventId) {
        return store.filter((r) => r.eventId === eventId);
    },
    async create(data) {
        const record = {
            ...data,
            id: `rsvp_${Date.now()}`,
            createdAt: new Date(),
        };
        store.push(record);
        return record;
    },
};
//# sourceMappingURL=rsvp.repo.js.map