import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import LoginPage from "../pages/loginPage";
import ShowUserPage from "../pages/showAllUserPage";
import AddUserPage from "../pages/createUserPage";
import UpdateUserPage from "../pages/updateUserPage";
import DeleteUserPage from "../pages/deleteUserPage";
import InformasiUmum from "../pages/informasiUmum";
import ManagePegawai from "../pages/managePegawai";
import BarangPage from "../pages/barangPage";
import DetailBarangPage from "../pages/detailBarangPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BarangPage />,
    //path: "/",
    //element: <InformasiUmum />,
    //path: "/",
    //element: <ManagePegawai />,
  },
  {
    path: "/barang/:kode_barang",
    element: <DetailBarangPage />,
  },
  {},
  {
    element: <MainLayout />,
    children: [
      {
        path: "/showUser",
        element: <ShowUserPage />,
      },
      {
        path: "/addUser",
        element: <AddUserPage />,
      },
      {
        path: "/updateUser",
        element: <UpdateUserPage />,
      },
      {
        path: "/deleteUser",
        element: <DeleteUserPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Routes Not Found! </div>,
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
