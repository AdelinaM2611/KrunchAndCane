/**
 * Server config from env: port, NODE_ENV, CORS_ORIGIN, JWT_SECRET, SendGrid keys. Loads .env via dotenv.
 */
import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT ?? "4000", 10),
  nodeEnv: process.env.NODE_ENV ?? "development",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY ?? "",
    fromEmail: process.env.SENDGRID_FROM_EMAIL ?? "",
    fromName: process.env.SENDGRID_FROM_NAME ?? "Krunch & Cane",
  },
} as const;
