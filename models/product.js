import mongoose from "mongoose";

const Product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "products",
  }
);

const productModel = mongoose.model("productData", Product);

export default productModel;
