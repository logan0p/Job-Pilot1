import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";

import {
  getProfileController,
  updateProfileController,
  changePasswordController,
} from "../controllers/user.controller";

const router = Router();


// ======================================================
// PROFILE
// ======================================================

router.get(
  "/profile",
  authenticate,
  getProfileController
);


// ======================================================
// UPDATE PROFILE
// ======================================================

router.put(
  "/profile",
  authenticate,
  updateProfileController
);


// ======================================================
// CHANGE PASSWORD
// ======================================================

router.put(
  "/change-password",
  authenticate,
  changePasswordController
);

export default router;