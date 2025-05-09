import { toast } from "react-toastify";
import useAxios from "./baseApi";

const SignUp = async (data) => {
  try {
    const response = await useAxios.post("user/register", data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Register gagal");
    throw error.response?.data || error;
  }
};

const SignIn = async (data) => {
  try {
    const response = await useAxios.post("user/login", data, {
      headers: {
        "X-Client-Type": "web",
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Login gagal");
    throw error.response?.data || error;
  }
};

export { SignUp, SignIn };
