import { Router } from "express";
import { getMenuBySubdomain } from "../../controllers/public/menu";

const router: Router = Router();

router.get("/", getMenuBySubdomain);

export default router;
