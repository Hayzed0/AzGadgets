import express from "express"
import { cancelAnOrder, createOrder, getAllOrder, getAnOrder, getPaymentStatus } from "../controllers/orderController.js"
import { adminProtect, protect } from "../middleware/authMiddleware.js"


const orderRouter = express.Router()

orderRouter.post("/create-order",protect, createOrder)
orderRouter.get('/get-order/:email',protect,  getAnOrder)
orderRouter.get('/', protect, adminProtect, getAllOrder)
orderRouter.get('/payment-status',protect,  getPaymentStatus)
orderRouter.delete('/delete/:orderId',protect,  cancelAnOrder)


export default orderRouter