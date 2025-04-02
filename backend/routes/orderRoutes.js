import express from "express"
import { createOrder, getAnOrder } from "../controllers/orderController.js"


const orderRouter = express.Router()

orderRouter.post("/create-order", createOrder)
orderRouter.get('/get-order', getAnOrder)


export default orderRouter