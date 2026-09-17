"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardData = async (userId) => {
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
exports.getDashboardData = getDashboardData;
