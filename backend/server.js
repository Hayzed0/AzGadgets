import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://az-gadgets.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

const port = process.env.PORT || 5000;
connectDb();

app.use("/api/products", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send({ message: "app running" });
});

app.listen(port, () => {
  console.log(`app running on port: ${port}`);
});
