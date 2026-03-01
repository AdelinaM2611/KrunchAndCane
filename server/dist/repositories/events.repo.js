"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsRepo = void 0;
const prisma_1 = require("../lib/prisma");
exports.eventsRepo = {
    async listActiveEvents() {
        return prisma_1.prisma.event.findMany({
            where: { status: "ACTIVE" },
            orderBy: { startAt: "asc" },
        });
    },
    async findById(id) {
        return prisma_1.prisma.event.findUnique({ where: { id } });
    },
    async findByIdAndHostId(id, hostId) {
        return prisma_1.prisma.event.findFirst({
            where: { id, hostId },
        });
    },
    async listByHostId(hostId) {
        return prisma_1.prisma.event.findMany({
            where: { hostId },
            orderBy: { startAt: "asc" },
            include: { _count: { select: { rsvps: true } } },
        });
    },
    async create(data) {
        return prisma_1.prisma.event.create({ data });
    },
    async update(id, data) {
        return prisma_1.prisma.event.update({ where: { id }, data });
    },
    async delete(id) {
        try {
            await prisma_1.prisma.event.delete({ where: { id } });
            return true;
        }
        catch {
            return false;
        }
    },
};
//# sourceMappingURL=events.repo.js.map