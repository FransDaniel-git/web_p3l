import useAxios from "./baseApi";

const fetchBarangDonasi = async (filters = {}) => {
  try {
    // Jika token diperlukan, bisa diaktifkan kembali:
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.get("/barang-donasis", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      params: filters,
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchBarangDonasiById = async (id_barang_donasi) => {
  try {
    // Jika token diperlukan, bisa diaktifkan kembali:
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.get(`/barang-donasis/${id_barang_donasi}`, {
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

export { fetchBarangDonasi, fetchBarangDonasiById };
