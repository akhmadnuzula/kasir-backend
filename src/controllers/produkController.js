const Produk = require("../models/produkModel");

exports.getAll = (req, res) => {
  Produk.getAll((err, produk) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    res.json(produk);
  });
};

exports.getById = (req, res) => {
  const kodeBarang = req.params.kodeBarang;
  Produk.getById(kodeBarang, (err, produk) => {
    if (err) {
      console.log(err);
      return res.sattus(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!produk) {
      return res.status(400).json({ error: "Produk tidak ditemukan" });
    }
    res.json(produk);
  });
};

exports.create = (req, res) => {
  const { kodeBarang, namaBarang, harga, quantity, tanggal } = req.body;
  const newData = { kodeBarang, namaBarang, harga, quantity, tanggal };
  Produk.create(newData, (err, produk) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    res.status(201).json(produk);
  });
};

exports.update = (req, res) => {
  const kodeBarang = req.params.kodeBarang;
  const { namaBarang, harga, quantity, tanggal } = req.body;
  const updateData = { namaBarang, harga, quantity, tanggal };
  Produk.update(kodeBarang, updateData, (err, produk) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    res.json(produk);
  });
};

exports.delete = (req, res) => {
  const kodeBarang = req.params.kodeBarang;
  Produk.delete(kodeBarang, (err, produk) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
    if (!produk) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }
    res.json({ message: "Produk berhasil dihapus" });
  });
};
