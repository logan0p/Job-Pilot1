import { Request, Response } from "express";
import Job from "../models/job.model";

export const getDashboardData = async (
  req: Request,
  res: Response
) => {
  try {

    const totalJobs = await Job.countDocuments();

    const Applied = await Job.countDocuments({
      status: "Applied",
    });

    const Interview = await Job.countDocuments({
      status: "Interview",
    });

    const Offer = await Job.countDocuments({
      status: "Offer",
    });

    const Rejected = await Job.countDocuments({
      status: "Rejected",
    });

    const recentJobs = await Job.find()
      .sort({
        createdAt: -1,
      })
      .limit(5);

    res.status(200).json({
      data: {
        totalJobs,
        Applied,
        Interview,
        Offer,
        Rejected,
      },
      recentJobs,
    });

  } catch (error) {

    res.status(500).json({
      message: "Dashboard Error",
    });

  }
};