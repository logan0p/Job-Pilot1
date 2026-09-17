"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getUserById = async (userId) => {
    return await prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
};
exports.getUserById = getUserById;
const updateUser = async (userId, data) => {
    return await prisma_1.default.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });
};
exports.updateUser = updateUser;
