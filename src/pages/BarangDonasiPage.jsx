import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  InputGroup,
  Badge,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchBarangDonasi } from "../api/barangDonasiApi";
import { fetchKategoris } from "../api/kategoriApi";
import { fetchSubkategoris } from "../api/subkategoriApi";
import { IoMdSearch } from "react-icons/io";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BarangDonasiPage = () => {
  const query = useQuery();
  const permohonanId = query.get("permohonan");
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [subkategori, setSubkategori] = useState("");
  const [kategoris, setKategoris] = useState([]);
  const [subkategoris, setSubkategoris] = useState([]);
  const [barangDonasis, setBarangDonasis] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef(search);

  useEffect(() => {
    searchRef.current = search;
  }, [search]);

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
    const loadBarangDonasi = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchRef.current) params.search = searchRef.current;
        if (kategori) params.kategori = kategori;
        if (subkategori) params.subkategori = subkategori;
        const res = await fetchBarangDonasi(params);
        setBarangDonasis(res.data.data);
      } catch (error) {
        console.error("Gagal load barang donasi", error);
      }
      setLoading(false);
    };
    loadBarangDonasi();
  }, [kategori, subkategori]);

  const handleCariClick = () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (kategori) params.kategori = kategori;
    if (subkategori) params.subkategori = subkategori;
    fetchBarangDonasi(params)
      .then((res) => setBarangDonasis(res.data.data))
      .catch((error) => console.error("Gagal load barang donasi", error))
      .finally(() => setLoading(false));
  };

  const handleResetFilter = () => {
    setSearch("");
    setKategori("");
    setSubkategori("");
  };

  return (
    <>
      <style>
        {`
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
          height: 210px;
          object-fit: cover;
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
        `}
      </style>
      <Container fluid className="py-4 px-2 px-md-5">
        <h1 className="mb-4 text-center">Daftar Barang Donasi</h1>
        {permohonanId && (
          <p className="text-center">
            Menampilkan barang donasi untuk permohonan ID:{" "}
            <strong>{permohonanId}</strong>
          </p>
        )}
        <Row className="g-5">
          {/* Sidebar Filter */}
          <Col xs={12} md={4} lg={3} className="mb-4">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Filter</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Cari Nama Barang</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Cari barang..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleCariClick}>
                      <IoMdSearch />
                    </Button>
                  </InputGroup>
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
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={handleResetFilter}
                >
                  Reset Filter
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* Daftar Barang Donasi */}
          <Col xs={12} md={8} lg={9}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : barangDonasis.length === 0 ? (
              <p className="text-center text-secondary fs-5">
                Tidak ada barang donasi ditemukan.
              </p>
            ) : (
              <Row xs={1} sm={2} md={2} lg={3} className="g-4">
                {barangDonasis.map((barang) => (
                  <Col key={barang.id_barang_donasi}>
                    <Card
                      className="h-100 d-flex flex-column barang-card"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/barang-donasi/${barang.id_barang_donasi}?permohonan=${permohonanId}`
                        )
                      }
                    >
                      <Card.Img
                        variant="top"
                        src={
                          barang.gambar
                            ? `http://127.0.0.1:8000/storage/barang_donasis/${barang.gambar
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
                        <Card.Title as="h5" className="mb-2">
                          {barang.nama}
                        </Card.Title>
                        <div
                          className="mb-1 text-muted"
                          style={{ fontSize: "0.95em" }}
                        >
                          Ukuran: {barang.ukuran || "-"}
                        </div>
                        <div
                          className="mb-1 text-muted"
                          style={{ fontSize: "0.95em" }}
                        >
                          Berat: {barang.berat || "-"} kg
                        </div>
                        <div
                          className="mb-1 text-muted"
                          style={{ fontSize: "0.95em" }}
                        >
                          Status:{" "}
                          {barang.status_donasi == 0
                            ? "Tersedia"
                            : "Tidak Tersedia"}
                        </div>
                        <Card.Text
                          className="mt-2"
                          style={{ fontSize: "0.95em" }}
                        >
                          {barang.deskripsi}
                        </Card.Text>
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

export default BarangDonasiPage;
