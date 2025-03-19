🔥 Firebase CRUD dengan Node.js
Proyek ini adalah aplikasi CRUD (Create, Read, Update, Delete) sederhana menggunakan Node.js dan Firebase Firestore.

🚀 Fitur
✅ Tambah data ke Firestore
✅ Ambil data dari Firestore
✅ Update data di Firestore
✅ Hapus data dari Firestore
✅ Autentikasi pengguna dengan Firebase Authentication
✅ Generate token JWT untuk autentikasi

🛠 Persiapan Sebelum Menjalankan
1️⃣ Clone Repository

git clone https://github.com/username/firebase-nodejs-crud.git
cd firebase-nodejs-crud

2️⃣ Install Dependencies
npm install

3️⃣ Konfigurasi Firebase
Buat file .env di root proyek dan masukkan konfigurasi Firebase:

FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# JWT Secret untuk Autentikasi Token
JWT_SECRET=your_jwt_secret
🔹 Gantilah nilai-nilai di atas dengan konfigurasi Firebase kamu.

4️⃣ Jalankan Server

npm run dev
✅ Server akan berjalan di port yang telah dikonfigurasi (default: 3000).

📡 API Endpoint

🔹 Register User
Endpoint: POST /api/auth/register
Body:
{
  "email": "user@example.com",
  "password": "password123"
}

🔹 Login User
Endpoint: POST /api/auth/login

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login berhasil",
  "token": "your_generated_token"
}

🔹 Ambil Semua Data (Protected Route)

Endpoint: GET /api/items
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}

🔹 Tambah Data Baru (Protected Route)

Endpoint: POST /api/items
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}
Body:
{
  "name": "Item Baru",
  "description": "Deskripsi item"
}

🔹 Update Data (Protected Route)

Endpoint: PUT /api/items/:id
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}
Body:
{
  "name": "Item Update",
  "description": "Deskripsi baru"
}

🔹 Hapus Data (Protected Route)
Endpoint: DELETE /api/items/:id
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}

📌 Catatan
Untuk menggunakan autentikasi Firebase, pastikan Firebase Authentication telah diaktifkan di Firebase Console.
Token JWT memiliki masa berlaku 1 menit jika menggunakan jsonwebtoken atau 1 jam jika menggunakan Firebase Authentication.
Pastikan FIREBASE_PROJECT_ID sudah diatur dengan benar agar aplikasi dapat berjalan dengan baik.
