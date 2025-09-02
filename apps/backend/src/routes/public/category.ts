import { Router } from "express";
import { getCategoryBySubdomainAndSlug } from "../../controllers/public/category";

const router: Router = Router();

router.get("/:slug", getCategoryBySubdomainAndSlug);

export default router;
