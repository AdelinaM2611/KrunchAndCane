/**
 * Event database access: list active, find by id, by id+host (ownership), list by host, create/update/delete.
 */
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

  async findByIdAndHostId(id: string, hostId: string) {
    return prisma.event.findFirst({
      where: { id, hostId },
    });
  },

  async listByHostId(hostId: string) {
    return prisma.event.findMany({
      where: { hostId },
      orderBy: { startAt: "asc" },
      include: { _count: { select: { rsvps: true } } },
    });
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
