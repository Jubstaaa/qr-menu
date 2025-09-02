import { Router } from "express";
import categoryRoutes from "./category";
import itemRoutes from "./item";
import menuRoutes from "./menu";

const router: Router = Router();

router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/menus", menuRoutes);

export default router;
