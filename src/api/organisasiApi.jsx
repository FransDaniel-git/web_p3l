import useAxios from "./index";

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

export { updateNamaPenerima };
