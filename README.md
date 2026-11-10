# SPOTS IDB Bali — Sistem Peminjaman Ruangan

Aplikasi web untuk mengajukan dan menyetujui peminjaman ruangan di Institut Desain dan Bisnis Bali. Dibangun dengan HTML, Tailwind CSS (CDN), dan Vanilla JavaScript dalam satu file.

## Akun demo

| Peran | Email | Kata sandi |
| --- | --- | --- |
| Pemohon | `pemohon@demo.idb.ac.id` | `demo123` |
| Admin Sarpras | `admin@demo.idb.ac.id` | `demo123` |

Akun demo juga bisa diklik langsung di halaman login. Login lain memakai email `@idb.ac.id` dengan kata sandi minimal 6 karakter (simulasi).

## Menjalankan

Buka `index.html` langsung di browser. Jika ingin lewat server lokal:

```bash
npx serve .
```

Lalu buka alamat yang ditampilkan server. Koneksi internet diperlukan pada pemuatan pertama untuk Google Fonts dan Tailwind CDN.

## Deploy ke Vercel

Situs ini statis (HTML tunggal, gambar sudah tertanam base64), jadi tidak perlu build step.

**Lewat dashboard:**

1. Buka <https://vercel.com/new> lalu pilih **Import Git Repository**.
2. Pilih repo `putujovita04-sudo/tugas-web`.
3. Framework Preset: **Other**, Build Command: kosong, Output Directory: kosong (root).
4. Klik **Deploy**. Setiap push ke `main` akan otomatis ter-deploy ulang.

**Lewat CLI:**

```bash
npm i -g vercel
vercel        # pratinjau
vercel --prod # produksi
```

`vercel.json` hanya mengatur URL tanpa `.html` dan cache untuk `spots-assets/`.

## Fitur

- Login split-screen dengan pemilihan kategori peminjam: Mahasiswa, Dosen / Staff, Ormawa / UKM.
- Katalog 6 ruangan kampus dan formulir pengajuan dengan validasi kapasitas, jam layanan, dan bentrok jadwal.
- Papan jadwal 4 slot per hari; klik sel kosong untuk mengisi formulir.
- Riwayat pengajuan dengan badge status Menunggu / Disetujui / Ditolak.
- Antrian admin dengan aksi Setujui dan Tolak (disertai alasan).
- Data tersimpan di `localStorage` dan tersinkron antar-tab lewat `BroadcastChannel`.
- Reset data demo dari navigasi samping.

## Struktur

```
index.html              # aplikasi final (gambar sudah tertanam base64) — entry point Vercel
vercel.json             # konfigurasi deploy statis
spots-assets/
  build.mjs             # menanam gambar base64 ke template
  img/                  # 7 foto ruangan dan gedung kampus
```

Sumber template (`spots.template.html`) disimpan di luar repo ini.

## Build ulang

Setelah mengubah `spots.template.html` atau foto di `spots-assets/img/`:

```bash
node spots-assets/build.mjs
```

Perintah tersebut menghasilkan `spots-idb.html` yang siap dibuka.
