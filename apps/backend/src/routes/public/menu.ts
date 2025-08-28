import { Router } from "express";
import { publicMenuController } from "../../controllers/public/menu.js";

const router: Router = Router();

router.get("/", publicMenuController.getMenuBySubdomain);

export default router;
