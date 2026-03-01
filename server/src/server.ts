import app from "./app";
import { config } from "./lib/config";
import { logger } from "./lib/logger";

const DEFAULT_JWT_SECRET = "change-me-in-production";

function validateJwtSecret(): void {
  if (config.nodeEnv !== "production") return;
  if (!config.jwtSecret || config.jwtSecret === DEFAULT_JWT_SECRET) {
    throw new Error(
      "JWT_SECRET must be set to a secure value in production. Do not use the default."
    );
  }
}

function validateSendGridConfig(): void {
  const { apiKey, fromEmail } = config.sendgrid;
  const missing = [
    !apiKey && "SENDGRID_API_KEY",
    !fromEmail && "SENDGRID_FROM_EMAIL",
  ].filter(Boolean) as string[];

  if (missing.length === 0) return;

  const msg = `SendGrid config missing: ${missing.join(", ")}. RSVP confirmation emails will not be sent.`;
  if (config.nodeEnv === "production") {
    throw new Error(msg);
  }
  logger.warn(msg);
}

validateJwtSecret();
validateSendGridConfig();

app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`, { port: config.port });
});
