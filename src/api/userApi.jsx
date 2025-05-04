import useAxios from "./baseApi";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const showAllUsers = async () => {
  try {
    const response = await useAxios.get("/users", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

const showUser = async (id) => {
  try {
    const response = await useAxios.get(`/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

const createUser = async (data) => {
  try {
    const response = await useAxios.post("/users", data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

const updateUser = async (id, data) => {
  try {
    const response = await useAxios.put(`/users/${id}`, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

const deleteUser = async (id) => {
  try {
    const response = await useAxios.delete(`/users/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

export { showAllUsers, showUser, createUser, updateUser, deleteUser };
