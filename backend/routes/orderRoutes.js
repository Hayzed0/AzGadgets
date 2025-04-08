import express from "express"
import { cancelAnOrder, createOrder, getAnOrder, getPaymentStatus } from "../controllers/orderController.js"


const orderRouter = express.Router()

orderRouter.post("/create-order", createOrder)
orderRouter.get('/get-order/:email', getAnOrder)
orderRouter.get('/payment-status', getPaymentStatus)
orderRouter.delete('/delete/:orderId', cancelAnOrder)


export default orderRouter