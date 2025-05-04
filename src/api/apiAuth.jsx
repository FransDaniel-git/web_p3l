import useAxios from "./baseApi";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const login = async (data) => {
  try {
    const response = await useAxios.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

const logout = async () => {
  try {
    const response = await useAxios.post("/logout", null, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Terjadi kesalahan." };
  }
};

export { login, logout };
