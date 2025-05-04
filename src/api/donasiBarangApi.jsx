import useAxios from "./index";

const fetchDonasiBarangByOrganisasi = async (id_organisasi) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await useAxios.get(
      `/donasi-barang/organisasi/${id_organisasi}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createDonasiBarang = async (id_barang_donasi, id_donasi) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await useAxios.post(
      "/donasi-barang",
      { id_barang_donasi, id_donasi },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan donasi barang:", error);
    return null;
  }
};

const updateCreatedAtDonasiBarang = async (id, created_at) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await useAxios.put(
      `/donasi-barang/${id}/created-at`,
      { created_at },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gagal update created_at:", error);
    return null;
  }
};

export {
  fetchDonasiBarangByOrganisasi,
  createDonasiBarang,
  updateCreatedAtDonasiBarang,
};
