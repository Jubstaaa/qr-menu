import { Router } from "express";
import { publicAuthController } from "../../controllers/public/auth.js";

const router: Router = Router();

// Public auth routes - no authentication required

// POST /api/public/auth/login - Public login
router.post("/login", publicAuthController.login);

// POST /api/public/auth/register - Public register
router.post("/register", publicAuthController.register);

// POST /api/public/auth/logout - Public logout
router.post("/logout", publicAuthController.logout);

// GET /api/public/auth/check - Public auth check
router.get("/check", publicAuthController.checkAuth);

export default router;
