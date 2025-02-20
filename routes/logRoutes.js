import express from "express";
import { countRequestsLastHour } from "../utils/logProcess.js"; 

const router = express.Router();
const logFilePath = "./logs.txt"; 

router.get("/", async (req, res) => {
  try {
    const requestCounts = await countRequestsLastHour(logFilePath);

    console.log("Data log ditemukan:", requestCounts);
    res.json({ message: "Log dalam 1 jam terakhir", data: requestCounts });
  } catch (err) {
    console.error("Gagal membaca log:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
