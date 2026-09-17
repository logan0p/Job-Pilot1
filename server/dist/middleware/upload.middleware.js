"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create uploads/resumes folder if it doesn't exist
const uploadPath = path_1.default.join(__dirname, "../../uploads/resumes");
if (!fs_1.default.existsSync(uploadPath)) {
    fs_1.default.mkdirSync(uploadPath, { recursive: true });
}
// Storage configuration
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueName = Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path_1.default.extname(file.originalname);
        cb(null, uniqueName);
    },
});
// Allow only PDF resumes
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF resumes are allowed."));
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
});
exports.default = upload;
