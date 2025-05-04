import useAxios from "./baseApi";

const fetchJabatans = async (search = "") => {
  try {
    const token = sessionStorage.getItem("token");
    //if (!token) {
    //  console.error("No token found");
    //  return;
    //}

    const response = await useAxios.get("/jabatans", {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
      params: search ? { search } : {},
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const createJabatan = async (data) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.post("/jabatans", data, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getJabatanById = async (id) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.get(`/jabatans/${id}`, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateJabatan = async (data) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.put(`/jabatans/${data.id_jabatan}`, data, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteJabatan = async (id) => {
  try {
    //const token = sessionStorage.getItem("token");
    const response = await useAxios.delete(`/jabatans/${id}`, {
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchJabatans,
  createJabatan,
  getJabatanById,
  updateJabatan,
  deleteJabatan,
};
