"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./lib/config");
const logger_1 = require("./lib/logger");
app_1.default.listen(config_1.config.port, () => {
    logger_1.logger.info(`Server listening on port ${config_1.config.port}`, { port: config_1.config.port });
});
//# sourceMappingURL=server.js.map