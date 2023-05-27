const Keranjang = require("../models/keranjangModel");

exports.getAll = (req, res) => {
  Keranjang.getAll((err, keranjang) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    res.json(keranjang);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Keranjang.getById(id, (err, keranjang) => {
    if (err) {
      console.log(err);
      return res.sattus(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!keranjang) {
      return res.status(400).json({ error: "keranjang tidak ditemukan" });
    }
    res.json(keranjang);
  });
};

exports.create = (req, res) => {
  const { kodePembelian, kodeBarang, quantity, totalHarga } = req.body;
  const newData = { kodePembelian, kodeBarang, quantity, totalHarga };
  Keranjang.create(newData, (err, keranjang) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    res.status(201).json(keranjang);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const { kodePembelian, kodeBarang, quantity, totalHarga } = req.body;
  const updateData = { kodePembelian, kodeBarang, quantity, totalHarga };
  Keranjang.update(id, updateData, (err, keranjang) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!keranjang) {
      return res.status(404).json({ error: "keranjang tidak ditemukan" });
    }
    res.json(keranjang);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Keranjang.delete(id, (err, keranjang) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!keranjang) {
      return res.status(404).json({ error: "keranjang tidak ditemukan" });
    }
    res.json({ message: "keranjang berhasil dihapus" });
  });
};
