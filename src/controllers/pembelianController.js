const Pembelian = require("../models/pembelianModel");

exports.getAll = (req, res) => {
  Pembelian.getAll((err, pembelian) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    res.json(pembelian);
  });
};

exports.getById = (req, res) => {
  const kodePembelian = req.params.kodePembelian;
  Pembelian.getById(kodePembelian, (err, pembelian) => {
    if (err) {
      console.log(err);
      return res.sattus(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!pembelian) {
      return res.status(400).json({ error: "pembelian tidak ditemukan" });
    }
    res.json(pembelian);
  });
};

exports.create = (req, res) => {
  const {
    kodePembelian,
    totalPembelian,
    totalPembayaran,
    totalKembalian,
    tanggalPembelian,
  } = req.body;
  const newData = {
    kodePembelian,
    totalPembelian,
    totalPembayaran,
    totalKembalian,
    tanggalPembelian,
  };
  Pembelian.create(newData, (err, pembelian) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Silahkan create ulang invoice" });
    }
    res.status(201).json(pembelian);
  });
};

exports.update = (req, res) => {
  const kodePembelian = req.params.kodePembelian;
  const { totalPembelian, totalPembayaran, totalKembalian, tanggalPembelian } =
    req.body;
  const updateData = {
    totalPembelian,
    totalPembayaran,
    totalKembalian,
    tanggalPembelian,
  };
  Pembelian.update(kodePembelian, updateData, (err, pembelian) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!pembelian) {
      return res.status(404).json({ error: "pembelian tidak ditemukan" });
    }
    res.json(pembelian);
  });
};

exports.delete = (req, res) => {
  const kodePembelian = req.params.kodePembelian;
  Pembelian.delete(kodePembelian, (err, pembelian) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!pembelian) {
      return res.status(404).json({ error: "pembelian tidak ditemukan" });
    }
    res.json({ message: "pembelian berhasil dihapus" });
  });
};
