import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// ========================
// MULTER SETUP (for image upload)
// ========================
const upload = multer({
  storage: multer.memoryStorage(),
});

// ========================
// PRODUCT ROUTES
// ========================

// CREATE PRODUCT (with image upload)
router.post("/", upload.single("image"), createProduct);

// GET ALL PRODUCTS (pagination + search supported)
router.get("/", getAllProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// UPDATE PRODUCT (with image upload)
router.put("/:id", upload.single("image"), updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;