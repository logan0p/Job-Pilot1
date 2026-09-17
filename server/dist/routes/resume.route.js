"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const resume_controller_1 = require("../controllers/resume.controller");
const router = (0, express_1.Router)();
router.post("/:jobId", auth_middleware_1.authenticate, upload_middleware_1.default.single("resume"), resume_controller_1.uploadResume);
exports.default = router;
