import { Router } from "express";
import { publicCategoryController } from "../../controllers/public/category.js";

const router: Router = Router();

router.get("/:slug", publicCategoryController.getCategoryBySubdomainAndSlug);

export default router;
