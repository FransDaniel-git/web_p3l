import useAxios from "./index";

const tambahPoinPenitip = async (idPenitip, poinTambahan) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await useAxios.put(
      `/penitip/${idPenitip}/tambah-poin`,
      { poin: poinTambahan },
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

export { tambahPoinPenitip };
