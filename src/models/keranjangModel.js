const db = require("../utils/db");

class KeranjangModel {
  static getAll(callback) {
    const query = "SELECT * FROM keranjang";
    db.all(query, (err, rows) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, rows);
      }
    });
  }

  static getById(id, callback) {
    const query = "SELECT * FROM keranjang WHERE id = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, row);
      }
    });
  }

  static create(keranjang, callback) {
    const query =
      "INSERT INTO keranjang (id, kodePembelian, kodeBarang, quantity, totalHarga) VALUES (?, ?, ?, ?, ?)";
    db.run(
      query,
      [
        keranjang.id,
        keranjang.kodePembelian,
        keranjang.kodeBarang,
        keranjang.quantity,
        keranjang.totalHarga,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        keranjang.id = this.lastID;
        callback(null, keranjang);
      }
    );
  }

  static update(id, keranjang, callback) {
    console.log(id);
    const query =
      "UPDATE keranjang SET kodePembelian = ?, kodeBarang = ?, quantity = ?, totalHarga = ? WHERE id = ?";
    db.run(
      query,
      [
        keranjang.kodePembelian,
        keranjang.kodeBarang,
        keranjang.quantity,
        keranjang.totalHarga,
        id,
      ],
      function (err) {
        if (err) {
          return callback(err, null);
        }
        if (this.changes === 0) {
          return callback(null, null);
        }
        keranjang.id = id;
        callback(null, keranjang);
      }
    );
  }

  static delete(id, callback) {
    const query = "DELETE FROM keranjang WHERE id = ?";
    db.run(query, [id], function (err) {
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

module.exports = KeranjangModel;
