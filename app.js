const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const app = express();
const db = new sqlite3.Database("./db/init.db");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/produk", (req, res) => {
  db.all(
    "SELECT * FROM produk JOIN stok ON produk.id = stok.produk_id",
    (err, rows) => {
      res.render("produk", { produk: rows });
    }
  );
});
app.get("/pembelian", (req, res) => {
  db.all(
    "SELECT pembelian.*, produk.nama FROM pembelian JOIN produk ON pembelian.produk_id = produk.id",
    (err, rows) => {
      db.all("SELECT * FROM produk", (err2, produk) => {
        res.render("pembelian", { pembelian: rows, produk });
      });
    }
  );
});
app.post("/pembelian", (req, res) => {
  const { produk_id, jumlah } = req.body;
  const tanggal = new Date().toISOString();
  db.run(
    "INSERT INTO pembelian (produk_id, jumlah, tanggal) VALUES (?, ?, ?)",
    [produk_id, jumlah, tanggal],
    () => {
      db.run(
        "UPDATE stok SET jumlah = jumlah - ? WHERE produk_id = ?",
        [jumlah, produk_id],
        () => {
          res.redirect("/pembelian");
        }
      );
    }
  );
});
app.delete("/pembelian/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM pembelian WHERE id = ?", [id], (err, pembelian) => {
    db.run("DELETE FROM pembelian WHERE id = ?", [id], () => {
      db.run(
        "UPDATE stok SET jumlah = jumlah + ? WHERE produk_id = ?",
        [pembelian.jumlah, pembelian.produk_id],
        () => {
          res.redirect("/pembelian");
        }
      );
    });
  });
});
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
