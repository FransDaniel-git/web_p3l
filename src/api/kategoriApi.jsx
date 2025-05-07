import useAxios from "./baseApi";

const fetchKategoris = async () => {
  try {
    // const token = sessionStorage.getItem("token");
    const response = await useAxios.get("/kategoris", {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchKategoris };
