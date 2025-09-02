import express, { Router } from "express";
import {
  login,
  register,
  logout,
  checkAuth,
  getUserMenus,
} from "../../controllers/common/auth";

const router: Router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check", checkAuth);
router.get("/menus", getUserMenus);

export default router;
