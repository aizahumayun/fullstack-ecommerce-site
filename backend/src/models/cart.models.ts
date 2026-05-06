import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    size: {
        type: String,
        required: true,
    },
})
const cartSchema = new mongoose.Schema({
    customer: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
        type: [cartItemSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    }
}, {timestamps: true});

export const Cart = mongoose.model("Cart", cartSchema);