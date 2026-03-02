/**
 * Host auth: login (bcrypt compare + JWT), register (hash password, create host, JWT). JWT payload sub = host id.
 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../lib/config";
import { hostRepo } from "../repositories/host.repo";
import type { LoginInput, RegisterInput } from "../schemas/auth.schemas";

const SALT_ROUNDS = 10;

export const authService = {
  /** Validate email/password; return { token, user } or null. */
  async login(input: LoginInput) {
    const host = await hostRepo.findByEmail(input.email);
    if (!host) return null;
    const ok = await bcrypt.compare(input.password, host.passwordHash);
    if (!ok) return null;
    const token = jwt.sign(
      { sub: host.id },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    return { token, user: { id: host.id, email: host.email, name: host.name } };
  },

  /** Create host (bcrypt hash); return { token, user } or null if email already exists. */
  async register(input: RegisterInput) {
    const existing = await hostRepo.findByEmail(input.email);
    if (existing) return null;
    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
    const host = await hostRepo.create({
      email: input.email,
      passwordHash,
      name: input.name ?? null,
    });
    const token = jwt.sign(
      { sub: host.id },
      config.jwtSecret,
      { expiresIn: "7d" }
    );
    return { token, user: { id: host.id, email: host.email, name: host.name } };
  },
};
