import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// ========================
// ORDER ROUTES
// ========================

// CREATE ORDER (checkout)
router.post("/create", createOrder);

// GET ORDERS BY CUSTOMER EMAIL
router.get("/:email", getOrders);

// GET ALL ORDERS (ADMIN)
router.get("/", getAllOrders);

// UPDATE ORDER STATUS (ADMIN)
router.put("/status", updateOrderStatus);

export default router;