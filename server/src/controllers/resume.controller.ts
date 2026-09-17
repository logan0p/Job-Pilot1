import fs from "fs";
import path from "path";

import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// ======================================================
// UPLOAD / REPLACE RESUME
// ======================================================

export const uploadResume = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const jobId = req.params.jobId;

    // --------------------------------------------------
    // CHECK FILE
    // --------------------------------------------------

    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });

      return;
    }

    // --------------------------------------------------
    // CHECK JOB OWNERSHIP
    // --------------------------------------------------

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    if (!job) {
      // Delete newly uploaded file
      const uploadedPath = path.join(
        __dirname,
        "../../uploads/resumes",
        req.file.filename
      );

      if (fs.existsSync(uploadedPath)) {
        fs.unlinkSync(uploadedPath);
      }

      res.status(404).json({
        success: false,
        message: "Job not found.",
      });

      return;
    }

    // --------------------------------------------------
    // DELETE OLD RESUME
    // --------------------------------------------------

    if (job.resume) {
      const oldResumePath = path.join(
        __dirname,
        "../../uploads/resumes",
        path.basename(job.resume)
      );

      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath);
      }
    }

    // --------------------------------------------------
    // CREATE NEW DATABASE PATH
    // --------------------------------------------------

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    // --------------------------------------------------
    // SAVE NEW RESUME
    // --------------------------------------------------

    await prisma.job.update({
      where: {
        id: jobId,
      },

      data: {
        resume: resumePath,
      },
    });

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: resumePath,
    });
  } catch (error: any) {
    console.error(
      "Resume upload error:",
      error
    );

    // --------------------------------------------------
    // CLEANUP UPLOADED FILE IF ERROR OCCURS
    // --------------------------------------------------

    if (req.file) {
      const uploadedPath = path.join(
        __dirname,
        "../../uploads/resumes",
        req.file.filename
      );

      if (fs.existsSync(uploadedPath)) {
        fs.unlinkSync(uploadedPath);
      }
    }

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to upload resume.",
    });
  }
};

// ======================================================
// DELETE RESUME
// ======================================================

export const deleteResume = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const jobId = req.params.jobId;

    // --------------------------------------------------
    // FIND JOB
    // --------------------------------------------------

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        userId,
      },
    });

    // --------------------------------------------------
    // JOB NOT FOUND
    // --------------------------------------------------

    if (!job) {
      res.status(404).json({
        success: false,
        message: "Job not found.",
      });

      return;
    }

    // --------------------------------------------------
    // NO RESUME
    // --------------------------------------------------

    if (!job.resume) {
      res.status(404).json({
        success: false,
        message: "No resume found for this job.",
      });

      return;
    }

    // --------------------------------------------------
    // GET PHYSICAL FILE PATH
    // --------------------------------------------------

    const resumePath = path.join(
      __dirname,
      "../../uploads/resumes",
      path.basename(job.resume)
    );

    // --------------------------------------------------
    // DELETE PHYSICAL FILE
    // --------------------------------------------------

    if (fs.existsSync(resumePath)) {
      fs.unlinkSync(resumePath);
    }

    // --------------------------------------------------
    // REMOVE RESUME FROM DATABASE
    // --------------------------------------------------

    await prisma.job.update({
      where: {
        id: jobId,
      },

      data: {
        resume: null,
      },
    });

    // --------------------------------------------------
    // RESPONSE
    // --------------------------------------------------

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error: any) {
    console.error(
      "Resume delete error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to delete resume.",
    });
  }
};

