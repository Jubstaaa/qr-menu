import { Router } from "express";
import multer from "multer";
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../controllers/admin/item";
import { authMiddleware, checkItemOwnership } from "../../middleware/auth";

const router: Router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

router.get("/", getItems);

router.post("/", upload.single("file"), createItem);

router.put("/:id", upload.single("file"), checkItemOwnership, updateItem);

router.delete("/:id", checkItemOwnership, deleteItem);

export default router;
