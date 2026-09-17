import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware";


import {
  createJobController,
  getJobsController,
  getJobController,
  updateJobController,
  deleteJobController,
} from "../controllers/job.controller";
const router = Router();

router.post(
  "/",
  authenticate,
  createJobController
);

router.get(
  "/",
  authenticate,
  getJobsController
);

router.get(
    "/:id",
    authenticate,
    getJobController
);

router.put(
  "/:id",
  authenticate,
  updateJobController
);

router.delete(
  "/:id",
  authenticate,
  deleteJobController
);

export default router;