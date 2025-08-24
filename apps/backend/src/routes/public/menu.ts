import { Router } from "express";
import { publicMenuController } from "../../controllers/public/menu.js";
import { subdomainMiddleware } from "../../middleware/subdomain.js";

const router: Router = Router();

// Public menu routes - no authentication required

// GET /api/public/menu - Get menu by subdomain
router.get("/", subdomainMiddleware, publicMenuController.getMenuBySubdomain);

export default router;
