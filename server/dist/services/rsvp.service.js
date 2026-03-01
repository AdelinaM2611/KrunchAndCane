"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpService = void 0;
const rsvp_repo_1 = require("../repositories/rsvp.repo");
const events_repo_1 = require("../repositories/events.repo");
const DUPLICATE_RSVP_CODE = "P2002";
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
        if (event.status !== "ACTIVE")
            return null;
        try {
            return await rsvp_repo_1.rsvpRepo.create({
                eventId: data.eventId,
                name: data.name,
                email: data.email,
                phone: data.phone ?? null,
                guests: data.guests ?? null,
            });
        }
        catch (e) {
            const prismaError = e;
            if (prismaError?.code === DUPLICATE_RSVP_CODE) {
                const err = new Error("An RSVP with this email already exists for this event.");
                err.code = "DUPLICATE_RSVP";
                err.statusCode = 409;
                throw err;
            }
            throw e;
        }
    },
};
//# sourceMappingURL=rsvp.service.js.map