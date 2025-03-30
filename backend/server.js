import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import productRouter from "./routes/productRoutes.js";


const app = express();

app.use(cors());

app.use(express.json());



const port = process.env.PORT || 5000;
connectDb();




app.use("/api/products", productRouter)

app.get("/", (req, res) => {
  res.send({ message: "app running" });
});



app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
