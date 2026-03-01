"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRsvpBodySchema = exports.createRsvpSchema = void 0;
const zod_1 = require("zod");
exports.createRsvpSchema = zod_1.z.object({
    eventId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().optional(),
    guests: zod_1.z.number().int().min(0).optional(),
});
/** Body schema when eventId comes from URL (POST /api/events/:eventId/rsvps) */
exports.createRsvpBodySchema = exports.createRsvpSchema.omit({ eventId: true });
//# sourceMappingURL=rsvp.schemas.js.map