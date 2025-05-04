import { useState } from "react";
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

  const handlePrevious = () => {
    if (currentCard > 0) setCurrentCard(currentCard - 1);
  };

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      alert("Selesai membaca informasi umum.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 bg-light p-4"
    >
      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "500px",
          left: "-150px",
          top: "-150px",
          background: "#004BFE",
          transform: "rotate(92deg)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "450px",
          left: "50px",
          top: "50px",
          background: "#D9E4FF",
          transform: "rotate(-110deg)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "500px",
          right: "-150px",
          bottom: "-150px",
          background: "#004BFE",
          transform: "rotate(92deg)",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "450px",
          right: "50px",
          bottom: "50px",
          background: "#D9E4FF",
          transform: "rotate(-110deg)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Row className="justify-content-center w-75">
        <Col xl={8} lg={10} md={12}>
          <Card
            className="border-0"
            style={{
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(59, 113, 202, 0.2)",
              overflow: "hidden",
            }}
          >
            <Card.Img
              variant="top"
              src={cards[currentCard].image}
              style={{
                height: "30rem",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />

            <Card.Body
              className="p-5 d-flex flex-column"
              style={{ backgroundColor: "#ffffff" }}
            >
              <div className="text-center mb-4">
                <h2
                  className="text-dark fw-bold mb-4"
                  style={{ fontSize: "2rem" }}
                >
                  {cards[currentCard].title}
                </h2>
                <p
                  className="text-dark"
                  style={{
                    whiteSpace: "pre-line",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                  }}
                >
                  {cards[currentCard].content}
                </p>
              </div>

              <div className="mb-4">
                <ProgressBar
                  now={((currentCard + 1) / cards.length) * 100}
                  variant="primary"
                  style={{ height: "8px" }}
                  className="bg-secondary"
                />
                <div className="text-end text-dark small mt-2">
                  Langkah {currentCard + 1} dari {cards.length}
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                {currentCard > 0 ? (
                  <Button
                    onClick={handlePrevious}
                    size="lg"
                    className="px-4 py-2 fw-medium"
                    style={{
                      borderRadius: "10px",
                      borderWidth: "2px",
                      minWidth: "120px",
                    }}
                  >
                    Kembali
                  </Button>
                ) : (
                  <div style={{ minWidth: "120px" }}></div>
                )}

                <Button
                  variant="primary"
                  onClick={handleNext}
                  size="lg"
                  className="px-4 py-2 fw-medium"
                  style={{
                    borderRadius: "10px",
                    minWidth: "120px",
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
  );
}
