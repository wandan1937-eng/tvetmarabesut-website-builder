# Project Chat Notes — Business Website Studio / TVET MARA Besut

Tarikh kemas kini: 12 September 2026

## Objektif Projek
Membangunkan sistem no-code untuk membantu pelajar TVET MARA Besut membina website perniagaan sendiri tanpa kemahiran coding. Pelajar boleh isi maklumat bisnes, tambah produk/servis, upload logo dan gambar, preview website, dan publish terus ke URL awam.

## Platform & Deploy
- GitHub repository: `wandan1937-eng/tvetmarabesut-website-builder`
- Netlify project: `tvetmarabesut`
- URL live: `https://tvetmarabesut.netlify.app`
- Branch: `main`
- Netlify Functions aktif:
  - `/api/publish-site`
  - `/site/*`
- Website pelajar diterbitkan dalam format:
  - `https://tvetmarabesut.netlify.app/site/nama-perniagaan`

## Evolusi Versi
### v4
- Publish website online
- Netlify Functions + Netlify Blobs
- Public URL untuk setiap bisnes

### v5 / v5.1
- Design lebih profesional
- Navigation, hero, CTA, produk card, testimoni, lokasi, footer
- Responsive untuk telefon
- Penambahbaikan alignment, wording dan gambar
- Gambar menggunakan paparan `contain` supaya tidak mudah crop / stretch
- Upload gambar dikecilkan secara automatik

### v6
Sistem diubah mengikut jenis perniagaan. Pilihan:
1. Makanan & Minuman
2. Servis
3. Automotif
4. Fashion / Produk Fizikal
5. Digital / Consultation
6. Home-based / Produk Tradisional
7. Freelance / Personal Service

Setiap kategori menukar secara automatik:
- wording
- headline cadangan
- penerangan bisnes
- USP
- CTA
- warna
- gaya website
- nama bahagian produk/servis
- maklumat tambahan khusus jenis bisnes

Contoh:
- Makanan → Menu / Produk, COD, waktu tempahan, `Order Sekarang`
- Servis → Senarai Servis, kawasan servis, tempahan
- Automotif → jenis kenderaan, kawasan servis, temujanji
- Fashion → variasi saiz/warna, penghantaran, semak stok
- Digital → pakej, konsultasi, tempoh kerja, sebutharga
- Freelance → proses kerja, availability, bincang projek

### v7 — AI Content Assistant
Ditambah fungsi **AI Bantu Tulis Kandungan**.

Pelajar boleh masukkan idea ringkas seperti:
> Jual chocojar RM12, target pelajar kolej, COD sekitar kampus, crunchy dan sesuai untuk snek.

Sistem membantu menyediakan:
- 3 cadangan headline
- penerangan perniagaan
- USP / kelebihan
- CTA sesuai
- cadangan penerangan produk/servis

Fungsi tambahan:
- `Guna Semua`
- pilih headline secara individu
- baiki ayat sedia ada
- pilihan gaya penulisan: Profesional, Mesra & Santai, Premium, Ringkas & Terus
- pilihan matlamat: Tempahan, WhatsApp, Keyakinan, Sebutharga

AI Content Assistant versi semasa menggunakan Smart Draft dalaman dan tidak memerlukan API key. Sistem tidak sepatutnya mereka-reka fakta seperti sijil, testimoni, status halal atau tuntutan No.1 jika pelajar tidak memberikannya.

## Maklumat Yang Pelajar Perlu Sediakan Sebelum Bina Website
Minimum wajib:
1. Nama perniagaan
2. Jenis perniagaan
3. Logo
4. Penerangan ringkas bisnes
5. Produk / servis
6. Harga
7. Gambar produk / servis
8. Nombor WhatsApp

Maklumat tambahan yang digalakkan:
- sasaran pelanggan
- USP / kelebihan
- lokasi / kawasan servis
- Instagram / TikTok
- testimoni sebenar
- CTA
- Google Maps
- maklumat khusus mengikut jenis bisnes

## Prinsip Reka Bentuk
- Website mesti nampak profesional dan sesuai dengan jenis bisnes
- Wording ringkas, jelas dan meyakinkan
- Elakkan maklumat palsu atau claim yang tidak disahkan
- Gambar tidak boleh kelihatan stretched atau terpotong secara tidak sesuai
- Paparan mesti mobile-friendly
- CTA utama mesti mudah dilihat
- WhatsApp menjadi saluran tindakan utama
- Pelajar boleh publish tanpa coding

## Aliran Penggunaan Pelajar
`Pilih Jenis Perniagaan → Guna Cadangan Template → Isi Maklumat → AI Bantu Tulis Kandungan → Tambah Produk/Servis → Upload Gambar → Preview → Publish Website Online → Salin URL`

## Cadangan Pembangunan Seterusnya
- AI Content Assistant yang lebih pintar / integrasi model AI sebenar jika diperlukan
- template visual lebih berbeza mengikut kategori
- portfolio / gallery untuk servis
- variasi produk yang lebih lengkap
- borang quotation / appointment
- dashboard pensyarah untuk pantau website pelajar
- semakan kualiti kandungan sebelum publish
