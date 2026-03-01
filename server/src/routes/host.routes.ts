import { Router } from "express";
import * as hostController from "../controllers/host.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", authMiddleware, hostController.getDashboard);

export const hostRoutes = router;
