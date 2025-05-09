import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Spinner,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link, replace, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignIn } from "../api/apiAuth";
import { Mail, Lock, LogIn, Eye, EyeOff, AlertCircle } from "lucide-react";

const FormLogin = () => {
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserType = sessionStorage.getItem("user_type");
    if (storedUserType) {
      setUserType(storedUserType); // Set userType di state
    }
  }, []); // Ini hanya berjalan sekali saat komponen pertama kali di-render

  // Navigasi berdasarkan userType
  useEffect(() => {
    if (userType) {
      switch (userType) {
        case "Pelanggan":
          navigate("/informasiUmum");
          break;
        case "Penitip":
          navigate("/penitip/content", { replace: true });
          break;
        case "Organisasi":
          navigate("/organisasi/content", { replace: true });
          break;
        case "Pegawai":
          navigate("/pegawai/content", { replace: true });
          break;
        case "Owner":
          navigate("/owner/content", { replace: true });
          break;
        default:
          navigate("/login");
      }
    }
  }, [userType, navigate]); // Ini akan berjalan setiap kali userType berubah

  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    setIsDisabled(!(newData.email && newData.password));
  };

  const Login = (event) => {
    event.preventDefault();
    setLoading(true);

    SignIn(data)
      .then((response) => {
        setLoading(false);
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("data", JSON.stringify(response.data));
        sessionStorage.setItem("id", response.id);
        sessionStorage.setItem("jabatan", response.jabatan);
        sessionStorage.setItem("user_type", response.user_type);
        setUserType(response.user_type); // Set userType di state
        toast.success("Login Success");

        // Redirect berdasarkan user_type (opsional, bisa kamu sesuaikan)
        switch (response.user_type) {
          case "pelanggan":
            console.log("Pelanggan");
            navigate("/informasiUmum", { replace: true });
            break;
          case "penitip":
            console.log("Penitip");
            navigate("/penitip/content", { replace: true });
            break;
          case "organisasi":
            console.log("Organisasi");
            navigate("/organisasi/content", { replace: true });
            break;
          case "pegawai":
            console.log("Pegawai");
            navigate("/pegawai/content", { replace: true });
            break;
          case "owner":
            console.log("Owner");
            navigate("/owner/content", { replace: true });
            break;
          // case 'admin':
          //   console.log("admin")
          //   navigate("/admin/content", { replace: true })
          //   break;
          default:
            navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);
        const errMsg = error?.message || "Login gagal";
        toast.error(errMsg);
      });
  };

  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between">
          <h1 className="navbar-brand text-xl font-bold">Welcome</h1>

          <div className="d-flex align-items-center">
            <Link className="nav-link text-white me-3" to="/register">
              Register
            </Link>
            <Link className="nav-link text-white me-3" to="/login">
              Login
            </Link>
          </div>
        </div>
      </nav>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            {/* Header */}
            <h2 className="text-center mb-4">Login to ReuseMart</h2>
            <Card className="p-4 shadow">
              <Form onSubmit={Login}>
                {/* Email Input */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Masukkan Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    autoComplete="true"
                  />
                </Form.Group>

                {/* Password Input */}
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Masukkan password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Login Button */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isDisabled}
                  className="w-100"
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" size="sm" />
                  ) : (
                    <span>Login</span>
                  )}
                </Button>

                {/* Register Link */}
                <p className="text-end mt-2">
                  Belum punya akun? <Link to="/register">Daftar</Link>
                </p>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default FormLogin;
