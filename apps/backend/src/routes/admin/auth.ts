import { Router } from "express";
import { adminAuthController } from "../../controllers/admin/auth.js";

const router: Router = Router();

// POST /api/admin/auth/login - Admin login (subdomain from request)
router.post("/login", adminAuthController.login);

// POST /api/admin/auth/logout - Admin logout
router.post("/logout", adminAuthController.logout);

// GET /api/admin/auth/check - Check admin auth status
router.get("/check", adminAuthController.checkAuth);

// GET /api/admin/auth/menus - Get user's menus for subdomain selection
router.get("/menus", adminAuthController.getUserMenus);

export { router as adminAuthRoutes };
