
import api from "./api";

// ======================================================
// GET DASHBOARD DATA
// ======================================================

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");

  return response.data;
};

