import useAxios from "./baseApi";

const fetchPegawai = async (search = "") => {
  try {
    //const token = sessionStorage.getItem("token");
    //if (!token) {
    //  console.error("No token found");
    //  return;
    //}

    const response = await useAxios.get("/pegawai", {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      params: search ? { search } : {},
    });

    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createPegawai = async (data) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.post("/pegawai", data, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getPegawaiById = async (id) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.get(`/pegawai/${id}`, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updatePegawai = async (data) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.put(`/pegawai/${data.id_pegawai}`, data, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePegawai = async (id) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.delete(`/pegawai/${id}`, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  fetchPegawai,
  createPegawai,
  getPegawaiById,
  updatePegawai,
  deletePegawai,
};
