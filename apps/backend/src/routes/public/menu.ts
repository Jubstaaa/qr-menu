import { Router } from "express";
import { publicMenuController } from "../../controllers/public/menu.js";

const router: Router = Router();

// Public menu routes - no authentication required

// GET /api/public/menu - Get menu by subdomain
router.get("/", publicMenuController.getMenuBySubdomain);

export default router;
