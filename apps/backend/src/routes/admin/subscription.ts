import { Router } from "express";
import { adminSubscriptionController } from "../../controllers/admin/subscription.js";
import { authMiddleware } from "../../middleware/auth.js";

const router: Router = Router();

router.use(authMiddleware);

router.get("/", adminSubscriptionController.getUserSubscription);

export { router as adminSubscriptionRoutes };
