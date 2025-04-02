import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const secretKey= process.env.JWT_SECRET_KEY

export const protect = async(req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).send({message: "access denied"})
    }
    try {
        const decoded = jwt.verify(token, secretKey)

        console.log(decoded.userId)
           
            const user = await userModel.findById(decoded.userId).select("-password")
            
            if(!user){
              return res.status(403).send({message: "user access forbidden"})
            }
            req.user = {userId: decoded.userId, isAdmin: user.isAdmin}
            next()
    } catch (error) {
        console.log("authentication error", error)
        res.status(400).send({message: "Invalid or expired Token"})
    }
}

export const adminProtect = async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated. Login required." });
      }
  
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
  
      next();
    } catch (error) {
      console.error("Admin Authorization Error:", error);
      return res.status(403).json({ message: "Unauthorized access." });
    }
  };

  