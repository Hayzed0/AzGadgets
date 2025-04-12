import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";
import Stripe from "stripe";
import mongoose from "mongoose";
import { v4 as uuidV4 } from "uuid";

const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeKey);

export const createOrder = async (req, res) => {
  const {
    fullName,
    email,
    address,
    phoneNumber,
    productIds,
    totalPrice,
    totalQuantity,
  } = req.body;
  try {
    const products = await productModel.find({ _id: { $in: productIds } });

    const line_items = products.map((product) => ({
      price_data: {
        currency: "GBP",
        product_data: {
          name: product.name || `Product ID: ${product._id}`,
        },
        unit_amount: product.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    const order = new orderModel({
      fullName,
      email,
      address,
      phoneNumber,
      productIds,
      totalPrice,
      totalQuantity,
      transactionId: session.id, // Use the session ID as the transaction ID
    });

    await order.save();

    return res.status(201).json({ sessionId: session.id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAnOrder = async (req, res) => {
  const { email } = req.params;
  try {
    if (!email) {
      return res.status(400).send({ message: "user not found" });
    }
    const orders = await orderModel.find({ email });
    if ( orders.length === 0) {
      return res.status(400).send({ message: "no Order found for this user" });
    }

    // Get product details for each order
    const ordersWithProducts = await Promise.all(
      orders.map(async (order) => {
        const products = await productModel.find({
          _id: { $in: order.productIds },
        });

        return {
          ...order.toObject(),
          products,
        };
      })
    );
    res.status(200).json(ordersWithProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getPaymentStatus = async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelAnOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    return res.status(400).json({ message: "Invalid order ID format" });
  }
  try {
    const order = await orderModel.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(400).send({ message: "order not found" });
    }
    res.status(202).send({ message: "order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await orderModel.find()
    if(!orders || orders.length === 0){
      return res.status(400).send({message: "no order found"})
    }
    const orderWithProd = await Promise.all(
      orders.map(async (order) => {
        const products = await productModel.find({ _id: {$in: order.productIds}})
         
        return {
          ...order.toObject(),
          products
        }
      } )
    )
    res.status(200).json(orderWithProd)
  } catch (error) {
    res.status(500).send({message: error.message})
  }
}
