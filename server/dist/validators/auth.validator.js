"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    company: zod_1.z.string().min(2),
    position: zod_1.z.string().min(2),
    location: zod_1.z.string().min(2),
    salary: zod_1.z.string().optional(),
    status: zod_1.z
        .enum(["Applied", "Interview", "Offer", "Rejected"])
        .optional(),
    jobLink: zod_1.z.string().url().optional(),
    notes: zod_1.z.string().optional(),
});
