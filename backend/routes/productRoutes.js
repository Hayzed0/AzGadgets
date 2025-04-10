import express from "express"
import { createProduct, getAllProducts, getProductByCategory, getSingleProduct } from "../controllers/productController.js"


const productRouter = express.Router()

productRouter.post("/create-product", createProduct)
productRouter.get("/", getAllProducts)
productRouter.get("/category/:category", getProductByCategory)
productRouter.get("/:id", getSingleProduct)


export default productRouter