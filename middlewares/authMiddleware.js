import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errorResponse } from "../utils/responseHandler.js";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return errorResponse(res, 401, "Akses ditolak! Token tidak ditemukan");
  }

  try {
    // 🔥 Verifikasi token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // 🔥 Cek apakah token lebih dari 1 menit
    const currentTime = Math.floor(Date.now() / 1000); // Waktu sekarang (detik)
    const tokenAge = currentTime - decoded.iat; // Selisih waktu sejak token dibuat

    if (tokenAge > 60) { // 60 detik = 1 menit
      return errorResponse(res, 403, "Token telah kedaluwarsa, silakan login ulang");
    }

    req.user = decoded;
    next();
  } catch (error) {
    return errorResponse(res, 403, "Token tidak valid atau kadaluarsa", error.message);
  }
};
