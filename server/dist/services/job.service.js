"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.getJobById = exports.getJobs = exports.createJob = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// ======================================================
// CREATE JOB
// ======================================================
const createJob = async (data, userId) => {
    console.log("========== CREATE JOB ==========");
    console.log("USER ID RECEIVED:", userId);
    // Check whether this user actually exists
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    console.log("USER FOUND:", user);
    if (!user) {
        throw new Error(`User not found in database. userId: ${userId}`);
    }
    return await prisma_1.default.job.create({
        data: {
            company: data.company,
            position: data.position,
            location: data.location,
            salary: data.salary,
            status: data.status || "Applied",
            jobLink: data.jobLink,
            notes: data.notes,
            resume: data.resume,
            userId,
        },
    });
};
exports.createJob = createJob;
// ======================================================
// GET JOBS
// Search + Status + Sorting + Pagination
// ======================================================
const getJobs = async (userId, search, status, page = 1, limit = 10, sort) => {
    const skip = (page - 1) * limit;
    // --------------------------------------------
    // FILTERS
    // --------------------------------------------
    const where = {
        userId,
    };
    // Search company OR position
    if (search) {
        where.OR = [
            {
                company: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                position: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }
    // Status filter
    if (status) {
        where.status = status;
    }
    // --------------------------------------------
    // SORTING
    // --------------------------------------------
    let orderBy = {
        createdAt: "desc",
    };
    if (sort === "company") {
        orderBy = {
            company: "asc",
        };
    }
    else if (sort === "position") {
        orderBy = {
            position: "asc",
        };
    }
    else if (sort === "status") {
        orderBy = {
            status: "asc",
        };
    }
    else if (sort === "oldest") {
        orderBy = {
            createdAt: "asc",
        };
    }
    // --------------------------------------------
    // GET JOBS
    // --------------------------------------------
    const jobs = await prisma_1.default.job.findMany({
        where,
        skip,
        take: limit,
        orderBy,
    });
    // --------------------------------------------
    // TOTAL COUNT
    // --------------------------------------------
    const total = await prisma_1.default.job.count({
        where,
    });
    return {
        jobs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    };
};
exports.getJobs = getJobs;
// ======================================================
// GET SINGLE JOB
// ======================================================
const getJobById = async (id, userId) => {
    return await prisma_1.default.job.findFirst({
        where: {
            id,
            userId,
        },
    });
};
exports.getJobById = getJobById;
// ======================================================
// UPDATE JOB
// ======================================================
const updateJob = async (id, userId, data) => {
    const job = await prisma_1.default.job.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!job) {
        return null;
    }
    return await prisma_1.default.job.update({
        where: {
            id,
        },
        data,
    });
};
exports.updateJob = updateJob;
// ======================================================
// DELETE JOB
// ======================================================
const deleteJob = async (id, userId) => {
    const job = await prisma_1.default.job.findFirst({
        where: {
            id,
            userId,
        },
    });
    if (!job) {
        return null;
    }
    await prisma_1.default.job.delete({
        where: {
            id,
        },
    });
    return job;
};
exports.deleteJob = deleteJob;
