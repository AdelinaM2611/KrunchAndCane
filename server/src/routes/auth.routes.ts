import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateBody } from "../middleware/validate.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/login", validateBody(loginSchema), authController.login);
router.post("/register", validateBody(registerSchema), authController.register);

export const authRoutes = router;
