"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jawt_1 = require("../utils/jawt");
const registerUser = async (name, email, password) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    const token = (0, jawt_1.generateToken)(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error("Invalid email or password");
    }
    const token = (0, jawt_1.generateToken)(user.id);
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};
exports.loginUser = loginUser;
