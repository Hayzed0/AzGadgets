import mongoose from "mongoose";




const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:  {
        type: Number,
        required: true
    },
    quantity:  {
        type: Number,
    },
})

const cartModel = mongoose.model("cart", cartSchema)

export default cartModel