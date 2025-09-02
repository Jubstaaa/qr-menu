import { Router } from "express";
import multer from "multer";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from "../../controllers/admin/category";
import { authMiddleware, checkCategoryOwnership } from "../../middleware/auth";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", getCategories);

router.post("/", upload.single("file"), createCategory);

router.put("/reorder", reorderCategories);

router.put(
  "/:id",
  upload.single("file"),
  checkCategoryOwnership,
  updateCategory
);

router.delete("/:id", checkCategoryOwnership, deleteCategory);

export default router;
