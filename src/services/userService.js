import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const registerUser = async (user) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await api.get(
    `/users?email=${email}&password=${password}`
  );

  return response.data;
};