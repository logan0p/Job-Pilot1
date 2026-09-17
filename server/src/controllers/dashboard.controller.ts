
import { Response } from "express";

import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

// ======================================================
// GET DASHBOARD DATA
// ======================================================

export const getDashboardController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // ====================================================
    // TOTAL JOBS
    // ====================================================

    const totalJobs = await prisma.job.count({
      where: {
        userId,
      },
    });

    // ====================================================
    // STATUS COUNTS
    // ====================================================

    const Applied = await prisma.job.count({
      where: {
        userId,
        status: "Applied",
      },
    });

    const Interview = await prisma.job.count({
      where: {
        userId,
        status: "Interview",
      },
    });

    const Offer = await prisma.job.count({
      where: {
        userId,
        status: "Offer",
      },
    });

    const Rejected = await prisma.job.count({
      where: {
        userId,
        status: "Rejected",
      },
    });

    // ====================================================
    // RECENT JOBS
    // ====================================================

    const recentJobs = await prisma.job.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        company: true,
        position: true,
        location: true,
        status: true,
        createdAt: true,
      },
    });

    // ====================================================
    // ALL JOBS FOR MONTHLY DATA
    // ====================================================

    const jobs = await prisma.job.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // ====================================================
    // MONTHLY APPLICATIONS
    // ====================================================

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Only show applications from the current year.
    const currentYear = new Date().getFullYear();

    const monthlyApplications = monthNames.map(
      (month, index) => {
        const applications = jobs.filter((job) => {
          const date = new Date(job.createdAt);

          return (
            date.getFullYear() === currentYear &&
            date.getMonth() === index
          );
        }).length;

        return {
          month,
          applications,
        };
      }
    );

    // ====================================================
    // FINAL RESPONSE
    // ====================================================

    res.status(200).json({
      success: true,
      data: {
        totalJobs,
        Applied,
        Interview,
        Offer,
        Rejected,
        recentJobs,
        monthlyApplications,
      },
    });
  } catch (error: any) {
    console.error("Dashboard error:", error);

    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load dashboard.",
    });
  }
};

