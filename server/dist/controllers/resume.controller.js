"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../config/prisma"));
const uploadResume = async (req, res) => {
    try {
        const userId = req.user.userId;
        const jobId = req.params.jobId;
        // Check if a file was uploaded
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "Please upload a PDF resume.",
            });
            return;
        }
        // Check that the job belongs to the logged-in user
        const job = await prisma_1.default.job.findFirst({
            where: {
                id: jobId,
                userId,
            },
        });
        if (!job) {
            // Remove uploaded file if job doesn't belong to user
            const uploadedPath = path_1.default.join(__dirname, "../../uploads/resumes", req.file.filename);
            if (fs_1.default.existsSync(uploadedPath)) {
                fs_1.default.unlinkSync(uploadedPath);
            }
            res.status(404).json({
                success: false,
                message: "Job not found.",
            });
            return;
        }
        // Delete old resume if one exists
        if (job.resume) {
            const oldResumePath = path_1.default.join(__dirname, "../../uploads/resumes", path_1.default.basename(job.resume));
            if (fs_1.default.existsSync(oldResumePath)) {
                fs_1.default.unlinkSync(oldResumePath);
            }
        }
        // Path saved in database
        const resumePath = `/uploads/resumes/${req.file.filename}`;
        // Save resume path to database
        await prisma_1.default.job.update({
            where: {
                id: jobId,
            },
            data: {
                resume: resumePath,
            },
        });
        res.status(200).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume: resumePath,
        });
    }
    catch (error) {
        console.error("Resume upload error:", error);
        // Clean up uploaded file if something failed
        if (req.file) {
            const uploadedPath = path_1.default.join(__dirname, "../../uploads/resumes", req.file.filename);
            if (fs_1.default.existsSync(uploadedPath)) {
                fs_1.default.unlinkSync(uploadedPath);
            }
        }
        res.status(500).json({
            success: false,
            message: error.message || "Failed to upload resume.",
        });
    }
};
exports.uploadResume = uploadResume;
