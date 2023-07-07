const Keranjang = require("../models/keranjangModel");
const Pembelian = require("../models/pembelianModel");
const Produk = require("../models/produkModel");

exports.createPembelian = async (req, res) => {
  const { pembelian, keranjang } = req.body;
  if (keranjang.length > 0) {
    await Pembelian.create(pembelian, (err, pembelian) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Silahkan create ulang invoice" });
      }
    });
    for (let i = 0; i < keranjang.length; i++) {
      const newData = keranjang[i];
      await Keranjang.create(newData, (err, keranjang) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ error: "Silahkan create ulang invoice" });
        }
      });
      await Produk.getById(newData.kodeBarang, async (err, produk) => {
        if (!err) {
          const updateData = {
            namaBarang: produk.namaBarang,
            harga: produk.harga,
            quantity: Number(produk.quantity) - Number(newData.quantity),
          };
          await Produk.update(
            newData.kodeBarang,
            updateData,
            (err, success) => {
              console.log(err);
              console.log(success);
            }
          );
        }
      });
    }
  }
  res.status(201).json({ message: "Saved" });
};
