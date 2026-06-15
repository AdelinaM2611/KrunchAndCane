"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRsvps = listRsvps;
exports.createRsvp = createRsvp;
const rsvp_service_1 = require("../services/rsvp.service");

async function listRsvps(req, res, next) {
    try {
        const { eventId } = req.params;
        const rsvps = await rsvp_service_1.rsvpService.listByEventId(eventId);
        if (rsvps === null) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.json(rsvps);
    }
    catch (e) {
        next(e);
    }
}
async function createRsvp(req, res, next) {
    try {
        const eventId = req.params.eventId ?? req.body.eventId;
        const body = eventId ? { ...req.body, eventId } : req.body;
        const rsvp = await rsvp_service_1.rsvpService.create(body);
        if (!rsvp) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.status(201).json(rsvp);
    }
    catch (e) {
        const err = e;
        if (err?.code === "DUPLICATE_RSVP") {
            res.status(409).json({
                error: { code: "CONFLICT", message: err.message ?? "An RSVP with this email already exists for this event." },
            });
            return;
        }
        next(e);
    }
}
//# sourceMappingURL=rsvp.controller.js.map