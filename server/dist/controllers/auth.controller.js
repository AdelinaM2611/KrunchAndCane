"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.register = register;
const auth_service_1 = require("../services/auth.service");
async function login(req, res, next) {
    try {
        const result = await auth_service_1.authService.login(req.body);
        if (!result) {
            res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid email or password" } });
            return;
        }
        res.json(result);
    }
    catch (e) {
        next(e);
    }
}
async function register(req, res, next) {
    try {
        const result = await auth_service_1.authService.register(req.body);
        if (!result) {
            res.status(409).json({ error: { code: "CONFLICT", message: "Email already registered" } });
            return;
        }
        res.status(201).json(result);
    }
    catch (e) {
        next(e);
    }
}
//# sourceMappingURL=auth.controller.js.map