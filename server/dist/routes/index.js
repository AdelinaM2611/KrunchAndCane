"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const events_routes_1 = require("./events.routes");
const auth_routes_1 = require("./auth.routes");
const host_routes_1 = require("./host.routes");
const router = (0, express_1.Router)();
router.get("/health", (_req, res) => {
    res.json({ ok: true });
});
router.use("/events", events_routes_1.eventsRoutes);
router.use("/auth", auth_routes_1.authRoutes);
router.use("/host", host_routes_1.hostRoutes);
exports.routes = router;
//# sourceMappingURL=index.js.map