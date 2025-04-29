import mongoose, { disconnect } from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  model: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  popular: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: true
});


const productModel = mongoose.model("Products", productSchema)

export default productModel