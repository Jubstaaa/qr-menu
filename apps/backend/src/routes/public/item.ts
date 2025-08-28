import { Router } from "express";
import { publicItemController } from "../../controllers/public/item.js";

const router: Router = Router();

router.get("/", publicItemController.getActiveItemsBySubdomain);

router.get("/:itemId", publicItemController.getItemBySubdomainAndId);

router.get("/popular", publicItemController.getPopularItemsBySubdomain);

export default router;
