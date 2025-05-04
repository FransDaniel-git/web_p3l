import { Outlet } from "react-router-dom";
import TopNavbar from "./topNavbar";

const routes = [
  {
    path: "/showUser",
    name: "Show User",
  },
  {
    path: "/addUser",
    name: "Add User",
  },
  {
    path: "/updateUser",
    name: "Update User",
  },
  {
    path: "/deleteUser",
    name: "Delete User",
  },
];

const MainLayout = () => {
  const backgroundImageUrl = "url('/bg2.jpg')";

  return (
    <>
      <TopNavbar routes={routes} />
      <div
        className="d-flex justify-content-center align-items-center text-center text-white"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: backgroundImageUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
