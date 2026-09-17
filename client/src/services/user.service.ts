import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/user/profile");

  return response.data;
};

export const updateProfile = async (data: {
  name: string;
  email: string;
}) => {
  const response = await api.put(
    "/user/profile",
    data
  );

  return response.data;
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await api.put(
    "/user/password",
    data
  );

  return response.data;
};