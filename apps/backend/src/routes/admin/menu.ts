import { Router } from "express";
import {
  createMenu,
  getCurrentUserMenu,
  updateMenu,
} from "../../controllers/admin/menu";
import { authMiddleware } from "../../middleware/auth";
import multer from "multer";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.post("/", createMenu);

router.get("/", getCurrentUserMenu);

router.put("/:id", updateMenu);

export default router;
