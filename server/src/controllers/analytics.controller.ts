import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { getAnalyticsData } from "../services/analytics.service";

export const getAnalyticsController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const analytics = await getAnalyticsData(userId);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};