import { Router } from "express";
import { menuController } from "../../controllers/admin/menu";
import { authMiddleware } from "../../middleware/auth";

const router: Router = Router();

// Admin menu routes - require authentication
router.use(authMiddleware);

// POST /api/admin/menu - Create new menu
router.post("/", menuController.createMenu);

// GET /api/admin/menu
router.get("/", menuController.getMenusByUser);

// PUT /api/admin/menu
router.put("/", menuController.updateMenu);

export default router;
