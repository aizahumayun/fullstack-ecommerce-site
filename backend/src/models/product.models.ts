import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    //type: stitched or un-stitched
    fabricType: {
        type: String, 
        required: true,
        enum: ["Stitched", "Unstitched"],
        default: "Stitched"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
   stock: {
      type: Number,
      default: 0,
    }
}, {timestamps: true});
export const Product = mongoose.model("Product", productSchema);