import { eventsRepo } from "../repositories/events.repo";
import type { CreateEventInput, UpdateEventInput } from "../schemas/events.schemas";

export const eventsService = {
  async listPublicEvents() {
    return eventsRepo.listActiveEvents();
  },

  async list() {
    return eventsRepo.listActiveEvents();
  },

  async getById(id: string) {
    return eventsRepo.findById(id);
  },

  async create(data: CreateEventInput) {
    const startAt = data.startAt ? new Date(data.startAt) : new Date();
    const endAt = data.endAt ? new Date(data.endAt) : new Date(Date.now() + 60 * 60 * 1000);
    return eventsRepo.create({
      name: data.name,
      location: data.location ?? "",
      startAt,
      endAt,
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? null,
    });
  },

  async update(id: string, data: UpdateEventInput) {
    const update: Parameters<typeof eventsRepo.update>[1] = {};
    if (data.name != null) update.name = data.name;
    if (data.location != null) update.location = data.location;
    if (data.startAt != null) update.startAt = new Date(data.startAt);
    if (data.endAt != null) update.endAt = new Date(data.endAt);
    if (data.description != null) update.description = data.description;
    if (data.status != null) update.status = data.status;
    if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl;
    return eventsRepo.update(id, update);
  },

  async remove(id: string) {
    return eventsRepo.delete(id);
  },
};
