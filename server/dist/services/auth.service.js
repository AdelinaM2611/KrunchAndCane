"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../lib/config");
const host_repo_1 = require("../repositories/host.repo");
exports.authService = {
    async login(input) {
        const host = await host_repo_1.hostRepo.findByEmail(input.email);
        // Placeholder: no real password check until DB/auth is wired
        if (!host)
            return null;
        const token = jsonwebtoken_1.default.sign({ sub: host.id }, config_1.config.jwtSecret, { expiresIn: "7d" });
        return { token, user: { id: host.id, email: host.email, name: host.name } };
    },
    async register(input) {
        const existing = await host_repo_1.hostRepo.findByEmail(input.email);
        if (existing)
            return null;
        const host = await host_repo_1.hostRepo.create({
            email: input.email,
            name: input.name,
        });
        const token = jsonwebtoken_1.default.sign({ sub: host.id }, config_1.config.jwtSecret, { expiresIn: "7d" });
        return { token, user: { id: host.id, email: host.email, name: host.name } };
    },
};
//# sourceMappingURL=auth.service.js.map