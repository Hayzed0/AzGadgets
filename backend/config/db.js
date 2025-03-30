import mongoose from "mongoose";

const db = process.env.MONGO_DB_URI 

const connectDb = async () => {
    mongoose.connect(db)

    mongoose.connection.on("connected", () => {console.log("Database connected successfully")})
}

export default connectDb