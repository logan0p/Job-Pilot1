import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardData = async (
  userId: string
) => {

  const totalJobs = await prisma.job.count({
    where: { userId },
  });

  const applied = await prisma.job.count({
    where: {
      userId,
      status: "Applied",
    },
  });

  const interview = await prisma.job.count({
    where: {
      userId,
      status: "Interview",
    },
  });

  const offer = await prisma.job.count({
    where: {
      userId,
      status: "Offer",
    },
  });

  const rejected = await prisma.job.count({
    where: {
      userId,
      status: "Rejected",
    },
  });

  const recentJobs = await prisma.job.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return {
    totalJobs,
    Applied: applied,
    Interview: interview,
    Offer: offer,
    Rejected: rejected,
    recentJobs,
  };
};