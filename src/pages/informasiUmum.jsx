import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import gambar_1 from "../assets/IU_1.jpg";
import gambar_2 from "../assets/IU_2.jpg";
import gambar_3 from "../assets/IU_3.jpg";
import gambar_4 from "../assets/IU_4.jpg";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Selamat Datang di ReuseMart",
    content:
      "Selamat bergabung di ReuseMart! Kami hadir untuk memudahkan Anda dalam menemukan dan menjual barang bekas berkualitas, sambil bersama-sama menjaga lingkungan.",
    image: gambar_1,
  },
  {
    title: "Apa itu ReuseMart?",
    content:
      "ReuseMart adalah platform jual beli barang bekas yang berbasis di Yogyakarta. Kami menghubungkan penitip dan pembeli melalui sistem penitipan yang praktis dan terpercaya.",
    image: gambar_2,
  },
  {
    title: "Visi dan Misi",
    content:
      "Visi: Mengurangi limbah dan menciptakan ekonomi sirkular.\nMisi: Menjadi platform terpercaya untuk pemanfaatan kembali barang bekas yang masih layak pakai.",
    image: gambar_3,
  },
  {
    title: "Selamat Menikmati",
    content:
      "Semoga aplikasi kami membantu Anda menemukan barang berkualitas dengan harga terjangkau, sekaligus berkontribusi menjaga lingkungan. Selamat menggunakan ReuseMart!",
    image: gambar_4,
  },
];

export default function InformasiUmum() {
  const [currentCard, setCurrentCard] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handlePrevious = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      navigate("/");
    }
  };

  // Responsive background elements
  const getBackgroundStyle = () => {
    // Mobile view (<768px)
    if (windowWidth < 768) {
      return {
        topLeft: {
          width: "250px",
          height: "300px",
          left: "-100px",
          top: "-100px",
        },
        topRight: {
          width: "200px",
          height: "250px",
          left: "20px",
          top: "20px",
        },
        bottomLeft: {
          width: "250px",
          height: "300px",
          right: "-100px",
          bottom: "-100px",
        },
        bottomRight: {
          width: "200px",
          height: "250px",
          right: "20px",
          bottom: "20px",
        },
      };
    }
    // Tablet view (768px - 992px)
    else if (windowWidth < 992) {
      return {
        topLeft: {
          width: "350px",
          height: "400px",
          left: "-120px",
          top: "-120px",
        },
        topRight: {
          width: "300px",
          height: "350px",
          left: "30px",
          top: "30px",
        },
        bottomLeft: {
          width: "350px",
          height: "400px",
          right: "-120px",
          bottom: "-120px",
        },
        bottomRight: {
          width: "300px",
          height: "350px",
          right: "30px",
          bottom: "30px",
        },
      };
    }
    // Desktop view (>=992px)
    else {
      return {
        topLeft: {
          width: "450px",
          height: "500px",
          left: "-150px",
          top: "-150px",
        },
        topRight: {
          width: "400px",
          height: "450px",
          left: "50px",
          top: "50px",
        },
        bottomLeft: {
          width: "450px",
          height: "500px",
          right: "-150px",
          bottom: "-150px",
        },
        bottomRight: {
          width: "400px",
          height: "450px",
          right: "50px",
          bottom: "50px",
        },
      };
    }
  };

  const bgStyle = getBackgroundStyle();

  // Get image height based on screen size
  const getImageHeight = () => {
    if (windowWidth < 576) return "15rem";
    if (windowWidth < 768) return "18rem";
    if (windowWidth < 992) return "20rem";
    return "25rem";
  };

  // Get button size based on screen size
  const getButtonSize = () => {
    if (windowWidth < 576) return "sm";
    if (windowWidth < 992) return "md";
    return "lg";
  };

  // Get container width based on screen size
  const getContainerWidth = () => {
    if (windowWidth < 576) return "95%";
    if (windowWidth < 992) return "85%";
    return "75%";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background decorative elements */}
      <div
        style={{
          position: "absolute",
          width: bgStyle.topLeft.width,
          height: bgStyle.topLeft.height,
          left: bgStyle.topLeft.left,
          top: bgStyle.topLeft.top,
          background: "#004BFE",
          transform: "rotate(92deg)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: bgStyle.topRight.width,
          height: bgStyle.topRight.height,
          left: bgStyle.topRight.left,
          top: bgStyle.topRight.top,
          background: "#D9E4FF",
          transform: "rotate(-110deg)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: bgStyle.bottomLeft.width,
          height: bgStyle.bottomLeft.height,
          right: bgStyle.bottomLeft.right,
          bottom: bgStyle.bottomLeft.bottom,
          background: "#004BFE",
          transform: "rotate(92deg)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: bgStyle.bottomRight.width,
          height: bgStyle.bottomRight.height,
          right: bgStyle.bottomRight.right,
          bottom: bgStyle.bottomRight.bottom,
          background: "#D9E4FF",
          transform: "rotate(-110deg)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Container
        fluid
        className="d-flex align-items-center justify-content-center min-vh-100 py-4"
        style={{ position: "relative", zIndex: 2 }}
      >
        <Row
          className="justify-content-center align-items-center"
          style={{ width: getContainerWidth() }}
        >
          <Col xs={12} sm={12} md={12} lg={10} xl={8}>
            <Card
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
              className="border-0 shadow-lg"
            >
              <Card.Img
                variant="top"
                src={cards[currentCard].image}
                style={{
                  height: getImageHeight(),
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />

              <Card.Body
                className={`p-${
                  windowWidth < 576 ? "3" : "4"
                } d-flex flex-column`}
                style={{ backgroundColor: "#ffffff" }}
              >
                <div className="text-center mb-3">
                  <h2
                    className="text-dark fw-bold mb-2"
                    style={{
                      fontSize:
                        windowWidth < 576
                          ? "1.3rem"
                          : windowWidth < 992
                          ? "1.5rem"
                          : "1.6rem",
                    }}
                  >
                    {cards[currentCard].title}
                  </h2>
                  <p
                    className="text-dark"
                    style={{
                      whiteSpace: "pre-line",
                      fontSize: windowWidth < 576 ? "0.875rem" : "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {cards[currentCard].content}
                  </p>
                </div>

                <div className="mb-3">
                  <ProgressBar
                    now={((currentCard + 1) / cards.length) * 100}
                    variant="primary"
                    style={{ height: windowWidth < 576 ? "0.4rem" : "0.5rem" }}
                    className="bg-info"
                  />
                  <div className="text-end text-dark small mt-2">
                    Langkah {currentCard + 1} dari {cards.length}
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  {currentCard > 0 ? (
                    <Button
                      onClick={handlePrevious}
                      size={getButtonSize()}
                      className={`px-${windowWidth < 576 ? "3" : "4"} py-${
                        windowWidth < 576 ? "1" : "2"
                      } fw-medium`}
                      style={{
                        borderRadius: "10px",
                        borderWidth: "2px",
                        minWidth: windowWidth < 576 ? "90px" : "120px",
                      }}
                    >
                      Kembali
                    </Button>
                  ) : (
                    <div
                      style={{ minWidth: windowWidth < 576 ? "90px" : "120px" }}
                    ></div>
                  )}

                  <Button
                    variant="primary"
                    onClick={handleNext}
                    size={getButtonSize()}
                    className={`px-${windowWidth < 576 ? "3" : "4"} py-${
                      windowWidth < 576 ? "1" : "2"
                    } fw-medium`}
                    style={{
                      borderRadius: "10px",
                      minWidth: windowWidth < 576 ? "90px" : "120px",
                      boxShadow:
                        currentCard === cards.length - 1
                          ? "0 4px 15px rgba(25, 135, 84, 0.3)"
                          : "0 4px 15px rgba(59, 113, 202, 0.3)",
                    }}
                  >
                    {currentCard === cards.length - 1 ? "Selesai" : "Lanjut"}
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
