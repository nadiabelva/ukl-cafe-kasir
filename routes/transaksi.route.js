const express = require(`express`);
const app = express();
app.use(express.json());
const transaksiController = require(`../controllers/transaksi.controller`);
const auth = require(`../auth`);

app.get("/", auth, transaksiController.getAllTransaksi);
app.post("/add", auth, transaksiController.addTransaksi);
app.post("/find", auth, transaksiController.findTransaksi);
app.put("/:id", auth, transaksiController.updateTransaksi);
app.delete("/:id", auth, transaksiController.deleteTransaksi);
module.exports = app;
