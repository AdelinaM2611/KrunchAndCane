"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventIdParamSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
exports.createEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    location: zod_1.z.string().min(1),
    startAt: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.date()]),
    endAt: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.date()]),
    description: zod_1.z.string(),
    imageUrl: zod_1.z.string().url().optional().nullable(),
});
exports.updateEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    location: zod_1.z.string().min(1).optional(),
    startAt: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.date()]).optional(),
    endAt: zod_1.z.union([zod_1.z.string().datetime(), zod_1.z.date()]).optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url().optional().nullable(),
});
exports.eventIdParamSchema = zod_1.z.object({
    eventId: zod_1.z.string().min(1),
});
//# sourceMappingURL=events.schemas.js.map