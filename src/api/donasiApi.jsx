// donasiApi.jsx
import useAxios from "./index";

const createDonasi = async (id_permohonan) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await useAxios.post(
      "/donasi",
      { id_permohonan },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Gagal membuat donasi:", error);
    return null;
  }
};

export { createDonasi };
