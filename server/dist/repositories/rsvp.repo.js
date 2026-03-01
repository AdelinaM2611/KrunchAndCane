"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rsvpRepo = void 0;
const prisma_1 = require("../lib/prisma");
exports.rsvpRepo = {
    async findByEventId(eventId) {
        return prisma_1.prisma.rsvp.findMany({
            where: { eventId },
            orderBy: { createdAt: "desc" },
        });
    },
    async create(data) {
        return prisma_1.prisma.rsvp.create({
            data: {
                event: { connect: { id: data.eventId } },
                name: data.name,
                email: data.email,
                phone: data.phone ?? undefined,
                guests: data.guests ?? undefined,
            },
        });
    },
};
//# sourceMappingURL=rsvp.repo.js.map