import app from "./app";
import { config } from "./lib/config";
import { logger } from "./lib/logger";

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`, { port: config.port });
});
