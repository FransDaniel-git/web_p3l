import useAxios from "./baseApi";

const fetchKategoris = async () => {
  try {
    const response = await useAxios.get("/kategoris", {
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

export { fetchKategoris };
