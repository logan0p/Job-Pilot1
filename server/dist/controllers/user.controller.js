"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileController = exports.getProfileController = void 0;
const user_service_1 = require("../services/user.service");
const getProfileController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await (0, user_service_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProfileController = getProfileController;
const updateProfileController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({
                success: false,
                message: "Name and email are required.",
            });
            return;
        }
        const user = await (0, user_service_1.updateUser)(userId, {
            name,
            email,
        });
        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: {
                user,
            },
        });
    }
    catch (error) {
        // Prisma unique email error
        if (error.code === "P2002") {
            res.status(409).json({
                success: false,
                message: "This email is already in use.",
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateProfileController = updateProfileController;
