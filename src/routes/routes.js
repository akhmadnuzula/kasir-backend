const express = require("express");
const produkController = require("../controllers/produkController");
const keranjangController = require("../controllers/keranjangController");
const pembelianController = require("../controllers/pembelianController");
const kasirController = require("../controllers/kasirController");

const router = express.Router();

router.get("/produk/", produkController.getAll);
router.get("/produk/:kodeBarang", produkController.getById);
router.post("/produk/", produkController.create);
router.put("/produk/:kodeBarang", produkController.update);
router.delete("/produk/:kodeBarang", produkController.delete);

router.get("/keranjang/", keranjangController.getAll);
router.get("/keranjang/:id", keranjangController.getById);
router.post("/keranjang/", keranjangController.create);
router.put("/keranjang/:id", keranjangController.update);
router.delete("/keranjang/:id", keranjangController.delete);

router.get("/pembelian/", pembelianController.getAll);
router.get("/pembelian/:kodePembelian", pembelianController.getById);
router.post("/pembelian/", pembelianController.create);
router.put("/pembelian/:kodePembelian", pembelianController.update);
router.delete("/pembelian/:kodePembelian", pembelianController.delete);

router.post("/kasir", kasirController.createPembelian);

module.exports = router;
