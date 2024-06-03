# Frontend Final

## Deskripsi
Aplikasi Frontend ini dibangun dengan menggunakan Express.js sebagai server dan menggunakan beberapa dependencies seperti `eta`, `sass`, dan `jwt-decode`.

## Cara Menjalankan Aplikasi

### Prasyarat
Pastikan Anda sudah menginstall Node.js dan npm.

### Langkah-langkah
1. Clone repositori ini:
    ```sh
    git clone <repository-url>
    ```
2. Masuk ke direktori proyek:
    ```sh
    cd frontend_final
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Untuk menjalankan aplikasi di mode produksi:
    ```sh
    npm start
    ```
5. Untuk menjalankan aplikasi di mode pengembangan dengan hot-reload:
    ```sh
    npm run dev
    ```

## Fitur
- **Login menggunakan JWT**: Pengguna dapat login menggunakan JSON Web Token untuk otentikasi.
- **CRUD Wishlist**: Pengguna dapat membuat, membaca, dan menghapus wishlist.
- **CRUD Profil Pengguna**: Pengguna dapat membuat, membaca, dan memperbarui profil akun mereka.
- **Membaca Buku dari Google Books**: Pengguna dapat membaca buku langsung dari Google Books API.
- **Logout**: Pengguna dapat logout dari aplikasi.
- **Express Server**: Menyediakan server untuk melayani halaman web.
- **Eta Template Engine**: Menggunakan Eta untuk render halaman.
- **Sass**: Digunakan untuk styling CSS.
- **Nodemon**: Digunakan di mode pengembangan untuk melakukan reload otomatis saat ada perubahan pada kode.
