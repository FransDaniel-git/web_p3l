import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FormLogin from "../components/formLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const backgroundImageUrl = "url('/bg.jpg')";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/showUser");
    }
  }, [navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="position-absolute h-50 w-50 p-5 rounded-3 text-center"
        style={{
          backgroundColor: "rgba(48, 48, 48, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Container>
          <h1
            className="text-center mb-2 text-light"
            style={{ fontSize: "4rem" }}
          >
            <strong>P3L</strong>
          </h1>
          <h6 className="text-light mb-4">
            Tolong login terlebih dahulu untuk melanjutkan ke halaman CRUD
          </h6>
          <FormLogin />
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
