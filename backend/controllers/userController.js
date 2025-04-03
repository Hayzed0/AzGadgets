import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const secretKey = process.env.JWT_SECRET_KEY;

const generateToken = (userId) => {
  const token = jwt.sign({userId}, secretKey, {
    expiresIn: "30d",
  });
  return token;
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).send({ message: "fill all details correctly" });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(400).send({ message: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send({ message: "invalid details" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "invalid credentials" });
    }
    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({ ...safeUser, token: generateToken(user._id) });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "no user found " });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "server error", error: error.message });
  }
};
