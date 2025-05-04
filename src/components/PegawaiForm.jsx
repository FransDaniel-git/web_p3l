import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PegawaiForm = ({ pegawai, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    tanggal_lahir: "",
    noTelp: "",
    id_jabatan: "",
  });

  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (pegawai) {
      setFormData({
        nama: pegawai.nama || "",
        email: pegawai.email || "",
        password: "",
        tanggal_lahir: pegawai.tanggal_lahir || "",
        noTelp: pegawai.noTelp || "",
        id_jabatan: pegawai.id_jabatan || "",
      });
    }
  }, [pegawai]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      onSubmit(formData);
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nama</Form.Label>
        <Form.Control
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Nama wajib diisi.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Masukkan email yang valid.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <FormControl
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!pegawai}
            minLength={8}
            placeholder={pegawai ? "Kosongkan jika tidak ingin mengubah" : ""}
            aria-label="Password"
          />
          <Button
            variant="outline-dark"
            onClick={toggleShowPassword}
            type="button"
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: "0.4rem",
              borderBottomRightRadius: "0.4rem",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {pegawai
              ? "Password minimal 8 karakter jika ingin diubah."
              : "Password minimal 8 karakter."}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Tanggal Lahir</Form.Label>
        <Form.Control
          type="date"
          name="tanggal_lahir"
          value={formData.tanggal_lahir}
          onChange={handleChange}
          required
        />
        <Form.Control.Feedback type="invalid">
          Tanggal lahir wajib diisi.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>No. Telp</Form.Label>
        <Form.Control
          type="text"
          name="noTelp"
          value={formData.noTelp}
          onChange={handleChange}
          required
          pattern="^\d{10,13}$"
          placeholder="Masukkan nomor telepon 10-13 digit"
        />
        <Form.Control.Feedback type="invalid">
          No. Telp harus terdiri dari 10 hingga 13 digit angka.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Jabatan</Form.Label>
        <Form.Select
          name="id_jabatan"
          value={formData.id_jabatan}
          onChange={handleChange}
          required
        >
          <option value="">Pilih Jabatan</option>
          <option value="1">Customer Service</option>
          <option value="2">Gudang</option>
          <option value="3">Hunter</option>
          <option value="4">Kurir</option>
          <option value="5">Owner</option>
          <option value="6">Admin</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Jabatan wajib dipilih.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Simpan
      </Button>
    </Form>
  );
};

export default PegawaiForm;
