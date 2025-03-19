import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import { writeLog } from "./utils/logProcess.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/logs", logRoutes);

app.use((req, res) => {
  console.log(`404 - Endpoint tidak ditemukan: ${req.method} ${req.originalUrl}`);
  
  writeLog(req.method, req.originalUrl, 404);

  res.status(404).json({ error: "Endpoint tidak ditemukan" });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
