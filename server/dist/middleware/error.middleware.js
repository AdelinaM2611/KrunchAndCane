"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const logger_1 = require("../lib/logger");
function errorHandler(err, _req, res, _next) {
    const code = err.code ?? "INTERNAL_ERROR";
    const message = err.message ?? "An unexpected error occurred";
    const statusCode = err.statusCode ?? 500;
    logger_1.logger.error(message, { code, statusCode });
    res.status(statusCode).json({
        error: { code, message },
    });
}
//# sourceMappingURL=error.middleware.js.map