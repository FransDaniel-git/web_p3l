import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { toast } from "sonner";
import { showAllUsers } from "../api/userApi";

const ShowAllUserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    showAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
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
        <strong>Show User</strong>
      </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ShowAllUserPage;
