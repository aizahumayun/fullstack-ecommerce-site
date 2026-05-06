import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// ========================
// CART ROUTES
// ========================

// ADD ITEM TO CART
router.post("/add", addToCart);

// GET CART BY CUSTOMER ID
router.get("/:customer", getCart);

//update cart 
router.put("/update", updateCart);

// REMOVE ITEM FROM CART
router.delete("/remove/:customer/:productId/:size", removeFromCart);

export default router;