import { useEffect, useState } from "react";
import { Container, Table, Button, Modal } from "react-bootstrap";
import { toast } from "sonner";
import { showAllUsers, deleteUser } from "../api/userApi";

const DeleteUserPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    showAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleShowModal = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUserIdToDelete(null);
  };

  const handleDelete = (id) => {
    deleteUser(id)
      .then((response) => {
        toast.success(response.message);
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setShowModal(false);
      });
  };

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
        <strong>Delete User</strong>
      </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleShowModal(user.id)}
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Penghapusan</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus pengguna ini?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(userIdToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DeleteUserPage;
