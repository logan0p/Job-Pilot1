
import api from "./api";

// ======================================================
// UPLOAD / REPLACE RESUME
// ======================================================

export const uploadResume = async (
  jobId: string,
  file: File
) => {
  const formData = new FormData();

  formData.append(
    "resume",
    file
  );

  const response = await api.post(
    `/resumes/${jobId}`,
    formData
  );

  return response.data;
};

// ======================================================
// DELETE RESUME
// ======================================================

export const deleteResume = async (
  jobId: string
) => {
  const response = await api.delete(
    `/resumes/${jobId}`
  );

  return response.data;
};

