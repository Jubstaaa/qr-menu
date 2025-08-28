import { Router } from "express";
import multer from "multer";
import { adminCategoryController } from "../../controllers/admin/category";
import { authMiddleware, checkCategoryOwnership } from "../../middleware/auth";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", adminCategoryController.getCategories);

router.post("/", upload.single("file"), adminCategoryController.createCategory);

router.put("/reorder", adminCategoryController.reorderCategories);

router.put(
  "/:id",
  upload.single("file"),
  checkCategoryOwnership,
  adminCategoryController.updateCategory
);

router.delete(
  "/:id",
  checkCategoryOwnership,
  adminCategoryController.deleteCategory
);

export default router;
