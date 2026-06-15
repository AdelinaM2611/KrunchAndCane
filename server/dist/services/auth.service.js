"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../lib/config");
const host_repo_1 = require("../repositories/host.repo");
const SALT_ROUNDS = 10;
exports.authService = {
    async login(input) {
        const host = await host_repo_1.hostRepo.findByEmail(input.email);
        if (!host)
            return null;
        const ok = await bcrypt_1.default.compare(input.password, host.passwordHash);
        if (!ok)
            return null;
        const token = jsonwebtoken_1.default.sign({ sub: host.id }, config_1.config.jwtSecret, { expiresIn: "7d" });
        return { token, user: { id: host.id, email: host.email, name: host.name } };
    },
    async register(input) {
        const existing = await host_repo_1.hostRepo.findByEmail(input.email);
        if (existing)
            return null;
        const passwordHash = await bcrypt_1.default.hash(input.password, SALT_ROUNDS);
        const host = await host_repo_1.hostRepo.create({
            email: input.email,
            passwordHash,
            name: input.name ?? null,
        });
        const token = jsonwebtoken_1.default.sign({ sub: host.id }, config_1.config.jwtSecret, { expiresIn: "7d" });
        return { token, user: { id: host.id, email: host.email, name: host.name } };
    },
};
//# sourceMappingURL=auth.service.js.map