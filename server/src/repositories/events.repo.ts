import { prisma } from "../lib/prisma";
import type { Prisma } from "@prisma/client";

export const eventsRepo = {
  async listActiveEvents() {
    return prisma.event.findMany({
      where: { status: "ACTIVE" },
      orderBy: { startAt: "asc" },
    });
  },

  async findById(id: string) {
    return prisma.event.findUnique({ where: { id } });
  },

  async create(data: Prisma.EventCreateInput) {
    return prisma.event.create({ data });
  },

  async update(id: string, data: Prisma.EventUpdateInput) {
    return prisma.event.update({ where: { id }, data });
  },

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.event.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  },
};
