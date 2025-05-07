import useAxios from "./baseApi";

const fetchSubkategoris = async (kategoriId = null) => {
  try {
    // const token = sessionStorage.getItem("token");
    const params = kategoriId ? { kategori_id: kategoriId } : {};

    const response = await useAxios.get("/subkategoris", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      params: params,
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchSubkategoris };
