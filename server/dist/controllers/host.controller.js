"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
exports.listHostEvents = listHostEvents;
exports.getEventRsvps = getEventRsvps;
const host_service_1 = require("../services/host.service");
async function getDashboard(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const dashboard = await host_service_1.hostService.getDashboard(hostId);
        res.json(dashboard);
    }
    catch (e) {
        next(e);
    }
}
async function listHostEvents(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const events = await host_service_1.hostService.listHostEvents(hostId);
        res.json(events);
    }
    catch (e) {
        next(e);
    }
}
async function getEventRsvps(req, res, next) {
    try {
        const hostId = req.user?.sub;
        if (!hostId) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
            return;
        }
        const { eventId } = req.params;
        const rsvps = await host_service_1.hostService.getEventRsvps(hostId, eventId);
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
//# sourceMappingURL=host.controller.js.map