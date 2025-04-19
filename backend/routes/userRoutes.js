import express from "express";
import { getAllUsers, getUser, login, register } from "../controllers/userController.js";
import { adminProtect, protect } from "../middleware/authMiddleware.js";


const userRouter = express.Router()

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/",protect,  getUser)
userRouter.get("/get-all-users",protect, adminProtect,  getAllUsers)


export default userRouter
