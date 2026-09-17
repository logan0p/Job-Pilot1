import { Request, Response } from "express";
import {registerSchema,loginSchema,} from "../validators/job.validator";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";


export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(
      data.name,
      data.email,
      data.password
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(
      data.email,
      data.password
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};