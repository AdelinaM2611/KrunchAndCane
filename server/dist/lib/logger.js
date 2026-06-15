"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
exports.logger = {
    info: (msg, meta) => {
        console.log(JSON.stringify({ level: "info", msg, ...meta }));
    },
    warn: (msg, meta) => {
        console.warn(JSON.stringify({ level: "warn", msg, ...meta }));
    },
    error: (msg, meta) => {
        console.error(JSON.stringify({ level: "error", msg, ...meta }));
    },
};
//# sourceMappingURL=logger.js.map