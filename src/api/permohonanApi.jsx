import useAxios from "./baseApi";

const fetchPermohonan = async () => {
  try {
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.get("/permohonans", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchPermohonan };
