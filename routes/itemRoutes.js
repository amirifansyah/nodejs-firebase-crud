import express from "express";
import { createItem, getAllItems, getItemById, updateItem, deleteItem } from "../controllers/itemController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, createItem);
router.get("/", authenticateUser, getAllItems);
router.get("/:id", authenticateUser, getItemById);
router.put("/:id", authenticateUser, updateItem);
router.delete("/:id", authenticateUser, deleteItem);

export default router;
