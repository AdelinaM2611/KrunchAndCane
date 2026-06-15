"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.cancelEvent = cancelEvent;
const events_service_1 = require("../services/events.service");
async function getEvents(_req, res, next) {
    try {
        const events = await events_service_1.eventsService.listPublicEvents();
        res.json(events);
    }
    catch (e) {
        next(e);
    }
}
async function getEventById(req, res, next) {
    try {
        const { eventId } = req.params;
        const event = await events_service_1.eventsService.getById(eventId);
        if (!event) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.json(event);
    }
    catch (e) {
        next(e);
    }
}
async function createEvent(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const event = await events_service_1.eventsService.create(req.body, hostId);
        res.status(201).json(event);
    }
    catch (e) {
        next(e);
    }
}
async function updateEvent(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const { eventId } = req.params;
        const event = await events_service_1.eventsService.update(eventId, req.body, hostId);
        if (!event) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.json(event);
    }
    catch (e) {
        next(e);
    }
}
async function deleteEvent(req, res, next) {
    try {
        const { eventId } = req.params;
        const deleted = await events_service_1.eventsService.remove(eventId);
        if (!deleted) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.status(204).send();
    }
    catch (e) {
        next(e);
    }
}
async function cancelEvent(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const { eventId } = req.params;
        const event = await events_service_1.eventsService.cancel(eventId, hostId);
        if (!event) {
            res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
            return;
        }
        res.json(event);
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=events.controller.js.map