const db = require("../utils/db");

class ProdukModel {
  static getAll(callback) {
    const query = "SELECT * FROM produk";
    db.all(query, (err, rows) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, rows);
      }
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM produk WHERE kodeBarang = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, row);
      }
    });
  }

  static create(produk, callback) {
    const query =
      "INSERT INTO produk (kodeBarang, namaBarang, harga, quantity, tanggal) VALUES (?, ?, ?, ?, ?)";
    db.run(
      query,
      [
        produk.kodeBarang,
        produk.namaBarang,
        produk.harga,
        produk.quantity,
        produk.tanggal,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        produk.kodeBarang = this.lastID;
        callback(null, produk);
      }
    );
  }

  static update(kodeBarang, produk, callback) {
    const query =
      "UPDATE produk SET namaBarang = ?, harga = ?, quantity = ?, tanggal = ? WHERE kodeBarang = ?";
    db.run(
      query,
      [
        produk.namaBarang,
        produk.harga,
        produk.quantity,
        produk.tanggal,
        kodeBarang,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        if (this.changes === 0) {
          return callback(null, null);
        }
        produk.kodeBarang = kodeBarang;
        callback(null, produk);
      }
    );
  }

  static delete(kodeBarang, callback) {
    const query = "DELETE FROM produk WHERE kodeBarang = ?";
    db.run(query, [kodeBarang], function (err) {
      if (err) {
        return callback(err, null);
      }
      if (this.changes === 0) {
        return callback(null, null);
      }
      callback(null, true);
    });
  }
}

module.exports = ProdukModel;
