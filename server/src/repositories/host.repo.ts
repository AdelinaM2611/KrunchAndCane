import { prisma } from "../lib/prisma";

export const hostRepo = {
  async findByEmail(email: string) {
    return prisma.hostUser.findUnique({
      where: { email: email.toLowerCase() },
    });
  },

  async findById(id: string) {
    return prisma.hostUser.findUnique({
      where: { id },
    });
  },

  async create(data: { email: string; passwordHash: string; name?: string | null }) {
    return prisma.hostUser.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        name: data.name ?? null,
      },
    });
  },
};
