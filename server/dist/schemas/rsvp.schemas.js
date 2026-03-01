"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRsvpSchema = void 0;
const zod_1 = require("zod");
exports.createRsvpSchema = zod_1.z.object({
    eventId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    guests: zod_1.z.number().int().min(0).optional(),
});
//# sourceMappingURL=rsvp.schemas.js.map