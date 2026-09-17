import { Response } from "express";

import { createJobSchema } from "../validators/job.validator";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../services/job.service";

import { AuthRequest } from "../middleware/auth.middleware";


// ======================================================
// CREATE JOB
// ======================================================

export const createJobController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const body = createJobSchema.parse(req.body);

    console.log("========== JOB CONTROLLER ==========");
    console.log("AUTH USER:", req.user);

    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
      return;
    }

    const job = await createJob(
      body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: job,
    });

  } catch (error: any) {
    console.error("CREATE JOB ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// GET ALL JOBS
// ======================================================

export const getJobsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const search =
      req.query.search as string | undefined;

    const status =
      req.query.status as string | undefined;

    const sort =
      req.query.sort as string | undefined;

    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;


    const result = await getJobs(
      req.user!.userId,
      search,
      status,
      page,
      limit,
      sort
    );


    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error: any) {

    console.error(
      "GET JOBS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================================
// GET SINGLE JOB
// ======================================================

export const getJobController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const job = await getJobById(
      req.params.id,
      req.user!.userId
    );


    if (!job) {

      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }


    res.status(200).json({
      success: true,
      data: job,
    });

  } catch (error: any) {

    console.error(
      "GET JOB ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// ======================================================
// UPDATE JOB
// ======================================================

export const updateJobController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const job = await updateJob(
      req.params.id,
      req.user!.userId,
      req.body
    );


    if (!job) {

      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }


    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });

  } catch (error: any) {

    console.error(
      "UPDATE JOB ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
// ======================================================
// DELETE JOB
// ======================================================

export const deleteJobController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const job = await deleteJob(
      req.params.id,
      req.user!.userId
    );


    if (!job) {

      res.status(404).json({
        success: false,
        message: "Job not found",
      });

      return;
    }


    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });

  } catch (error: any) {

    console.error(
      "DELETE JOB ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};