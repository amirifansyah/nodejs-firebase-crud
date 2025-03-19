import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";

dotenv.config();

// Cek apakah Firebase Admin sudah diinisialisasi
if (!admin.apps.length) {
  const serviceAccountPath = path.resolve("config/firebase-adminsdk.json");

  // Pastikan file service account JSON ada
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

const adminAuth = admin.auth();

export { adminAuth };
