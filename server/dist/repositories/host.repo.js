"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostRepo = void 0;
const prisma_1 = require("../lib/prisma");
exports.hostRepo = {
    async findByEmail(email) {
        return prisma_1.prisma.hostUser.findUnique({
            where: { email: email.toLowerCase() },
        });
    },
    async findById(id) {
        return prisma_1.prisma.hostUser.findUnique({
            where: { id },
        });
    },
    async create(data) {
        return prisma_1.prisma.hostUser.create({
            data: {
                email: data.email.toLowerCase(),
                passwordHash: data.passwordHash,
                name: data.name ?? null,
            },
        });
    },
};
//# sourceMappingURL=host.repo.js.map