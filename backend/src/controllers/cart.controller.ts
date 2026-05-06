import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Cart } from "../models/cart.models.js";
import { Product } from "../models/product.models.js";
import type { Request, Response } from "express";
import { Types } from "mongoose";

interface CartItem {
  productId: Types.ObjectId;
  quantity: number;
  size: string;
}

// get productId, quantity, size from req.body
// validate - all fields required
// check if product exists
// get product price from DB
// check if cart already exists for this user (customer)
// if cart exists:
//    check if item already exists in cart
//       if yes → update quantity
//       if no → push new item
// if cart does not exist:
//    create new cart with item
// calculate total price
// save cart
// return response

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { productId, quantity, size, customer } = req.body;

  // 1. validation
  if (!productId || !quantity || !size || !customer) {
    throw new ApiError(400, "All fields are required");
  }

  // 2. check product
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // 3. find cart
  let cart = await Cart.findOne({ customer });

  // 4. if cart exists
  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size,
    );

    const existingItem = cart.items[itemIndex];

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, size });
    }
  } else {
    // 5. create new cart
    cart = await Cart.create({
      customer,
      items: [
        {
          productId,
          quantity,
          size,
        },
      ],
    });
  }

  // 6. calculate total price
  let total = 0;

  for (const item of cart.items) {
    const prod = await Product.findById(item.productId);
    if (prod) {
      total += prod.price * item.quantity;
    }
  }

  cart.totalPrice = total;

  await cart.save();

  // 7. response
  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Item added to cart successfully"));
});

//get cart by customer id
export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const { customer } = req.params as { customer: string };

  if (!customer) {
    throw new ApiError(400, "Customer id is required");
  }

  const cart = await Cart.findOne({ customer }).populate("items.productId");

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

//update cart item quantity
export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const { customer, productId, size, quantity } = req.body;

  const cart = await Cart.findOne({ customer });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) =>
      item.productId.toString() === productId &&
      item.size === size
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Item not found");
  }

  // safe update
  const item = cart.items[itemIndex];

if (!item) {
  throw new ApiError(404, "Item not found");
}

item.quantity = quantity;

  // recalculate total
  let total = 0;

  for (const item of cart.items) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }

  cart.totalPrice = total;

  await cart.save();

  return res.status(200).json(
    new ApiResponse(200, cart, "Item quantity updated successfully")
  );
});

//delete cart item by product id and size
export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { customer, productId, size } = req.params as { customer: string; productId: string; size: string };

    const cart = await Cart.findOne({ customer });

    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }

    const items = cart.items as unknown as CartItem[];

    cart.items = items.filter(
      (item) =>
        !(item.productId.toString() === productId && item.size === size),
    ) as any;
    // recalculate total price
    let total = 0;

    for (const item of cart.items as unknown as CartItem[]) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }

    cart.totalPrice = total;

    await cart.save();

    return res
      .status(200)
      .json(new ApiResponse(200, cart, "Item removed successfully"));
  },
);
