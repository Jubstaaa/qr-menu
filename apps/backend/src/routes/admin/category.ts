import { Router } from "express";
import { adminCategoryController } from "../../controllers/admin/category";
import { authMiddleware, checkCategoryOwnership } from "../../middleware/auth";

const router: Router = Router();

// Admin category routes - require authentication
router.use(authMiddleware);

// GET /api/admin/categories
router.get("/", adminCategoryController.getCategories);

// POST /api/admin/categories
router.post("/", adminCategoryController.createCategory);

// PUT /api/admin/categories/reorder
router.put("/reorder", adminCategoryController.reorderCategories);

// PUT /api/admin/categories/:id
router.put("/:id", checkCategoryOwnership, adminCategoryController.updateCategory);

// DELETE /api/admin/categories/:id
router.delete("/:id", checkCategoryOwnership, adminCategoryController.deleteCategory);

export default router;
