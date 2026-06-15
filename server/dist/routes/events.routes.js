"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRoutes = void 0;
const express_1 = require("express");
const eventsController = __importStar(require("../controllers/events.controller"));
const rsvpController = __importStar(require("../controllers/rsvp.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const events_schemas_1 = require("../schemas/events.schemas");
const rsvp_schemas_1 = require("../schemas/rsvp.schemas");
const router = (0, express_1.Router)();
// Public
router.get("/", eventsController.getEvents);
router.get("/:eventId", eventsController.getEventById);
router.post("/:eventId/rsvps", (0, validate_middleware_1.validateBody)(rsvp_schemas_1.createRsvpBodySchema), rsvpController.createRsvp);
router.get("/:eventId/rsvps", rsvpController.listRsvps);
// Protected (host)
router.post("/", auth_middleware_1.authMiddleware, (0, validate_middleware_1.validateBody)(events_schemas_1.createEventSchema), eventsController.createEvent);
router.put("/:eventId", auth_middleware_1.authMiddleware, (0, validate_middleware_1.validateBody)(events_schemas_1.updateEventSchema), eventsController.updateEvent);
router.post("/:eventId/cancel", auth_middleware_1.authMiddleware, eventsController.cancelEvent);
// Legacy (unchanged; still public)
router.post("/rsvps", (0, validate_middleware_1.validateBody)(rsvp_schemas_1.createRsvpSchema), rsvpController.createRsvp);
router.patch("/:eventId", auth_middleware_1.authMiddleware, (0, validate_middleware_1.validateBody)(events_schemas_1.updateEventSchema), eventsController.updateEvent);
router.delete("/:eventId", eventsController.deleteEvent);
exports.eventsRoutes = router;
//# sourceMappingURL=events.routes.js.map