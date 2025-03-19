import { countRequestsLastHour } from "../utils/logProcess.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const logFilePath = "./logs.txt";

export const getLogs = async (req, res) => {
  try {
    const requestCounts = await countRequestsLastHour(logFilePath);
    console.log("Data log ditemukan:", requestCounts);

    return successResponse(res, 200, "Log dalam 1 jam terakhir", requestCounts);
  } catch (err) {
    console.error("Gagal membaca log:", err.message);
    return errorResponse(res, 500, "Gagal membaca log", err.message);
  }
};
