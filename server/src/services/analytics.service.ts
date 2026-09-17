
import prisma from "../config/prisma";

// ======================================================
// GET ANALYTICS DATA
// ======================================================

export const getAnalyticsData = async (
  userId: string
) => {
  // ====================================================
  // OVERVIEW COUNTS
  // ====================================================

  const totalJobs = await prisma.job.count({
    where: {
      userId,
    },
  });

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
  // GET ALL USER JOBS
  // ====================================================

  const jobs = await prisma.job.findMany({
    where: {
      userId,
    },

    select: {
      company: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  // ====================================================
  // TOP COMPANIES
  // ====================================================

  const companyMap = new Map<string, number>();

  jobs.forEach((job) => {
    const company = job.company.trim();

    if (!company) {
      return;
    }

    companyMap.set(
      company,
      (companyMap.get(company) || 0) + 1
    );
  });

  const topCompanies = Array.from(
    companyMap.entries()
  )
    .map(([company, count]) => ({
      company,
      count,
    }))
    .sort(
      (a, b) => b.count - a.count
    )
    .slice(0, 5);

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

  // Only count applications from the current year.
  //
  // This prevents:
  //
  // January 2025
  // +
  // January 2026
  //
  // from being combined.

  const currentYear =
    new Date().getFullYear();

  const monthlyApplications =
    monthNames.map(
      (month, index) => {
        const count = jobs.filter(
          (job) => {
            const date =
              new Date(
                job.createdAt
              );

            return (
              date.getFullYear() ===
                currentYear &&
              date.getMonth() ===
                index
            );
          }
        ).length;

        return {
          month,
          jobs: count,
        };
      }
    );

  // ====================================================
  // PERFORMANCE RATES
  // ====================================================

  const interviewRate =
    totalJobs === 0
      ? 0
      : Math.round(
          (Interview /
            totalJobs) *
            100
        );

  const offerRate =
    totalJobs === 0
      ? 0
      : Math.round(
          (Offer /
            totalJobs) *
            100
        );

  const rejectionRate =
    totalJobs === 0
      ? 0
      : Math.round(
          (Rejected /
            totalJobs) *
            100
        );

  // ====================================================
  // FINAL ANALYTICS RESPONSE
  // ====================================================

  return {
    overview: {
      totalJobs,
      Applied,
      Interview,
      Offer,
      Rejected,
    },

    monthlyApplications,

    topCompanies,

    performance: {
      interviewRate,
      offerRate,
      rejectionRate,
    },
  };
};

