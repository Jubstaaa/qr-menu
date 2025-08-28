import { Router } from "express";
import { menuController } from "../../controllers/admin/menu";
import { authMiddleware } from "../../middleware/auth";
import multer from "multer";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.post("/", menuController.createMenu);

router.get("/", menuController.getMenusByUser);

router.put("/", upload.single("file"), menuController.updateMenu);

export default router;
