import express, { Router } from "express";
import {
  login,
  register,
  logout,
  checkAuth,
  getUserMenus,
} from "../../controllers/common/auth";
import { validate } from "../../middleware/validation";
import { validationUtils } from "@qr-menu/shared-utils";

const router: Router = express.Router();

router.post("/login", validate(validationUtils.common.auth.login), login);
router.post(
  "/register",
  validate(validationUtils.common.auth.register),
  register
);
router.post("/logout", validate(validationUtils.common.auth.logout), logout);
router.get(
  "/check",
  validate(validationUtils.common.auth.checkAuth),
  checkAuth
);

export default router;
