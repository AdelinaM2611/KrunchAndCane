"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostService = void 0;
const events_repo_1 = require("../repositories/events.repo");
const rsvp_repo_1 = require("../repositories/rsvp.repo");
exports.hostService = {
    async getDashboard(hostId) {
        const events = await events_repo_1.eventsRepo.listByHostId(hostId);
        return { hostId, events, rsvps: [] };
    },
    async listHostEvents(hostId) {
        return events_repo_1.eventsRepo.listByHostId(hostId);
    },
    async getEventRsvps(hostId, eventId) {
        const event = await events_repo_1.eventsRepo.findByIdAndHostId(eventId, hostId);
        if (!event)
            return null;
        return rsvp_repo_1.rsvpRepo.findByEventId(eventId);
    },
};
//# sourceMappingURL=host.service.js.map