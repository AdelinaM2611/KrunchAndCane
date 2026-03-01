"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsService = void 0;
const events_repo_1 = require("../repositories/events.repo");
exports.eventsService = {
    async listPublicEvents() {
        return events_repo_1.eventsRepo.listActiveEvents();
    },
    async list() {
        return events_repo_1.eventsRepo.listActiveEvents();
    },
    async getById(id) {
        return events_repo_1.eventsRepo.findById(id);
    },
    async create(data) {
        const startAt = data.startAt ? new Date(data.startAt) : new Date();
        const endAt = data.endAt ? new Date(data.endAt) : new Date(Date.now() + 60 * 60 * 1000);
        return events_repo_1.eventsRepo.create({
            name: data.name,
            location: data.location ?? "",
            startAt,
            endAt,
            description: data.description ?? "",
            imageUrl: data.imageUrl ?? null,
        });
    },
    async update(id, data) {
        const update = {};
        if (data.name != null)
            update.name = data.name;
        if (data.location != null)
            update.location = data.location;
        if (data.startAt != null)
            update.startAt = new Date(data.startAt);
        if (data.endAt != null)
            update.endAt = new Date(data.endAt);
        if (data.description != null)
            update.description = data.description;
        if (data.status != null)
            update.status = data.status;
        if (data.imageUrl !== undefined)
            update.imageUrl = data.imageUrl;
        return events_repo_1.eventsRepo.update(id, update);
    },
    async remove(id) {
        return events_repo_1.eventsRepo.delete(id);
    },
};
//# sourceMappingURL=events.service.js.map