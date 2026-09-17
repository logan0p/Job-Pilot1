import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

import {
  uploadResume,
  deleteResume,
} from "../controllers/resume.controller";

const router = Router();

// Upload / Replace Resume
router.post(
  "/:jobId",
  authenticate,
  upload.single("resume"),
  uploadResume
);

// Delete Resume
router.delete(
  "/:jobId",
  authenticate,
  deleteResume
);

export default router;