import express from "express";
import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "../firebase.js";
import { writeLog } from "../utils/logProcess.js";

const router = express.Router();
const itemsCollection = collection(db, "items");

router.post("/", async (req, res) => {
  try {
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      createdAt: new Date(),
    };

    const docRef = await addDoc(itemsCollection, newItem);
    console.log("Data berhasil ditambahkan:", docRef.id);

    writeLog("POST", "/items", 200);

    res.status(201).json({ id: docRef.id, ...newItem });
  } catch (err) {
    console.error("Gagal menambahkan data:", err.message);

    writeLog("POST", "/items", 400);

    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const snapshot = await getDocs(itemsCollection);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (items.length === 0) {
      writeLog("GET", "/items", 204);
      return res.status(204).json({ message: "Tidak ada data" });
    }

    console.log("Data ditemukan:", items);

    writeLog("GET", "/items", 200);

    res.json(items);
  } catch (err) {
    console.error("Gagal mengambil data:", err.message);

    writeLog("GET", "/items", 500);

    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemDoc = await getDoc(doc(db, "items", itemId));

    if (!itemDoc.exists()) {
      console.log("Item tidak ditemukan");

      writeLog("GET", `/items/${itemId}`, 404);

      return res.status(404).json({ error: "Item tidak ditemukan" });
    }

    console.log("Data ditemukan:", itemDoc.data());

    writeLog("GET", `/items/${itemId}`, 200);

    res.json({ id: itemDoc.id, ...itemDoc.data() });
  } catch (err) {
    console.error("Gagal mengambil data:", err.message);

    writeLog("GET", `/items/${req.params.id}`, 500);

    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      updatedAt: new Date(),
    };

    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);

    if (!itemDoc.exists()) {
      console.log("Item tidak ditemukan");

      writeLog("PUT", `/items/${itemId}`, 404);

      return res.status(404).json({ error: "Item tidak ditemukan" });
    }

    await updateDoc(itemRef, updatedData);
    console.log("Data berhasil diperbarui");

    writeLog("PUT", `/items/${itemId}`, 200);

    res.json({ id: itemId, ...updatedData });
  } catch (err) {
    console.error("Gagal memperbarui data:", err.message);

    writeLog("PUT", `/items/${req.params.id}`, 400);

    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const itemId = req.params.id;

    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);

    if (!itemDoc.exists()) {
      console.log("Item tidak ditemukan");

      writeLog("DELETE", `/items/${itemId}`, 404);

      return res.status(404).json({ error: "Item tidak ditemukan" });
    }

    await deleteDoc(itemRef);
    console.log("Data berhasil dihapus");

    writeLog("DELETE", `/items/${itemId}`, 200);

    res.json({ message: "Item berhasil dihapus" });
  } catch (err) {
    console.error("Gagal menghapus data:", err.message);

    writeLog("DELETE", `/items/${req.params.id}`, 500);

    res.status(500).json({ error: err.message });
  }
});

export default router;
