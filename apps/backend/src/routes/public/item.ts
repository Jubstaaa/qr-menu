import { Router } from "express";
import { publicItemController } from "../../controllers/public/item.js";

const router: Router = Router();

// Public item routes - no authentication required

// GET /api/public/items - Get active items by subdomain
router.get("/", publicItemController.getActiveItemsBySubdomain);

// GET /api/public/items/:itemId - Get item by subdomain and ID
router.get("/:itemId", publicItemController.getItemBySubdomainAndId);

// GET /api/public/items/popular - Get popular items by subdomain
router.get("/popular", publicItemController.getPopularItemsBySubdomain);

export default router;
