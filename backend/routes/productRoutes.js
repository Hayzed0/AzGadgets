import express from "express"
import { createProduct, deleteProduct, getAllProducts, getProductByCategory, getSingleProduct, updateProduct } from "../controllers/productController.js"
import { protect, adminProtect } from "../middleware/authMiddleware.js"


const productRouter = express.Router()

productRouter.post("/create-product",protect, adminProtect, createProduct)
productRouter.get("/",protect, getAllProducts)
productRouter.put("/update-product/:productId",protect, adminProtect, updateProduct)
productRouter.delete("/delete-product/:productId",protect, adminProtect, deleteProduct)
productRouter.get("/category/:category",protect, getProductByCategory)
productRouter.get("/:id",protect, getSingleProduct)


export default productRouter