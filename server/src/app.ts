
import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resume.route";
import userRoutes from "./routes/user.route";
import dashboardRoutes from "./routes/dashboard.routes";
import analyticsRoutes from "./routes/analytics.routes";
import jobRoutes from "./routes/job.route";
import authRoutes from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 JobPilot Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/user", userRoutes);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

export default app;

