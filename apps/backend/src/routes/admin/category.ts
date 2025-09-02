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
import { validate } from "../../middleware/validate";
import { validationUtils } from "@qr-menu/shared-utils";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", validate(validationUtils.admin.category.getAll), getCategories);

router.post(
  "/",
  upload.single("file"),
  validate(validationUtils.admin.category.create),
  createCategory
);

router.put(
  "/reorder",
  validate({
    request: {
      data: validationUtils.admin.category.reorder.request.data,
      params: validationUtils.admin.category.reorder.request.params,
    },
    response: validationUtils.admin.category.reorder.response,
  }),
  reorderCategories
);

router.use(authMiddleware);

router.put(
  "/:id",
  upload.single("file"),
  checkCategoryOwnership,
  validate(validationUtils.admin.category.update),
  updateCategory
);

router.delete(
  "/:id",
  checkCategoryOwnership,
  validate(validationUtils.admin.category.remove),
  deleteCategory
);

export default router;
