import express, { Router } from "express";
import { authController } from "../controllers/auth";

const router: Router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/check", authController.checkAuth);
router.get("/menus", authController.getUserMenus);

export default router;
