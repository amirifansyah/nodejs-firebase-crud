Firebase CRUD dengan Node.js
Proyek ini adalah aplikasi CRUD sederhana menggunakan Node.js dan Firebase Firestore.

🚀 Fitur
✅ Tambah data ke Firestore
✅ Ambil data dari Firestore
✅ Update data di Firestore
✅ Hapus data dari Firestore

🛠 Persiapan Sebelum Menjalankan
1. Clone Repository
git clone https://github.com/username/firebase-nodejs-crud.git
cd firebase-nodejs-crud

2. Install Dependencies

npm install

3. Buat File .env

Buat file .env di root proyek dan masukkan konfigurasi Firebase

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
🔹 Gantilah nilai-nilai di atas dengan konfigurasi Firebase kamu.

4. Jalankan Server

node server.js

✅ Server akan berjalan di port yang telah dikonfigurasi.