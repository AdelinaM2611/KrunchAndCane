import express from "express";
import cors from "cors";
import { config } from "./lib/config";
import { routes } from "./routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

export default app;
