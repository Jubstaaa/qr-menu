import { Router } from "express";
import multer from "multer";
import { adminItemController } from "../../controllers/admin/item";
import { authMiddleware, checkItemOwnership } from "../../middleware/auth";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", adminItemController.getItemsByMenu);

router.post("/", upload.single("file"), adminItemController.createItem);

router.put("/reorder", adminItemController.reorderItemsInCategory);

router.put(
  "/:id",
  upload.single("file"),
  checkItemOwnership,
  adminItemController.updateItem
);

router.delete("/:id", checkItemOwnership, adminItemController.deleteItem);

export default router;
