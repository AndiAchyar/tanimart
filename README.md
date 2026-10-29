# TaniMart

Platform belanja hasil tani yang menghubungkan petani dengan pembeli. Dibangun dengan
**Next.js (App Router) + TypeScript + Tailwind CSS**, siap di-deploy ke Vercel.

> Versi ini tanpa backend/database. Data produk awal ada di `data/products.json`,
> sedangkan akun, keranjang, pesanan, dan perubahan produk disimpan di `localStorage`
> browser. Cocok untuk demo/tugas kuliah; data **tidak dibagi antar perangkat**.

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
```

## Deploy ke Vercel

1. Push repo ke GitHub.
2. Di Vercel: **Add New → Project**, pilih repo ini (framework terdeteksi otomatis sebagai Next.js).
3. Klik **Deploy**. Tidak ada environment variable yang diperlukan.

## Halaman

| Rute | Fungsi |
|---|---|
| `/` | Beranda & produk unggulan |
| `/login` | Masuk / daftar pelanggan |
| `/belanja` | Katalog produk, tambah ke keranjang |
| `/keranjang` | Ubah jumlah / hapus item |
| `/checkout` | Data pengiriman & metode pembayaran |
| `/petani/login` | Masuk petani |
| `/petani` | Dashboard: kelola produk, stok, dan status pengiriman |
| `/petani/tambah` | Tambah produk baru (foto diperkecil dan disimpan di browser) |
| `/feedback`, `/terima-kasih` | Formulir masukan |

## Akun bawaan

`admin@gmail.com` / `admin` (bisa dipakai untuk login pelanggan maupun petani).

## Struktur

```
app/          halaman (App Router)
components/   komponen UI bersama
lib/store.ts  penyimpanan localStorage + hook reaktif
lib/actions.ts logika bisnis (auth, keranjang, pesanan, produk)
data/         data produk awal
public/image/ gambar produk
```

## Batasan

- Login hanyalah simulasi di sisi klien (kata sandi di-hash SHA-256, tetapi tidak ada server yang memverifikasi).
- Pesanan hanya terlihat di browser yang membuatnya, jadi dashboard petani menampilkan pesanan dari browser yang sama.
- Untuk data bersama antar pengguna, ganti `lib/store.ts` & `lib/actions.ts` dengan backend (mis. Supabase).

## Lisensi

Lihat [LICENSE](LICENSE).
