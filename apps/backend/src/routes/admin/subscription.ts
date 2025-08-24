import { Router } from "express";
import { adminSubscriptionController } from "../../controllers/admin/subscription.js";
import { authMiddleware } from "../../middleware/auth.js";

const router: Router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// GET /api/admin/subscription - Get user subscription
router.get("/", adminSubscriptionController.getUserSubscription);

export { router as adminSubscriptionRoutes };
