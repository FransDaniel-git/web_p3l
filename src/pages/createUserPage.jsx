import { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import { toast } from "sonner";
import { createUser } from "../api/userApi";

const CreateUserPage = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === "") {
      toast.error("Tidak boleh ada yang kosong");
      return;
    } else {
      createUser(user)
        .then((response) => {
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <>
      <Container
        className="position-absolute p-5 rounded-3 text-center mt-4"
        style={{
          backgroundColor: "rgba(48, 48, 48, 0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h1 style={{ fontSize: "4rem" }} className="mb-4">
          <strong>Add User</strong>
        </h1>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="name" label="Name" className="mb-4">
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="email"
            label="Email address"
            className="mb-4"
          >
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

          <Button size="lg" variant="primary" type="submit" className="w-25">
            Create
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateUserPage;
