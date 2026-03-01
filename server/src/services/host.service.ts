import { hostRepo } from "../repositories/host.repo";

export const hostService = {
  async getDashboard(hostId: string) {
    // Placeholder: aggregate events / RSVPs for host when DB is wired
    return { hostId, events: [], rsvps: [] };
  },
};
