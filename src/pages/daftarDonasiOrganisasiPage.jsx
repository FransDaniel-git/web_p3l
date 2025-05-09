import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Spinner,
  Alert,
  Card,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import {
  fetchAllOrganisasi,
  fetchDonasiByOrganisasi,
  updateDonasiBarang,
} from "../api/organisasiApi";
import { toast } from "react-toastify";

const DaftarDonasiOrganisasiPage = () => {
  const [organisasiList, setOrganisasiList] = useState([]);
  const [selectedOrganisasi, setSelectedOrganisasi] = useState("");
  const [donasiData, setDonasiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State untuk modal edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    id_donasi_barang: null,
    tanggal_donasi: "",
    nama_penerima: "",
    status_barang: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [editError, setEditError] = useState(null);

  const renderStatusDonasi = (status) => {
    return status === 1 ? (
      <Badge bg="success">Didonasikan</Badge>
    ) : (
      <Badge bg="warning">Belum Didonasikan</Badge>
    );
  };

  // Load semua organisasi saat komponen mount
  useEffect(() => {
    const loadOrganisasi = async () => {
      setLoading(true);
      try {
        const response = await fetchAllOrganisasi();
        setOrganisasiList(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrganisasi();
  }, []);

  // Load donasi ketika organisasi dipilih
  useEffect(() => {
    if (selectedOrganisasi) {
      const loadDonasi = async () => {
        setLoading(true);
        try {
          const response = await fetchDonasiByOrganisasi(selectedOrganisasi);
          setDonasiData(response.data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setDonasiData(null);
        } finally {
          setLoading(false);
        }
      };

      loadDonasi();
    }
  }, [selectedOrganisasi]);

  const handleOrganisasiChange = (e) => {
    setSelectedOrganisasi(e.target.value);
  };

  // Fungsi untuk membuka modal edit
  const handleShowEditModal = (donasi) => {
    setEditData({
      id_donasi_barang: donasi.id_donasi_barang,
      tanggal_donasi: donasi.tanggal_donasi.replace(" ", "T").slice(0, 16),
      nama_penerima: donasi.nama_penerima,
      status_barang: donasi.barang.status_donasi.toString(),
    });
    setShowEditModal(true);
    setEditError(null);
  };

  // Fungsi untuk menutup modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({
      id_donasi_barang: null,
      tanggal_donasi: "",
      nama_penerima: "",
      status_barang: "",
    });
  };

  // Fungsi untuk menangani perubahan input
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi untuk menyimpan perubahan
  const handleSaveEdit = async () => {
    setIsUpdating(true);
    setEditError(null);

    try {
      // Format payload
      const payload = {};
      if (editData.tanggal_donasi)
        payload.tanggal_donasi = editData.tanggal_donasi.replace("T", " ");
      if (editData.nama_penerima)
        payload.nama_penerima = editData.nama_penerima;
      if (editData.status_barang !== "")
        payload.status_barang = parseInt(editData.status_barang);

      // Jika tidak ada yang diupdate
      if (Object.keys(payload).length === 0) {
        setEditError("Harap isi setidaknya satu field untuk diupdate");
        return;
      }

      await updateDonasiBarang(editData.id_donasi_barang, payload);

      // Refresh data setelah update
      const response = await fetchDonasiByOrganisasi(selectedOrganisasi);
      setDonasiData(response.data);
      setShowEditModal(false);
      toast.success("Data donasi berhasil diperbarui");
    } catch (err) {
      console.error("Gagal mengupdate donasi:", err);
      setEditError(
        err.response?.data?.message || "Gagal mengupdate data donasi"
      );
      toast.error("Gagal mengupdate data donasi");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Container className="py-4">
      {/* Modal Edit */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data Donasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editError && (
            <Alert variant="danger" className="mb-3">
              {editError}
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tanggal Donasi</Form.Label>
              <Form.Control
                type="datetime-local"
                name="tanggal_donasi"
                value={editData.tanggal_donasi}
                onChange={handleEditChange}
              />
              <Form.Text className="text-muted">
                Kosongkan jika tidak ingin mengubah tanggal
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nama Penerima</Form.Label>
              <Form.Control
                type="text"
                name="nama_penerima"
                value={editData.nama_penerima}
                onChange={handleEditChange}
                placeholder="Nama penerima donasi"
              />
              <Form.Text className="text-muted">
                Kosongkan jika tidak ingin mengubah nama
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status Barang</Form.Label>
              <Form.Select
                name="status_barang"
                value={editData.status_barang}
                onChange={handleEditChange}
              >
                <option value="">
                  -- Pilih Status (kosongkan jika tidak diubah) --
                </option>
                <option value="0">Belum Didonasikan</option>
                <option value="1">Didonasikan</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseEditModal}
            disabled={isUpdating}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveEdit}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="ms-2">Menyimpan...</span>
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <h1 className="mb-4 text-center">Daftar Donasi Organisasi</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-4">
            <Form.Label>Pilih Organisasi</Form.Label>
            <Form.Select
              value={selectedOrganisasi}
              onChange={handleOrganisasiChange}
              disabled={loading}
            >
              <option value="">-- Pilih Organisasi --</option>
              {organisasiList.map((org) => (
                <option key={org.id_organisasi} value={org.id_organisasi}>
                  {org.nama} - {org.alamat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Memuat data...</p>
        </div>
      )}

      {donasiData && (
        <Card className="shadow-sm">
          <Card.Body>
            <Row className="mb-3">
              <Col>
                <h4>Organisasi: {donasiData.organisasi.nama}</h4>
                <p>Total Donasi: {donasiData.total_donasi}</p>
              </Col>
            </Row>

            <Table striped bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Penerima</th>
                  <th>Nama Barang</th>
                  <th>Status Barang</th>
                  <th>Kategori</th>
                  <th>Subkategori</th>
                  <th>Tanggal Donasi</th>
                  <th>Catatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {donasiData.daftar_donasi.map((donasi, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{donasi.nama_penerima}</td>
                    <td>{donasi.barang.nama}</td>
                    <td>{renderStatusDonasi(donasi.barang.status_donasi)}</td>
                    <td>{donasi.barang.kategori}</td>
                    <td>{donasi.barang.subkategori}</td>
                    <td>{donasi.tanggal_donasi}</td>
                    <td>{donasi.catatan_permohonan}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleShowEditModal(donasi)}
                        disabled={loading}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {donasiData && donasiData.daftar_donasi.length === 0 && (
        <Alert variant="info" className="mt-3">
          Tidak ada data donasi untuk organisasi ini.
        </Alert>
      )}
    </Container>
  );
};

export default DaftarDonasiOrganisasiPage;
