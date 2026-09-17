"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobController = exports.updateJobController = exports.getJobController = exports.getJobsController = exports.createJobController = void 0;
const job_validator_1 = require("../validators/job.validator");
const job_service_1 = require("../services/job.service");
// ======================================================
// CREATE JOB
// ======================================================
const createJobController = async (req, res) => {
    try {
        const body = job_validator_1.createJobSchema.parse(req.body);
        console.log("========== JOB CONTROLLER ==========");
        console.log("AUTH USER:", req.user);
        if (!req.user?.userId) {
            res.status(401).json({
                success: false,
                message: "User authentication failed",
            });
            return;
        }
        const job = await (0, job_service_1.createJob)(body, req.user.userId);
        res.status(201).json({
            success: true,
            data: job,
        });
    }
    catch (error) {
        console.error("CREATE JOB ERROR:", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createJobController = createJobController;
// ======================================================
// GET ALL JOBS
// ======================================================
const getJobsController = async (req, res) => {
    try {
        const search = req.query.search;
        const status = req.query.status;
        const sort = req.query.sort;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await (0, job_service_1.getJobs)(req.user.userId, search, status, page, limit, sort);
        res.status(200).json({
            success: true,
            ...result,
        });
    }
    catch (error) {
        console.error("GET JOBS ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getJobsController = getJobsController;
// ======================================================
// GET SINGLE JOB
// ======================================================
const getJobController = async (req, res) => {
    try {
        const job = await (0, job_service_1.getJobById)(req.params.id, req.user.userId);
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
    }
    catch (error) {
        console.error("GET JOB ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getJobController = getJobController;
// ======================================================
// UPDATE JOB
// ======================================================
const updateJobController = async (req, res) => {
    try {
        const job = await (0, job_service_1.updateJob)(req.params.id, req.user.userId, req.body);
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
    }
    catch (error) {
        console.error("UPDATE JOB ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateJobController = updateJobController;
// ======================================================
// DELETE JOB
// ======================================================
const deleteJobController = async (req, res) => {
    try {
        const job = await (0, job_service_1.deleteJob)(req.params.id, req.user.userId);
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
    }
    catch (error) {
        console.error("DELETE JOB ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteJobController = deleteJobController;
