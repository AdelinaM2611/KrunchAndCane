import jwt from "jsonwebtoken";
import { config } from "../lib/config";
import { hostRepo } from "../repositories/host.repo";
import type { LoginInput, RegisterInput } from "../schemas/auth.schemas";

export const authService = {
  async login(input: LoginInput) {
    const host = await hostRepo.findByEmail(input.email);
    // Placeholder: no real password check until DB/auth is wired
    if (!host) return null;
    const token = jwt.sign(
      { sub: host.id },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    return { token, user: { id: host.id, email: host.email, name: host.name } };
  },

  async register(input: RegisterInput) {
    const existing = await hostRepo.findByEmail(input.email);
    if (existing) return null;
    const host = await hostRepo.create({
      email: input.email,
      name: input.name,
    });
    const token = jwt.sign(
      { sub: host.id },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    return { token, user: { id: host.id, email: host.email, name: host.name } };
  },
};
