import api from "./api";

export const getJobs = async () => {
  const response = await api.get("/jobs");
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (data: {
  company: string;
  position: string;
  location: string;
  salary: string;
  status: string;
  notes: string;
}) => {
  const response = await api.post("/jobs", data);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

export const updateJob = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `/jobs/${id}`,
    data
  );

  return response.data;
};