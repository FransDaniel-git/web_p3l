import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/RegisterPage";
import ShowUserPage from "../pages/showAllUserPage";
import AddUserPage from "../pages/createUserPage";
import UpdateUserPage from "../pages/updateUserPage";
import DeleteUserPage from "../pages/deleteUserPage";
import InformasiUmum from "../pages/informasiUmum";
import ManagePegawai from "../pages/managePegawai";
import BarangPage from "../pages/barangPage";
import DetailBarangPage from "../pages/detailBarangPage";
import PermohonanPage from "../pages/permohonanPage";
import BarangDonasiPage from "../pages/BarangDonasiPage";
import DetailBarangDonasiPage from "../pages/detailBarangDonasiPage";
import DaftarDonasiOrganisasiPage from "../pages/daftarDonasiOrganisasiPage";
import "./index.css";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<BarangPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/informasiUmum" element={<InformasiUmum />} /> */}
        {/* <Route path="*" element={<div>Routes Not Found!</div>} /> */}
        {/* <Route path="/barang/:kode_barang" element={<DetailBarangPage />} /> */}
        {/* <Route path="/permohonan" element={<PermohonanPage />} /> */}
        {/* <Route path="/" element={<PermohonanPage />} /> */}
        <Route path="/" element={<PermohonanPage />} />
        <Route path="/barang-donasi" element={<BarangDonasiPage />} />
        <Route
          path="/barang-donasi/:id_barang_donasi"
          element={<DetailBarangDonasiPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
