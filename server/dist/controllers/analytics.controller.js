"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsController = void 0;
const analytics_service_1 = require("../services/analytics.service");
const getAnalyticsController = async (req, res) => {
    try {
        const userId = req.user.userId;
        const analytics = await (0, analytics_service_1.getAnalyticsData)(userId);
        res.status(200).json({
            success: true,
            data: analytics,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAnalyticsController = getAnalyticsController;
