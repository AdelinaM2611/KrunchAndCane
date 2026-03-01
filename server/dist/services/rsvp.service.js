"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpService = void 0;
const rsvp_repo_1 = require("../repositories/rsvp.repo");
const events_repo_1 = require("../repositories/events.repo");
const mail_service_1 = require("../integrations/mail.service");
const logger_1 = require("../lib/logger");
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
            const rsvp = await rsvp_repo_1.rsvpRepo.create({
                eventId: data.eventId,
                name: data.name,
                email: data.email,
                phone: data.phone ?? null,
                guests: data.guests ?? null,
            });
            try {
                await mail_service_1.mailService.sendRsvpConfirmation({
                    email: data.email,
                    firstName: data.name.trim().split(/\s+/)[0] ?? data.name,
                    event: {
                        name: event.name,
                        location: event.location,
                        startAt: event.startAt,
                        endAt: event.endAt,
                    },
                });
                logger_1.logger.info("SendGrid: sent RSVP confirmation email", {
                    eventId: data.eventId,
                    email: data.email,
                });
            }
            catch (e) {
                logger_1.logger.error("SendGrid RSVP confirmation failed", {
                    eventId: data.eventId,
                    email: data.email,
                    err: e instanceof Error ? e.message : String(e),
                });
            }
            return rsvp;
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