const Keranjang = require("../models/keranjangModel");
const Pembelian = require("../models/pembelianModel");

exports.createPembelian = (req, res) => {
  const { pembelian, keranjang } = req.body;
  console.log(pembelian);
  console.log(keranjang);
  if (keranjang.length > 0) {
    Pembelian.create(pembelian, (err, pembelian) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Silahkan create ulang invoice" });
      }
    });
    for (let i = 0; i < keranjang.length; i++) {
      const newData = keranjang[i];
      Keranjang.create(newData, (err, keranjang) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Silahkan create ulang invoice" });
        }
      });
    }
  }
  res.status(201).json({ message: "Saved" });
};
