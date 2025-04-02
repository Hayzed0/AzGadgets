import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        country: String,
        state: String,
        zipcode: String,
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    productIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        }
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: [0]

    },
    transactionIds: {
        type: String,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
        min: [1]
    },
} ,{
timestamps: true
})

const orderModel = mongoose.model("Order", orderSchema)

export default orderModel