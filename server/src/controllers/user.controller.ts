import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  getUserById,
  updateUser,
  updateUserPassword,
} from "../services/user.service";


// ======================================================
// GET PROFILE
// ======================================================

export const getProfileController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });

      return;
    }

    // NEVER send password to frontend
    res.status(200).json({
      success: true,

      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });

  } catch (error: any) {

    console.error(
      "GET PROFILE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to load profile.",
    });
  }
};


// ======================================================
// UPDATE PROFILE
// ======================================================

export const updateProfileController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {

    const userId = req.user!.userId;

    const {
      name,
      email,
    } = req.body;


    // ============================================
    // VALIDATION
    // ============================================

    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Name is required.",
      });

      return;
    }


    if (
      typeof email !== "string" ||
      !email.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Email is required.",
      });

      return;
    }


    const cleanName =
      name.trim();

    const cleanEmail =
      email.trim().toLowerCase();


    // ============================================
    // BASIC EMAIL VALIDATION
    // ============================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(cleanEmail)) {
      res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });

      return;
    }


    // ============================================
    // UPDATE
    // ============================================

    const user = await updateUser(
      userId,
      {
        name: cleanName,
        email: cleanEmail,
      }
    );


    // ============================================
    // RESPONSE
    // ============================================

    res.status(200).json({
      success: true,

      message:
        "Profile updated successfully.",

      data: {
        user,
      },
    });

  } catch (error: any) {

    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );


    // Prisma duplicate email
    if (
      error?.code === "P2002"
    ) {
      res.status(409).json({
        success: false,
        message:
          "This email is already in use.",
      });

      return;
    }


    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to update profile.",
    });
  }
};


// ======================================================
// CHANGE PASSWORD
// ======================================================

export const changePasswordController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {

  try {

    const userId =
      req.user!.userId;


    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;


    // ============================================
    // VALIDATION
    // ============================================

    if (
      typeof currentPassword !== "string" ||
      typeof newPassword !== "string" ||
      typeof confirmPassword !== "string"
    ) {

      res.status(400).json({
        success: false,
        message:
          "All password fields are required.",
      });

      return;
    }


    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {

      res.status(400).json({
        success: false,
        message:
          "All password fields are required.",
      });

      return;
    }


    // ============================================
    // PASSWORD MATCH
    // ============================================

    if (
      newPassword !== confirmPassword
    ) {

      res.status(400).json({
        success: false,
        message:
          "New passwords do not match.",
      });

      return;
    }


    // ============================================
    // PASSWORD LENGTH
    // ============================================

    if (
      newPassword.length < 6
    ) {

      res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters.",
      });

      return;
    }


    // ============================================
    // GET USER
    // ============================================

    const user =
      await getUserById(userId);


    if (!user) {

      res.status(404).json({
        success: false,
        message:
          "User not found.",
      });

      return;
    }


    // ============================================
    // BCRYPT
    // ============================================

    const bcrypt =
      await import("bcryptjs");


    // ============================================
    // CHECK CURRENT PASSWORD
    // ============================================

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );


    if (!passwordMatch) {

      res.status(401).json({
        success: false,
        message:
          "Current password is incorrect.",
      });

      return;
    }


    // ============================================
    // HASH NEW PASSWORD
    // ============================================

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );


    // ============================================
    // UPDATE PASSWORD
    // ============================================

    await updateUserPassword(
      userId,
      hashedPassword
    );


    // ============================================
    // SUCCESS
    // ============================================

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });

  } catch (error: any) {

    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );


    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to change password.",
    });
  }
};