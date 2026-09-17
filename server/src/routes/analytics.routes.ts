import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import { getAnalyticsController } from "../controllers/analytics.controller";

const router = Router();

router.get(
  "/",
  authenticate,
  getAnalyticsController
);

export default router;