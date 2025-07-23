Panduan Instalasi

----------------------------------
Instalasi di Windows (Prioritas)
----------------------------------

Panduan ini dibuat khusus untuk pengguna sistem operasi Windows.

1. Instalasi Perangkat Lunak yang Dibutuhkan

Sebelum memulai, pastikan Anda sudah menginstal Git dan Node.js. Jika belum, silakan unduh dan instal dari tautan berikut:

- Node.js: Unduh versi LTS dari situs resmi Node.js (https://nodejs.org/en/download). Node.js diperlukan untuk menjalankan kode JavaScript bot.
- Git: Unduh dari situs resmi Git for Windows (https://git-scm.com/download/win). Git digunakan untuk mengunduh (clone) kode dari GitHub.

Penting: Setelah selesai menginstal keduanya, tutup dan buka kembali terminal Anda (Command Prompt/PowerShell) agar perintah node dan git dapat dikenali.

2. Clone Repositori dari GitHub

Buka Command Prompt atau PowerShell, lalu jalankan perintah berikut untuk mengunduh kode bot ke komputer Anda:

git clone https://github.com/fandax88/wa-absen-reminder.git

3. Masuk ke Folder Proyek

Setelah proses clone selesai, masuk ke dalam folder proyek yang baru saja dibuat dengan perintah:

cd wa-absen-reminder

4. Install Semua Dependensi

Di dalam folder proyek, jalankan perintah ini untuk menginstal semua library yang dibutuhkan oleh bot secara otomatis:

npm install

5. Jalankan Bot

Setelah semua dependensi terinstal, jalankan bot dengan perintah:

node index.js

6. Scan QR Code untuk Login

Pada saat pertama kali dijalankan, sebuah QR code akan muncul di terminal Anda. Lakukan langkah berikut:
1. Buka aplikasi WhatsApp di ponsel Anda.
2. Masuk ke Setelan > Perangkat Tertaut > Tautkan Perangkat.
3. Arahkan kamera ponsel Anda untuk memindai QR code yang ada di terminal.

Setelah berhasil, Anda akan melihat pesan "Bot WhatsApp sudah siap!" di terminal, dan bot siap digunakan.

----------------------------------
Instalasi di Linux / macOS
----------------------------------

Prosesnya sebagian besar sama, hanya berbeda pada cara instalasi Git dan Node.js.

1. Instal Git dan Node.js
   - Debian/Ubuntu:
     sudo apt update
     sudo apt install git nodejs npm
   - macOS (menggunakan Homebrew):
     brew install node git

2. Ikuti Langkah 2 hingga 6 dari panduan instalasi Windows di atas, karena perintah git clone, cd, npm install, dan node index.js sama di semua sistem operasi.
