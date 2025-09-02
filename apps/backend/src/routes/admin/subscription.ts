import { Router } from "express";
import { getSubscription } from "../../controllers/admin/subscription";
import { authMiddleware } from "../../middleware/auth";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", getSubscription);

export default router;
