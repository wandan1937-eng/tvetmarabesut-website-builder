# TVET MARA Website Builder v4

Selepas projek ini dideploy ke Netlify:

- Builder: https://tvetmarabesut.netlify.app
- Publish API: /api/publish-site
- Website pelajar: /site/<nama-perniagaan>

Butang "Publish Website Online" akan:
1. Menjana HTML website pelajar.
2. Menghantar HTML ke Netlify Function.
3. Menyimpan website dalam Netlify Blobs.
4. Memulangkan URL awam.
5. Menyimpan publish key dalam browser supaya pelajar boleh kemas kini URL yang sama.

Penting:
- Deploy folder/projek ini sebagai source project Netlify, bukan hanya satu fail HTML.
- Tiada Netlify API token disimpan dalam browser.
