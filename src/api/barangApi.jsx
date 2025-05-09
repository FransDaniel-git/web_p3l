import useAxios from "./baseApi";

const fetchBarang = async (params = {}) => {
  try {
    const response = await useAxios.get("/barangs", {
      headers: {
        "Content-Type": "application/json",
      },
      params: params,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchBarangDetail = async (kode_barang) => {
  try {
    const response = await useAxios.get(`/barang/${kode_barang}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchBarang, fetchBarangDetail };
