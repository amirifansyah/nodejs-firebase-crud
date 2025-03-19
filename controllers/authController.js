import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../config/firebaseClient.js";
import { adminAuth } from "../config/firebaseAdmin.js"; // Untuk verifikasi token JWT

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// 🔥 LOGIN USER (Token Expired dalam 1 Menit)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autentikasi dengan Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔥 Generate Token JWT (Expired dalam 1 Menit)
    const token = jwt.sign({ uid: user.uid, email: user.email }, SECRET_KEY, { expiresIn: "1m" });

    return successResponse(res, 200, "Login berhasil", { token });
  } catch (error) {
    return errorResponse(res, 401, "Email atau password salah", error.message);
  }
};

// 🔥 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Registrasi dengan Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return successResponse(res, 201, "Registrasi berhasil", { uid: user.uid, email: user.email });
  } catch (error) {
    return errorResponse(res, 500, "Terjadi kesalahan saat registrasi", error.message);
  }
};
