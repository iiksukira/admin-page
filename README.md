# Admin Page - XIONCO Pretest

Sebuah sistem sederhana berbasis Node.js + Express.js (EJS) dengan database SQL untuk mengelola:

- Input data pembelian produk
- Cancel pembelian oleh admin toko
- Manajemen produk dan stok

## Cara Menjalankan

git clone
```bash
(https://github.com/iiksukira/admin-page.git
```
```bash
cd admin-page
```

1. Install dependencies:

2. Jalankan server:
   ```bash
   node app.js
   ```

3. Buka di browser:
   ```bash
   Server running on http://localhost:3000
   ```

## Struktur Database

- `produk`: daftar produk
- `stok`: jumlah stok per produk
- `pembelian`: histori pembelian

## Catatan

- Database menggunakan SQLite (file `init.db`)
- UI sederhana menggunakan EJS
