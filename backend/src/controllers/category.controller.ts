//make category controller to handle category related requests
import { Category } from "../models/category.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../services/uploadOnCloudinary.service.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import type { Request, Response } from "express";

// get category name from req.body
// validate - name should not be empty
// check if category already exists
// check if image file exists in req.file
// upload image to cloudinary
// create category in DB with name + image URL
// verify creation
// return ApiResponse with created category data
// fetch all categories
// return ApiResponse with all categories
// get id from params
// check if category exists
// delete category
// return response

//1. get data

export const createCategory = asyncHandler(
  async (req: Request, res: Response) => {
    // 1. get data
    const { name } = req.body;

    // 2. validation
    if (!name || name.trim() === "") {
      throw new ApiError(400, "Category name is required");
    }

    // 3. check duplicate
    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      throw new ApiError(400, "Category already exists");
    }

    // 4. check image
    const file = req.file;
    if (!file) {
      console.log("No file uploaded");
      throw new ApiError(400, "Category image is required");
    }

    // 5. upload image
    const uploadedImage = await uploadOnCloudinary(file.buffer);

    if (!uploadedImage) {
      console.log("Image upload failed");
      throw new ApiError(500, "Image upload failed");
    }

    // 6. create category
    const category = await Category.create({
      name: name.trim().toLowerCase(),
      image: uploadedImage.secure_url,
    });

    // 7. response
    return res
      .status(201)
      .json(new ApiResponse(201, category, "Category created successfully"));
  },
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response) => {
    // fetch all categories
    const categories = await Category.find();

    return res
      .status(200)
      .json(
        new ApiResponse(200, categories, "Categories fetched successfully"),
      );
  },
);

//get single category by id
export const getCategoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Category fetched successfully"));
  },
);
//delete category by id
export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // check if exists
    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    // delete
    await category.deleteOne();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Category deleted successfully"));
  },
);

//update category by id
export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const name = req.body?.name;

    const category = await Category.findById(id);

    if (!category) {
      throw new ApiError(404, "Category not found");
    }

    // update name if provided
    if (name && name.trim() !== "") {
      category.name = name.trim();
    }

    // update image if new file provided
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.buffer);

      if (!uploadedImage) {
        throw new ApiError(500, "Image upload failed");
      }

      category.image = uploadedImage.secure_url;
    }
    //if both name and image are not provided, throw error
    if (!name && !req.file) {
      throw new ApiError(400, "Nothing to update");
    }
    console.log("Updated category data:", category);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    await category.save();

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Category updated successfully"));
  },
);
