import { z } from "zod";


export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});


export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const createJobSchema = z.object({
  company: z.string().min(2, "Company name is required"),

  position: z.string().min(2, "Position is required"),

  location: z.string().min(2, "Location is required"),

  salary: z.string().optional(),

  status: z
    .enum([
      "Applied",
      "Interview",
      "Offer",
      "Rejected",
    ])
    .optional(),

  jobLink: z.string().url().optional(),

  notes: z.string().optional(),
});