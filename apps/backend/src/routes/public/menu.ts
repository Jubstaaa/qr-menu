import { Router } from "express";
import { publicMenuController } from "../../controllers/public/menu.js";

const router: Router = Router();

// GET /api/public/menu?subdomain=xxx - Get menu by subdomain
router.get("/", publicMenuController.getMenuBySubdomain);

export default router;
