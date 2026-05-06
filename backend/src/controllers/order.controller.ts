import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";
import type { Request, Response } from "express";
import { Order } from "../models/order.models.js";
import { sendWhatsApp } from "../services/whatsapp.service.js";
import { sendOrderEmail } from "../services/email.service.js";
// get customer details (name, email, phone, address, paymentMethod)
// validate required fields
// find cart by customer
// check if cart exists and not empty
// get all cart items
// fetch product details for each item
// create orderItems array (with price snapshot)
// calculate total price
// create order in database
// clear user's cart after order success
// return order response

export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { customerName, email, phoneNumber, address, paymentMethod, customer } =
    req.body;

  // 1. validation
  if (
    !customerName ||
    !email ||
    !phoneNumber ||
    !address ||
    !paymentMethod ||
    !customer
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. get cart
  const cart = await Cart.findOne({ customer });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(404, "Cart is empty");
  }

  // 3. build order items with price snapshot
  const orderItems = [];

  let totalPrice = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);

    if (!product) continue;

    const itemTotal = product.price * item.quantity;

    totalPrice += itemTotal;

    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
      price: product.price, // snapshot
    });
  }

  // 4. create order
  const orderData: any = {
    customerName,
    email,
    phoneNumber,
    address,
    paymentMethod,
    orderItems,
    totalPrice,
    status: "Processing",
    isPaid: paymentMethod === "Card",
  };

  if (paymentMethod === "Card") {
    orderData.paidAt = new Date();
  }
  const order = await Order.create(orderData);

  // 5. clear cart after order
  cart.items.splice(0, cart.items.length);
  cart.totalPrice = 0;
  await cart.save();

  // 6. send notifications (WhatsApp and Email) asynchronously without blocking response
  setImmediate(() => {
    try {
      sendWhatsApp(
        phoneNumber,
        `Order ${order._id} placed successfully! Total: ${totalPrice}`
      ).catch((err) => console.log("WhatsApp failed:", err));

      sendOrderEmail(email, order._id.toString()).catch((err) =>
        console.log("Email failed:", err)
      );
    } catch (err) {
      console.log("Notification error:", err);
    }
  });

  // 7. response
  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

//get order by customer
export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.params as { email: string };

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const orders = await Order.find({ email });

  return res.status(200).json(
    new ApiResponse(200, orders, "Orders fetched successfully")
  );
});

//UPDATE ORDER STATUS (ADMIN)
export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    order.status = status;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = new Date();
    }

    await order.save();

    return res
      .status(200)
      .json(new ApiResponse(200, order, "Order updated successfully"));
  },
);
