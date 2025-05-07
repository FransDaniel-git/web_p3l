import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Image,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { fetchBarang } from "../api/barangApi";
import { fetchKategoris } from "../api/kategoriApi";
import { fetchSubkategoris } from "../api/subkategoriApi";
import logo from "../assets/logo_reusemart_big.png";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaShieldAlt } from "react-icons/fa";

const BarangPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const [search, setSearch] = useState("");
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const [kategori, setKategori] = useState("");
  const [subkategori, setSubkategori] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [garansi, setGaransi] = useState(false);

  const [kategoris, setKategoris] = useState([]);
  const [subkategoris, setSubkategoris] = useState([]);
  const [barangs, setBarangs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(search);
  const navigate = useNavigate();

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setUserName(sessionStorage.getItem("userName") || "User");
      setUserPhoto(
        sessionStorage.getItem("userPhoto") || "https://via.placeholder.com/40"
      );
    }
  }, []);

  useEffect(() => {
    const loadKategoris = async () => {
      try {
        const res = await fetchKategoris();
        setKategoris(res.data.data);
      } catch (error) {
        console.error("Gagal load kategori", error);
      }
    };
    loadKategoris();
  }, []);

  useEffect(() => {
    const loadSubkategoris = async () => {
      if (!kategori) {
        setSubkategoris([]);
        setSubkategori("");
        return;
      }
      try {
        const res = await fetchSubkategoris(kategori);
        setSubkategoris(res.data.data);
      } catch (error) {
        console.error("Gagal load subkategori", error);
      }
    };
    loadSubkategoris();
  }, [kategori]);

  useEffect(() => {
    const loadBarang = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchRef.current) params.search = searchRef.current;
        if (hargaMin) params.harga_min = hargaMin;
        if (hargaMax) params.harga_max = hargaMax;
        if (kategori) params.kategori = kategori;
        if (subkategori) params.subkategori = subkategori;
        if (ratingMin) params.rating_min = ratingMin;
        if (garansi) params.garansi = "ada";

        const res = await fetchBarang(params);
        setBarangs(res.data.data);
      } catch (error) {
        console.error("Gagal load barang", error);
      }
      setLoading(false);
    };
    loadBarang();
  }, [hargaMin, hargaMax, kategori, subkategori, ratingMin, garansi]);

  const handleCariClick = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (hargaMin) params.harga_min = hargaMin;
    if (hargaMax) params.harga_max = hargaMax;
    if (kategori) params.kategori = kategori;
    if (subkategori) params.subkategori = subkategori;
    if (ratingMin) params.rating_min = ratingMin;
    if (garansi) params.garansi = "ada";
    fetchBarang(params)
      .then((res) => setBarangs(res.data.data))
      .catch((error) => console.error("Gagal load barang", error))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  const handleClickDetail = (barang) => {
    navigate(`/barang/${barang.kode_barang}`);
  };

  return (
    <>
      <style>
        {`
        .custom-placeholder::placeholder {
          color: #555555;
          opacity: 1;
        }
        .barang-card {
          transition: box-shadow 0.25s, transform 0.2s;
          border: none;
          background: #f8fafc;
        }
        .barang-card:hover {
          box-shadow: 0 2px 32px #0d6efd33, 0 2px 8px #888888;
          transform: translateY(-6px) scale(1.025);
          z-index: 2;
          background: #fff;
        }
        .barang-card .card-img-top {
          border-radius: 6px 6px 0 0;
          border-bottom: 1px solid #f1f1f1;
        }
        .barang-card h6, .barang-card h5 {
          font-family: 'Segoe UI', 'Arial', sans-serif;
        }
        .badge-kategori {
          background: #e0f0ff;
          color: #1976d2;
          font-weight: 600;
          margin-right: 0.5em;
        }
        .badge-subkategori {
          background: #f3f3f3;
          color: #444;
          font-weight: 600;
        }
        .card-body .harga {
          color: #0d6efd;
          font-size: 1.2em;
          font-weight: bold;
        }
        .card-body .rating {
          font-size: 1em;
          color: #ffb400;
        }
        .card-body .text-muted {
          font-size: 0.95em;
        }
        .barang-card .card-body {
          border-radius: 0 0 6px 6px;
        }
        .card-img-top {
          transition: filter 0.2s;
        }
        .barang-card:hover .card-img-top {
          filter: brightness(1.05) saturate(1.2);
        }
        .barang-card {
            cursor: pointer;
            border: 1px solid #dee2e6;
            border-radius: 6px;
            background-color: #fff;
            transition: box-shadow 0.25s, transform 0.2s;
        }
        .barang-card .card-img-top {
            height: 210px;
            object-fit: cover;
            border-radius: 6px 6px 0 0;
            border-bottom: 1px solid #dee2e6;
        }
        .barang-card .card-body {
            border-radius: 0 0 6px 6px;
        }
        `}
      </style>

      <Navbar bg="primary" data-bs-theme="dark">
        <Container
          fluid
          className="d-flex flex-wrap align-items-center justify-content-between px-2 px-md-4 py-2"
        >
          <div className="d-flex align-items-center mb-2 mb-md-0">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="me-2"
              style={{ objectFit: "contain" }}
            />
            <Navbar.Brand href="#" className="text-white">
              <h1 style={{ fontSize: "1.5rem" }}>ReuseMart</h1>
            </Navbar.Brand>
          </div>
          <Form
            className="d-flex mx-2 flex-grow-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup size="lg" className="w-75 mx-auto">
              <Form.Control
                type="text"
                placeholder="Cari barang..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-light text-dark border border-secondary custom-placeholder rounded-start-pill"
              />
              <Button
                variant="light"
                onClick={handleCariClick}
                className="border border-secondary rounded-end-pill"
              >
                <IoMdSearch size={30} />
              </Button>
            </InputGroup>
          </Form>
          <Nav className="d-flex align-items-center mb-2 mb-md-0">
            {!isLoggedIn ? (
              <>
                <Button
                  size="lg"
                  variant="outline-light"
                  className="me-2"
                  onClick={() => alert("Daftar")}
                >
                  Daftar
                </Button>
                <Button
                  size="lg"
                  variant="light"
                  onClick={() => alert("Masuk")}
                >
                  Masuk
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="lg"
                  variant="outline-success"
                  className="me-3"
                  onClick={() => alert("Keranjang")}
                >
                  Keranjang
                </Button>
                <Image
                  src={userPhoto}
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                  alt="Profil"
                  style={{ border: "2px solid white" }}
                />
                <span className="me-2 text-white">{userName}</span>
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Container fluid className="py-4 px-2 px-md-5">
        <Row className="g-5">
          <Col xs={12} md={4} lg={3} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Minimal</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="10000"
                    min={0}
                    value={hargaMin}
                    onChange={(e) => setHargaMin(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Harga Maksimal</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="100000"
                    min={0}
                    value={hargaMax}
                    onChange={(e) => setHargaMax(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kategori</Form.Label>
                  <Form.Select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                  >
                    <option value="">-- Pilih Kategori --</option>
                    {kategoris.map((kat) => (
                      <option key={kat.id_kategori} value={kat.id_kategori}>
                        {kat.nama_kategori}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Subkategori</Form.Label>
                  <Form.Select
                    value={subkategori}
                    onChange={(e) => setSubkategori(e.target.value)}
                    disabled={!subkategoris.length}
                  >
                    <option value="">-- Pilih Subkategori --</option>
                    {subkategoris.map((sub) => (
                      <option
                        key={sub.id_subkategori}
                        value={sub.id_subkategori}
                      >
                        {sub.nama_subkategori}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating Penitip Minimal</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="1.0 - 5.0"
                    min={0}
                    max={5}
                    step={0.1}
                    value={ratingMin}
                    onChange={(e) => setRatingMin(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Barang Bergaransi"
                    checked={garansi}
                    onChange={(e) => setGaransi(e.target.checked)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={8} lg={9}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : barangs.length === 0 ? (
              <p className="text-center text-secondary fs-5">
                Tidak ada barang ditemukan.
              </p>
            ) : (
              <Row xs={1} sm={2} md={2} lg={3} className="g-4">
                {barangs.map((barang) => (
                  <Col key={barang.kode_barang}>
                    <Card
                      className="h-100 d-flex flex-column barang-card"
                      onClick={() => handleClickDetail(barang)}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          barang.gambar
                            ? `http://127.0.0.1:8000/storage/barangs/${barang.gambar
                                .split(",")[0]
                                .trim()}`
                            : "https://via.placeholder.com/200x150"
                        }
                        className="card-img-top"
                      />
                      <Card.Body className="d-flex flex-column">
                        <div className="mb-2">
                          {barang.subkategori?.kategori?.nama_kategori && (
                            <span className="badge badge-kategori">
                              {barang.subkategori.kategori.nama_kategori}
                            </span>
                          )}
                          {barang.subkategori?.nama_subkategori && (
                            <span className="badge badge-subkategori">
                              {barang.subkategori.nama_subkategori}
                            </span>
                          )}
                        </div>
                        <h6 className="mb-2" style={{ fontWeight: 700 }}>
                          {barang.nama}
                        </h6>
                        <div className="harga mb-2">
                          Rp {barang.harga.toLocaleString("id-ID")}
                        </div>
                        <div className="mb-2 d-flex align-items-center">
                          <span className="text-muted me-1">Penitip:</span>
                          <FaStar className="rating me-1" size={16} />
                          <span style={{ fontWeight: 500 }}>
                            {barang.penitipan?.penitip?.rating_total?.toFixed(
                              1
                            ) || "-"}
                          </span>
                        </div>
                        {barang.tanggal_garansi &&
                          new Date(barang.tanggal_garansi) >= new Date() && (
                            <Badge
                              bg="success"
                              className="w-50 text-center my-2"
                            >
                              <FaShieldAlt className="me-1" />
                              Bergaransi
                            </Badge>
                          )}
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BarangPage;
