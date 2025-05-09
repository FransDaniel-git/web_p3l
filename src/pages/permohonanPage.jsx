import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchPermohonan } from "../api/permohonanApi";

export default function PermohonanPage() {
  const [permohonans, setPermohonans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchPermohonan();
        setPermohonans(response.data.data || []);
      } catch (err) {
        setError("Gagal memuat data permohonan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePilihBarangDonasi = (idPermohonan) => {
    navigate(`/barang-donasi?permohonan=${idPermohonan}`);
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="shadow-lg p-5 bg-white w-75 h-75 rounded d-flex flex-column">
        <div className="w-100">
          <h1 className="mb-4 text-center" style={{ fontSize: "3rem" }}>
            Daftar Permohonan
          </h1>

          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : error ? (
            <div className="text-danger text-center">{error}</div>
          ) : permohonans.length === 0 ? (
            <div className="text-center text-muted">
              Tidak ada data permohonan.
            </div>
          ) : (
            <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Nama Organisasi</th>
                    <th>Alamat</th>
                    <th>Catatan</th>
                    <th>Dibuat Pada</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {permohonans.map((permohonan) => (
                    <tr key={permohonan.id_permohonan}>
                      <td>
                        {permohonan.penerima?.nama || permohonan.id_organisasi}
                      </td>
                      <td>{permohonan.penerima?.alamat || "-"}</td>
                      <td>{permohonan.catatan}</td>
                      <td>
                        {permohonan.created_at
                          ? new Intl.DateTimeFormat("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                            }).format(new Date(permohonan.created_at))
                          : "-"}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() =>
                            handlePilihBarangDonasi(permohonan.id_permohonan)
                          }
                        >
                          Pilih Barang Donasi
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
