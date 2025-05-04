import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  fetchPegawai,
  createPegawai,
  updatePegawai,
  deletePegawai,
} from "../api/pegawaiApi";
import PegawaiForm from "../components/PegawaiForm";

const ManagePegawai = () => {
  const [pegawais, setPegawais] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPegawai, setCurrentPegawai] = useState(null);
  const [modalTitle, setModalTitle] = useState("Tambah Pegawai");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pegawaiToDelete, setPegawaiToDelete] = useState(null);

  const loadPegawais = useCallback(async () => {
    try {
      const response = await fetchPegawai(searchQuery);
      if (response && response.data) {
        setPegawais(response.data.data);
      }
    } catch (error) {
      console.error("Error loading pegawais:", error);
      toast.error("Gagal memuat data pegawai");
    }
  }, [searchQuery]);

  useEffect(() => {
    loadPegawais();
  }, [loadPegawais]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  const handleAdd = () => {
    setCurrentPegawai(null);
    setModalTitle("Tambah Pegawai");
    setShowModal(true);
  };

  const handleEdit = (pegawai) => {
    setCurrentPegawai(pegawai);
    setModalTitle("Edit Pegawai");
    setShowModal(true);
  };

  const confirmDelete = (pegawai) => {
    setPegawaiToDelete(pegawai);
    setShowDeleteModal(true);
  };

  const executeDelete = async () => {
    if (pegawaiToDelete) {
      try {
        await deletePegawai(pegawaiToDelete.id_pegawai);
        setShowDeleteModal(false);
        setPegawaiToDelete(null);
        toast.success("Pegawai berhasil dihapus");
        loadPegawais();
      } catch (error) {
        console.error("Error deleting pegawai:", error);
        toast.error("Gagal menghapus pegawai");
      }
    }
  };

  const handleSubmit = async (pegawaiData) => {
    try {
      if (currentPegawai) {
        await updatePegawai({ ...currentPegawai, ...pegawaiData });
        toast.success("Data pegawai berhasil diperbarui");
      } else {
        await createPegawai(pegawaiData);
        toast.success("Pegawai berhasil ditambahkan");
      }
      setShowModal(false);
      loadPegawais();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        if (errors.email) {
          toast.error("Email telah digunakan.");
        } else {
          toast.error("Gagal menyimpan data pegawai");
        }
      } else {
        toast.error("Gagal menyimpan data pegawai");
      }
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div className="shadow-lg p-5 bg-white w-75 h-75 rounded">
        <div className="w-100">
          <h1 className="mb-4 text-center" style={{ fontSize: "3rem" }}>
            Manage Pegawai
          </h1>

          <div className="row mb-3">
            <div className="col-md-6">
              <Form onSubmit={handleSearch} className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Cari berdasarkan nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="me-2"
                />
                <Button variant="primary" type="submit">
                  Cari
                </Button>
              </Form>
            </div>
            <div className="col-md-6 text-end">
              <Button variant="success" onClick={handleAdd}>
                Tambah Pegawai
              </Button>
            </div>
          </div>

          <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID Pegawai</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Tanggal Lahir</th>
                  <th>No. Telp</th>
                  <th>ID Jabatan</th>
                  <th>Nama Jabatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pegawais.length > 0 ? (
                  pegawais.map((pegawai) => (
                    <tr key={pegawai.id_pegawai}>
                      <td>{pegawai.id_pegawai}</td>
                      <td>{pegawai.nama}</td>
                      <td>{pegawai.email}</td>
                      <td>{pegawai.tanggal_lahir}</td>
                      <td>{pegawai.noTelp}</td>
                      <td>{pegawai.id_jabatan}</td>
                      <td>{pegawai.jabatan?.nama_jabatan || "-"}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdit(pegawai)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => confirmDelete(pegawai)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Tidak ada data pegawai
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PegawaiForm pegawai={currentPegawai} onSubmit={handleSubmit} />
            </Modal.Body>
          </Modal>

          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Konfirmasi Hapus</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Apakah Anda yakin ingin menghapus pegawai{" "}
              <strong>{pegawaiToDelete?.nama}</strong>?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </Button>
              <Button variant="danger" onClick={executeDelete}>
                Hapus
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManagePegawai;
