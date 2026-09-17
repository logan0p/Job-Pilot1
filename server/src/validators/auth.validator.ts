import { z } from "zod";

export const createJobSchema = z.object({
  company: z.string().min(2),
  position: z.string().min(2),
  location: z.string().min(2),

  salary: z.string().optional(),

  status: z
    .enum(["Applied", "Interview", "Offer", "Rejected"])
    .optional(),

  jobLink: z.string().url().optional(),

  notes: z.string().optional(),
});