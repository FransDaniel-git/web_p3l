import useAxios from "./index";

const updateStatusDonasi = async (idBarangDonasi, statusDonasi) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const response = await useAxios.put(
      `/barang-donasi/${idBarangDonasi}/status`,
      { status_donasi: statusDonasi },
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

export { updateStatusDonasi };
