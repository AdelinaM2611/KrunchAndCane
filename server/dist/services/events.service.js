"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsService = void 0;
const events_repo_1 = require("../repositories/events.repo");
const rsvp_repo_1 = require("../repositories/rsvp.repo");
const mail_service_1 = require("../integrations/mail.service");
const logger_1 = require("../lib/logger");

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
    async listByHostId(hostId) {
        return events_repo_1.eventsRepo.listByHostId(hostId);
    },
    async create(data, hostId) {
        const startAt = data.startAt ? new Date(data.startAt) : new Date();
        const endAt = data.endAt ? new Date(data.endAt) : new Date(Date.now() + 60 * 60 * 1000);
        return events_repo_1.eventsRepo.create({
            host: { connect: { id: hostId } },
            name: data.name,
            location: data.location ?? "",
            startAt,
            endAt,
            description: data.description ?? "",
            imageUrl: data.imageUrl ?? null,
        });
    },
    async update(id, data, hostId) {
        const event = await events_repo_1.eventsRepo.findByIdAndHostId(id, hostId);
        if (!event)
            return null;
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
    async cancel(id, hostId) {
        const event = await events_repo_1.eventsRepo.findByIdAndHostId(id, hostId);
        if (!event)
            return null;
        await events_repo_1.eventsRepo.update(id, { status: "CANCELLED" });
        try {
            const rsvps = await rsvp_repo_1.rsvpRepo.findByEventId(id);
            const startAt = event.startAt instanceof Date ? event.startAt : new Date(event.startAt);
            const endAt = event.endAt instanceof Date ? event.endAt : new Date(event.endAt);
            for (const rsvp of rsvps) {
                try {
                    await mail_service_1.mailService.sendEventCancellation({
                        email: rsvp.email,
                        firstName: rsvp.name.trim().split(/\s+/)[0] ?? rsvp.name,
                        event: {
                            name: event.name,
                            location: event.location,
                            startAt,
                            endAt,
                        },
                    });
                }
                catch (e) {
                    logger_1.logger.error("SendGrid cancellation email failed", {
                        eventId: id,
                        email: rsvp.email,
                        err: e instanceof Error ? e.message : String(e),
                    });
                }
            }
        }
        catch (e) {
            logger_1.logger.error("Failed to send cancellation emails", {
                eventId: id,
                err: e instanceof Error ? e.message : String(e),
            });
        }
        return events_repo_1.eventsRepo.findById(id);
    },
    async remove(id) {
        return events_repo_1.eventsRepo.delete(id);
    },
};
//# sourceMappingURL=events.service.js.map