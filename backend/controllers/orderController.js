import orderModel from "../models/orderModel.js";
import Stripe from "stripe";
import { v4 as uuidV4 } from "uuid";

const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeKey);

export const createOrder = async (req, res) => {
  const {
    fullName,
    email,
    address,
    phone,
    productIds,
    totalPrice,
    totalQuantity,
    token,
  } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalPrice * 100,
        customer: customer.id,
        currency: "GBP",
        receipt_email: token.email,
        description: "Order Payment",
      }, {
        idempotencyKey: uuidV4()
      }
    );
    if(payment){
      const order = new orderModel({
        fullName,
        email,
        address,
        phone,
        productIds,
        totalPrice,
        totalQuantity,
        transactionIds: "1234"
      })

      await order.save()

      return res.status(200).json(order)
    }

    res.status(400).send({message: "payment not successful"})
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getAnOrder = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res.status(400).send({ message: "user not found" });
    }
    const orders = await orderModel.find({ email }).sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(400).send({ message: "no Order found for this user" });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
