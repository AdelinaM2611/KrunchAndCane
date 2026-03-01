"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = getDashboard;
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
//# sourceMappingURL=host.controller.js.map