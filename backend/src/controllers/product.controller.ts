import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../services/uploadOnCloudinary.service.js";


// ========================
// CREATE PRODUCT
// ========================
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    season,
    fabricType,
    category,
    color,
    size,
    stock,
  } = req.body;

  // 1. validation
  if (
    !name ||
    !description ||
    !price ||
    !season ||
    !category ||
    !color ||
    !size
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // 2. validate category ObjectId (IMPORTANT FIX)
  if (!mongoose.Types.ObjectId.isValid(category)) {
    throw new ApiError(400, "Invalid category id");
  }

  // 3. check category exists
  const existingCategory = await Category.findById(category);
  if (!existingCategory) {
    throw new ApiError(404, "Category not found");
  }

  // 4. duplicate product check (case insensitive)
  const existingProduct = await Product.findOne({
    name: name.trim().toLowerCase(),
  });

  if (existingProduct) {
    throw new ApiError(400, "Product already exists");
  }

  // 5. image check
  if (!req.file) {
    throw new ApiError(400, "Product image is required");
  }

  // 6. upload image
  const uploadedImage = await uploadOnCloudinary(req.file.buffer);

  if (!uploadedImage) {
    throw new ApiError(500, "Image upload failed");
  }

  // 7. create product
  const product = await Product.create({
    name: name.trim().toLowerCase(),
    description,
    price,
    season,
    fabricType: fabricType || "Stitched",
    category,
    color,
    size,
    stock: stock || 0,
    image: uploadedImage.secure_url,
  });

  return res.status(201).json(
    new ApiResponse(201, product, "Product created successfully")
  );
});


// ========================
// GET ALL PRODUCTS (WITH PAGINATION + SEARCH)
// ========================
export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = (req.query.search as string) || "";

  const skip = (page - 1) * limit;

  const filter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const products = await Product.find(filter)
    .populate("category")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      products,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    }, "Products fetched successfully")
  );
});


// ========================
// GET PRODUCT BY ID
// ========================
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    throw new ApiError(400, "Invalid product id");
  }

  const product = await Product.findById(id).populate("category");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Product fetched successfully")
  );
});

// ========================
// Update Product
// ========================

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, fabricType, color, size, stock, category, season } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (description) product.description = description;
  if (fabricType) product.fabricType = fabricType;
  if (color) product.color = color;
  if (size) product.size = size;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (season) product.season = season;

  // update image if new file provided
  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.buffer);
    if (!uploadedImage) {
      throw new ApiError(500, "Image upload failed");
    }
    product.image = uploadedImage.secure_url;
  }

  await product.save();

  return res.status(200).json(
    new ApiResponse(200, product, "Product updated successfully")
  );
});

// ========================
// DELETE PRODUCT
// ========================
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    throw new ApiError(400, "Invalid product id");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await product.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, {}, "Product deleted successfully")
  );
});