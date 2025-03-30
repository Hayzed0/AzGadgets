import express from "express"
import { createProduct, getAllProducts, getProductByCategory } from "../controllers/productController.js"


const productRouter = express.Router()

productRouter.post("/create-product", createProduct)
productRouter.get("/get-all-products", getAllProducts)
productRouter.get("/category/:category", getProductByCategory)


export default productRouter