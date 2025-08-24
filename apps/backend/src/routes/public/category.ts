import { Router } from "express";
import { publicCategoryController } from "../../controllers/public/category.js";

const router: Router = Router();

// Public category routes - no authentication required

// GET /api/public/categories/:slug - Get category with items by subdomain and slug
router.get("/:slug", publicCategoryController.getCategoryBySubdomainAndSlug);

export default router;
