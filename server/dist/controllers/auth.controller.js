"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const job_validator_1 = require("../validators/job.validator");
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    try {
        const data = job_validator_1.registerSchema.parse(req.body);
        const result = await (0, auth_service_1.registerUser)(data.name, data.email, data.password);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const data = job_validator_1.loginSchema.parse(req.body);
        const result = await (0, auth_service_1.loginUser)(data.email, data.password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.login = login;
