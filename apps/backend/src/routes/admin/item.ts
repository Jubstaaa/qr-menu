import { Router } from "express";
import { adminItemController } from "../../controllers/admin/item";
import { authMiddleware, checkItemOwnership } from "../../middleware/auth";

const router: Router = Router();

// Admin item routes - require authentication
router.use(authMiddleware);

// GET /api/admin/items
router.get("/", adminItemController.getItemsByMenu);

// POST /api/admin/items
router.post("/", adminItemController.createItem);

// PUT /api/admin/items/reorder
router.put("/reorder", adminItemController.reorderItemsInCategory);

// PUT /api/admin/items/:id
router.put("/:id", checkItemOwnership, adminItemController.updateItem);

// DELETE /api/admin/items/:id
router.delete("/:id", checkItemOwnership, adminItemController.deleteItem);

export default router;
