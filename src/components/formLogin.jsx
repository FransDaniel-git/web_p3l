import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { toast } from "sonner";
import { login } from "../api/apiAuth";

const FormLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      toast.error("Tidak boleh ada yang kosong");
      return;
    } else {
      login(user)
        .then((response) => {
          toast.success(response.message);
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.user));
          navigate("/showUser");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="email" label="Email address" className="mb-4">
        <Form.Control
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </FloatingLabel>

      <FloatingLabel controlId="password" label="Password" className="mb-4">
        <Form.Control
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </FloatingLabel>

      <Button variant="primary" type="submit" size="lg" className="w-25">
        Login
      </Button>
    </Form>
  );
};

export default FormLogin;
