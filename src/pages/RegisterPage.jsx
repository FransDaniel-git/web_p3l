import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { SignUp, SignIn } from "../api/apiAuth";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({
    nama: "",
    email: "",
    noTelp: "",
    password: "",
    tanggal_lahir: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value };
    setData(newData);
    setIsDisabled(
      !(
        newData.nama &&
        newData.email &&
        newData.noTelp &&
        newData.password &&
        newData.tanggal_lahir
      )
    ); // Disable button jika form belum lengkap
  };

  const Register = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await SignUp(data);
      toast.success("Register Success");
      // toast.success("Sign in new account");

      // const loginData = { nama: data.nama, password: data.password };
      // const response = await SignIn(loginData);

      // sessionStorage.setItem("token", response.token);
      // sessionStorage.setItem("data", response.data);
      // sessionStorage.setItem("id" , response.id);

      // toast.success("Login Success");
      // navigate("/content");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between">
          <h1 className="navbar-brand text-xl font-bold">Welcome</h1>
          <div className="d-flex align-items-center">
            <Link className="nav-link text-white me-3" to="/">
              Dashboard
            </Link>
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
        <Card style={{ width: "25rem" }} className="p-4 shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2>
            <Form onSubmit={Register}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formNoTelp">
                <Form.Label>No Telepon</Form.Label>
                <Form.Control
                  type="text"
                  name="noTelp"
                  placeholder="Masukkan No Telepon"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Masukkan password"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formTanggalLahir">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  type="date"
                  name="tanggal_lahir"
                  placeholder="Pilih Tanggal Lahir"
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isDisabled}
              >
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <span>Register</span>
                )}
              </Button>
            </Form>
            <p className="text-center mt-3">
              Sudah punya akun? <Link to="/login">Login</Link>
            </p>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
};

export default RegisterPage;
