"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardController = async (req, res) => {
    try {
        const userId = req.user.userId;
        // =========================
        // TOTAL JOBS
        // =========================
        const totalJobs = await prisma_1.default.job.count({
            where: {
                userId,
            },
        });
        // =========================
        // STATUS COUNTS
        // =========================
        const Applied = await prisma_1.default.job.count({
            where: {
                userId,
                status: "Applied",
            },
        });
        const Interview = await prisma_1.default.job.count({
            where: {
                userId,
                status: "Interview",
            },
        });
        const Offer = await prisma_1.default.job.count({
            where: {
                userId,
                status: "Offer",
            },
        });
        const Rejected = await prisma_1.default.job.count({
            where: {
                userId,
                status: "Rejected",
            },
        });
        // =========================
        // RECENT JOBS
        // =========================
        const recentJobs = await prisma_1.default.job.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });
        // =========================
        // MONTHLY APPLICATIONS
        // =========================
        const jobs = await prisma_1.default.job.findMany({
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
        const monthlyApplications = monthNames.map((month, index) => {
            const applications = jobs.filter((job) => {
                const date = new Date(job.createdAt);
                return (date.getMonth() === index);
            }).length;
            return {
                month,
                applications,
            };
        });
        // =========================
        // RESPONSE
        // =========================
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
    }
    catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getDashboardController = getDashboardController;
