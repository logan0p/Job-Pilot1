
import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import {
  getDashboardController,
} from "../controllers/dashboard.controller";

const router = Router();

// GET /dashboard
router.get(
  "/",
  authenticate,
  getDashboardController
);

export default router;

