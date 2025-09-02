import { Router } from "express";
import adminRoutes from "./admin";
import commonRoutes from "./common";
import publicRoutes from "./public";

const router: Router = Router();

router.use("/admin", adminRoutes);
router.use("/common", commonRoutes);
router.use("/public", publicRoutes);

export default router;
