import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// CREATE CATEGORY
router.post("/", upload.single("image"),createCategory);

// GET ALL CATEGORIES
router.get("/", getAllCategories);

// GET SINGLE CATEGORY
router.get("/:id", getCategoryById);

// UPDATE CATEGORY
router.put("/:id", upload.single("image"), updateCategory);

// DELETE CATEGORY
router.delete("/:id", deleteCategory);

export default router;