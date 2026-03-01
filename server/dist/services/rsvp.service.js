"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpService = void 0;
const rsvp_repo_1 = require("../repositories/rsvp.repo");
const events_repo_1 = require("../repositories/events.repo");
exports.rsvpService = {
    async listByEventId(eventId) {
        const event = await events_repo_1.eventsRepo.findById(eventId);
        if (!event)
            return null;
        return rsvp_repo_1.rsvpRepo.findByEventId(eventId);
    },
    async create(data) {
        const event = await events_repo_1.eventsRepo.findById(data.eventId);
        if (!event)
            return null;
        return rsvp_repo_1.rsvpRepo.create({
            eventId: data.eventId,
            name: data.name,
            email: data.email,
            guests: data.guests,
        });
    },
};
//# sourceMappingURL=rsvp.service.js.map