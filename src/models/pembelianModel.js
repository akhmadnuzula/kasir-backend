const db = require("../utils/db");

class PembelianModel {
  static getAll(callback) {
    const query = "SELECT * FROM pembelian";
    db.all(query, (err, rows) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, rows);
      }
    });
  }

  static getById(kodePembelian, callback) {
    const query = "SELECT * FROM pembelian WHERE kodePembelian = ?";
    db.get(query, [kodePembelian], (err, row) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, row);
      }
    });
  }

  static create(pembelian, callback) {
    const query =
      "INSERT INTO pembelian (kodePembelian, kodePembelian, totalPembayaran, totalKembalian, tanggalPembelian) VALUES (?, ?, ?, ?, ?)";
    db.run(
      query,
      [
        pembelian.kodePembelian,
        pembelian.kodePembelian,
        pembelian.totalPembayaran,
        pembelian.totalKembalian,
        pembelian.tanggalPembelian,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        pembelian.kodePembelian = this.lastID;
        callback(null, pembelian);
      }
    );
  }

  static update(kodePembelian, pembelian, callback) {
    const query =
      "UPDATE pembelian SET totalPembelian = ?, totalPembayaran = ?, totalKembalian = ?, tanggalPembelian = ? WHERE kodePembelian = ?";
    db.run(
      query,
      [
        pembelian.totalPembelian,
        pembelian.totalPembayaran,
        pembelian.totalKembalian,
        pembelian.tanggalPembelian,
        kodePembelian,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        if (this.changes === 0) {
          return callback(null, null);
        }
        pembelian.kodePembelian = kodePembelian;
        callback(null, pembelian);
      }
    );
  }

  static delete(kodePembelian, callback) {
    const query = "DELETE FROM pembelian WHERE kodePembelian = ?";
    db.run(query, [kodePembelian], function (err) {
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

module.exports = PembelianModel;
