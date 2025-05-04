import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { toast } from "sonner";
import { logout } from "../api/apiAuth";

const TopNavbar = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout()
      .then((response) => {
        toast.success(response.message);
      })
      .catch((error) => {
        toast.error(error.message);
      });
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Navbar bg="dark" style={{ height: "5rem" }}>
      <Container fluid className="px-5">
        <Navbar.Brand href="/">
          <h1 className="text-white">P3L</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-3">
            {routes.map((route) => (
              <Nav.Link
                key={route.path}
                onClick={() => navigate(route.path)}
                active={location.pathname === route.path}
                style={{ fontSize: "1.2rem" }}
                className={
                  location.pathname === route.path
                    ? "text-white"
                    : "text-secondary"
                }
              >
                {route.name}
              </Nav.Link>
            ))}
          </Nav>
          <Button
            variant="danger"
            onClick={handleLogout}
            style={{ fontSize: "1.2rem" }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
