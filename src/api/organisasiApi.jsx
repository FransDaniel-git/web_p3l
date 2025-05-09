import useAxios from "./baseApi";

const updateNamaPenerima = async (idOrganisasi, namaPenerima) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await useAxios.put(
      `/organisasi/${idOrganisasi}/update-penerima`,
      { nama_penerima: namaPenerima },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchDonasiByOrganisasi = async (id_organisasi) => {
  try {
    // Jika menggunakan autentikasi
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.get(`/organisasi/${id_organisasi}/donasi`, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching donasi by organisasi:", error);
    throw error;
  }
};

const fetchAllOrganisasi = async () => {
  try {
    // Jika menggunakan autentikasi
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.get("/organisasi", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching organisasi:", error);
    throw error;
  }
};

const updateDonasiBarang = async (id_donasi_barang, data) => {
  try {
    // Jika menggunakan autentikasi
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   console.error("No token found");
    //   return;
    // }

    const response = await useAxios.put(
      `/donasi-barang/${id_donasi_barang}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating donasi:", error);
    throw error;
  }
};

export {
  updateNamaPenerima,
  fetchDonasiByOrganisasi,
  fetchAllOrganisasi,
  updateDonasiBarang,
};
