const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Menentukan path absolut untuk file database
const dbPath = path.join(__dirname, "../databases/database.db");

// Membuat objek database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err.message);
  } else {
    console.log("Koneksi ke database berhasil");

    // Jalankan perintah-perintah SQL di sini
    db.run(`CREATE TABLE IF NOT EXISTS produk (
      kodeBarang TEXT PRIMARY KEY,
      namaBarang TEXT,
      harga INTEGER,
      quantity INTEGER,
      tanggaL DATETIME
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS keranjang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kodePembelian VARCHAR,
      kodeBarang VARCHAR,
      quantity INTEGER,
      totalHarga INTEGER,
      FOREIGN KEY (kodePembelian) REFERENCES pembelian(kodePembelian),
      FOREIGN KEY (kodeBarang) REFERENCES produk(kodeBarang)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pembelian (
      kodePembelian TEXT PRIMARY KEY,
      totalPembelian INTEGER,
      totalPembayaran INTEGER,
      totalKembalian INTEGER,
      tanggalPembelian TEXT
    )`);

    // Operasikan database di sini
  }
});

// Export objek database
module.exports = db;
