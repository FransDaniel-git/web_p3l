import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  Badge,
  Spinner,
  Row,
  Col,
  Button,
  Carousel,
  ListGroup,
  Alert,
} from "react-bootstrap";
import {
  FaStar,
  FaArrowLeft,
  FaWeightHanging,
  FaRulerCombined,
  FaShieldAlt,
  FaStore,
} from "react-icons/fa";
import { fetchBarangDetail } from "../api/barangApi";

const DetailBarang = () => {
  const { kode_barang } = useParams();
  const [barang, setBarang] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetchBarangDetail(kode_barang)
      .then((res) => {
        setBarang(res.data.data);
      })
      .catch((err) => {
        setError(err.message || "Gagal mengambil data barang");
      })
      .finally(() => setLoading(false));
  }, [kode_barang]);

  if (loading)
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">Memuat detail produk...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <Alert variant="danger" className="shadow-sm">
          <h5 className="alert-heading">Terjadi Kesalahan</h5>
          <p>{error}</p>
          <hr />
          <Link to="/">
            <Button variant="outline-danger">
              <FaArrowLeft className="me-2" /> Kembali ke Beranda
            </Button>
          </Link>
        </Alert>
      </div>
    );

  if (!barang) return null;

  return (
    <>
      <style>
        {`
          .detail-page-container {
            min-height: 100vh;
            width: 100%;
            padding: 0;
            margin: 0;
            background-color: #f5f7fa;
            position: relative;
          }
          
          .loading-container,
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            width: 100%;
            padding: 20px;
          }

          .floating-back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1000;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            border-radius: 50px;
            padding: 10px 20px;
            background-color: white;
            transition: all 0.3s ease;
          }
          
          .floating-back-btn:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            transform: translateY(-2px);
          }
          
          .product-visual-container {
            background-color: #fff;
            border-radius: 8px 8px 0 0;
            box-shadow: 0 3px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            margin-bottom: 0;
          }
          
          .product-carousel {
            border-radius: 8px 8px 0 0;
            overflow: hidden;
            box-shadow: none;
          }
          
          .image-container {
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #fff;
          }
          
          .product-image {
            max-height: 100%;
            max-width: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
          }
          
          .product-image:hover {
            transform: scale(1.03);
          }
          
          .thumbnail-container {
            display: flex;
            gap: 0.5rem;
            margin-top: 0;
            padding: 1rem;
            overflow-x: auto;
            justify-content: center;
            background-color: white;
            border-radius: 0;
            box-shadow: none;
            border-top: 1px solid rgba(0,0,0,0.05);
          }
          
          .thumbnail {
            width: 80px;
            height: 80px;
            border: 2px solid transparent;
            border-radius: 6px;
            padding: 0;
            background: none;
            cursor: pointer;
            overflow: hidden;
            flex-shrink: 0;
          }
          
          .thumbnail img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .thumbnail.active {
            border-color: #0d6efd;
          }
          
          .product-title {
            font-weight: 700;
            font-size: 2.2rem;
            color: #2c3e50;
          }
          
          .price-container {
            display: flex;
            align-items: center;
            padding: 1.5rem;
            background-color: #f8f9fa;
            border-radius: 6px;
            margin-bottom: 1.5rem;
          }
          
          .price-label {
            font-weight: 600;
            margin-right: 0.5rem;
            color: #6c757d;
          }
          
          .price-value {
            font-size: 2rem;
            font-weight: 700;
            color: #0d6efd;
          }
          
          .rating-badge {
            display: flex;
            align-items: center;
            background-color: rgba(255, 193, 7, 0.2);
            padding: 0.35rem 0.75rem;
            border-radius: 6px;
            font-weight: 600;
          }
          
          .detail-section {
            background: #fff;
            border-radius: 0 0 8px 8px;
            padding: 30px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.1);
            margin-top: 0;
          }

          .product-description {
            background-color: #fff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.05);
            margin-bottom: 2rem;
          }
          
          .description-title {
            font-weight: 600;
            margin-bottom: 1rem;
            color: #2c3e50;
            font-size: 1.3rem;
          }
          
          .description-content {
            white-space: pre-line;
            line-height: 1.8;
            color: #495057;
            font-size: 1.1rem;
          }
          
          .product-card {
            border: none;
            margin-bottom: 0;
            background-color: transparent;
          }

          .specs-container {
            background: #fff;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            box-shadow: 0 3px 15px rgba(0,0,0,0.05);
          }

          .list-group-item {
            padding: 1rem 1.5rem;
            border-left: none;
            border-right: none;
          }

          .list-group-item:first-child {
            border-top: none;
          }

          .list-group-item:last-child {
            border-bottom: none;
          }
          
          .action-buttons {
            margin-top: 1.5rem;
          }

          .action-button {
            padding: 12px 24px;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 8px;
          }
          
          .content-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 1rem;
          }
          
          @media (max-width: 991.98px) {
            .image-container {
              height: 400px;
            }
          }
          
          @media (max-width: 767.98px) {
            .image-container {
              height: 350px;
            }
            
            .product-title {
              font-size: 1.8rem;
            }
            
            .price-value {
              font-size: 1.6rem;
            }

            .product-description {
              padding: 1.5rem;
            }
            
            .content-container {
              padding: 2rem 1rem;
            }
          }
        `}
      </style>

      <div className="detail-page-container">
        <Button
          as={Link}
          to="/"
          variant="outline-primary"
          className="floating-back-btn"
        >
          <FaArrowLeft className="me-2" /> Kembali
        </Button>

        <div className="content-container">
          <Card className="product-card border-0">
            <Row className="g-0">
              <Col xs={12}>
                <div className="product-visual-container">
                  <Carousel
                    activeIndex={activeIndex}
                    onSelect={setActiveIndex}
                    variant="dark"
                    interval={5000}
                    className="h-100 product-carousel"
                    indicators={
                      barang.gambar && barang.gambar.split(",").length > 1
                    }
                  >
                    {barang.gambar ? (
                      barang.gambar.split(",").map((img, index) => {
                        const imageName = img.trim();
                        const imageUrl = `http://127.0.0.1:8000/storage/barangs/${imageName}`;
                        return (
                          <Carousel.Item key={index}>
                            <div className="image-container">
                              <img
                                className="product-image"
                                src={imageUrl}
                                alt={`${barang.nama} - gambar ${index + 1}`}
                              />
                            </div>
                          </Carousel.Item>
                        );
                      })
                    ) : (
                      <Carousel.Item>
                        <div className="image-container">
                          <img
                            className="product-image"
                            src="https://via.placeholder.com/800x600?text=No+Image+Available"
                            alt="Placeholder"
                          />
                        </div>
                      </Carousel.Item>
                    )}
                  </Carousel>
                  {barang.gambar && barang.gambar.split(",").length > 1 && (
                    <div className="thumbnail-container">
                      {barang.gambar.split(",").map((img, index) => {
                        const imageName = img.trim();
                        const imageUrl = `http://127.0.0.1:8000/storage/barangs/${imageName}`;
                        return (
                          <button
                            key={index}
                            className={`thumbnail ${
                              activeIndex === index ? "active" : ""
                            }`}
                            onClick={() => setActiveIndex(index)}
                          >
                            <img
                              src={imageUrl}
                              alt={`Thumbnail ${index + 1}`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Col>

              <Col xs={12}>
                <div className="detail-section">
                  <div>
                    <div className="d-flex gap-2 mb-2">
                      <Badge bg="primary" className="px-3 py-2">
                        {barang.subkategori?.kategori?.nama_kategori ||
                          "Kategori"}
                      </Badge>
                      <Badge bg="primary" className="px-3 py-2">
                        {barang.subkategori?.nama_subkategori || "Subkategori"}
                      </Badge>
                    </div>

                    <Card.Title className="product-title mt-3">
                      {barang.nama}
                    </Card.Title>
                  </div>

                  <div className="d-flex align-items-center my-4">
                    <div className="rating-badge me-3">
                      <FaStar className="text-warning me-1" />
                      <span>
                        {barang.penitipan?.penitip?.rating_total?.toFixed(1) ||
                          "0.0"}
                      </span>
                    </div>
                    <div className="text-muted">
                      <FaStore className="me-2" />
                      {barang.penitipan?.penitip?.nama ||
                        "Penitip tidak diketahui"}
                    </div>
                  </div>

                  <div className="price-container">
                    <span className="price-label">Harga:</span>
                    <span className="price-value">
                      Rp {barang.harga.toLocaleString("id-ID")}
                    </span>
                    {barang.tanggal_garansi &&
                      new Date(barang.tanggal_garansi) >= new Date() && (
                        <Badge bg="success" className="ms-3 px-3 py-2">
                          <FaShieldAlt className="me-1" />
                          Bergaransi
                        </Badge>
                      )}
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="specs-container">
                        <ListGroup variant="flush">
                          <ListGroup.Item className="d-flex align-items-center">
                            <FaRulerCombined className="text-primary me-3" />
                            <div>
                              <strong>Ukuran:</strong>{" "}
                              {barang.ukuran || "Tidak tersedia"}
                            </div>
                          </ListGroup.Item>
                          <ListGroup.Item className="d-flex align-items-center">
                            <FaWeightHanging className="text-primary me-3" />
                            <div>
                              <strong>Berat:</strong>{" "}
                              {barang.berat
                                ? `${barang.berat} kg`
                                : "Tidak tersedia"}
                            </div>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="specs-container">
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <div>
                              <strong>Kondisi:</strong>{" "}
                              <Badge
                                bg={
                                  barang.kondisi === "Baru"
                                    ? "success"
                                    : "warning"
                                }
                                className="px-3 py-2 ms-2"
                              >
                                {barang.kondisi || "Tidak diketahui"}
                              </Badge>
                            </div>
                          </ListGroup.Item>
                          {barang.tanggal_garansi && (
                            <ListGroup.Item>
                              <div>
                                <strong>Masa Garansi:</strong>{" "}
                                {new Date(barang.tanggal_garansi) >=
                                new Date() ? (
                                  <span className="text-success">
                                    Sampai{" "}
                                    {new Date(
                                      barang.tanggal_garansi
                                    ).toLocaleDateString("id-ID")}
                                  </span>
                                ) : (
                                  <span className="text-danger">
                                    Garansi telah habis
                                  </span>
                                )}
                              </div>
                            </ListGroup.Item>
                          )}
                        </ListGroup>
                      </div>
                    </Col>
                  </Row>

                  <div className="product-description">
                    <h6 className="description-title">Deskripsi Produk</h6>
                    <p className="description-content">
                      {barang.deskripsi || "Tidak ada deskripsi tersedia."}
                    </p>
                  </div>

                  <div className="d-grid gap-3 d-md-flex action-buttons">
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-grow-1 action-button"
                    >
                      Beli Sekarang
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="flex-grow-1 action-button"
                    >
                      + Keranjang
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DetailBarang;
