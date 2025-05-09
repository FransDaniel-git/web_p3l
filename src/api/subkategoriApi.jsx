import useAxios from "./baseApi";

const fetchSubkategoris = async (kategoriId = null) => {
  try {
    const params = kategoriId ? { kategori_id: kategoriId } : {};

    const response = await useAxios.get("/subkategoris", {
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

export { fetchSubkategoris };
