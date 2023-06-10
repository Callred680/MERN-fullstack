// File will be schema for user representing model of data
import mongoose from "mongoose";

// Establishing attributes for table defined as "Product"
// Passes this schema into MongoDB to organized and structure product data each time
const ProductSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;