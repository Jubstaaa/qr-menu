import { Router } from "express";
import { publicItemController } from "../../controllers/public/item.js";

const router: Router = Router();

router.get("/", publicItemController.getActiveItemsBySubdomain);

router.get("/:itemId", publicItemController.getItemBySubdomainAndId);

export default router;
