import { db, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "../config/firebaseClient.js";
import { writeLog } from "../utils/logProcess.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

const itemsCollection = collection(db, "items");

export const createItem = async (req, res) => {
  try {
    const newItem = {
      name: req.body.name,
      price: req.body.price,
      createdAt: new Date(),
    };

    const docRef = await addDoc(itemsCollection, newItem);
    console.log("Data berhasil ditambahkan:", docRef.id);

    writeLog("POST", "/items", 200);

    return successResponse(res, 201, "Item berhasil ditambahkan", { id: docRef.id, ...newItem });
  } catch (err) {
    console.error("Gagal menambahkan data:", err.message);
    writeLog("POST", "/items", 400);
    return errorResponse(res, 400, "Gagal menambahkan item", err.message);
  }
};

export const getAllItems = async (req, res) => {
  try {
    const snapshot = await getDocs(itemsCollection);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (items.length === 0) {
      writeLog("GET", "/items", 204);
      return successResponse(res, 204, "Tidak ada data", []);
    }

    console.log("Data ditemukan:", items);
    writeLog("GET", "/items", 200);
    return successResponse(res, 200, "Data ditemukan", items);
  } catch (err) {
    console.error("Gagal mengambil data:", err.message);
    writeLog("GET", "/items", 500);
    return errorResponse(res, 500, "Gagal mengambil data", err.message);
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemDoc = await getDoc(doc(db, "items", itemId));

    if (!itemDoc.exists()) {
      console.log("Item tidak ditemukan");
      writeLog("GET", `/items/${itemId}`, 404);
      return errorResponse(res, 404, "Item tidak ditemukan");
    }

    console.log("Data ditemukan:", itemDoc.data());
    writeLog("GET", `/items/${itemId}`, 200);
    return successResponse(res, 200, "Item ditemukan", { id: itemDoc.id, ...itemDoc.data() });
  } catch (err) {
    console.error("Gagal mengambil data:", err.message);
    writeLog("GET", `/items/${req.params.id}`, 500);
    return errorResponse(res, 500, "Gagal mengambil data", err.message);
  }
};

export const updateItem = async (req, res) => {
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
      return errorResponse(res, 404, "Item tidak ditemukan");
    }

    await updateDoc(itemRef, updatedData);
    console.log("Data berhasil diperbarui");
    writeLog("PUT", `/items/${itemId}`, 200);
    return successResponse(res, 200, "Item berhasil diperbarui", { id: itemId, ...updatedData });
  } catch (err) {
    console.error("Gagal memperbarui data:", err.message);
    writeLog("PUT", `/items/${req.params.id}`, 400);
    return errorResponse(res, 400, "Gagal memperbarui item", err.message);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemRef = doc(db, "items", itemId);
    const itemDoc = await getDoc(itemRef);

    if (!itemDoc.exists()) {
      console.log("Item tidak ditemukan");
      writeLog("DELETE", `/items/${itemId}`, 404);
      return errorResponse(res, 404, "Item tidak ditemukan");
    }

    await deleteDoc(itemRef);
    console.log("Data berhasil dihapus");
    writeLog("DELETE", `/items/${itemId}`, 200);
    return successResponse(res, 200, "Item berhasil dihapus");
  } catch (err) {
    console.error("Gagal menghapus data:", err.message);
    writeLog("DELETE", `/items/${req.params.id}`, 500);
    return errorResponse(res, 500, "Gagal menghapus item", err.message);
  }
};
