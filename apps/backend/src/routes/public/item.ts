import { Router } from "express";
import {
  getActiveItemsBySubdomain,
  getItemBySubdomainAndId,
} from "../../controllers/public/item";

const router: Router = Router();

router.get("/", getActiveItemsBySubdomain);

router.get("/:itemId", getItemBySubdomainAndId);

export default router;
