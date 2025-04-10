import productModel from "../models/productModel.js";

export const createProduct = async (req, res) => {
  const {
    title,
    image,
    price,
    description,
    brand,
    color,
    model,
    category,
    popular,
    discount,
    ratings,
  } = req.body;

  try {
    const product = await productModel.create({ title,
        image,
        price,
        description,
        brand,
        color,
        model,
        category,
        popular,
        discount,
        ratings,})
        res.status(201).json(product)
  } catch (error) {
    res.status(500).send({message: error.message})
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(400).send({ message: "No Product found" });
    }
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .send({ message: "something went wrong while trying to fetch products" });
  }
};

export const getProductByCategory = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;
    const category = req.params.category.toLowerCase();



    const totalProducts = await productModel.countDocuments({ category });
    const products = await productModel.find({ category }).skip(skip).limit(limit);;
    if (!products.length) {
      return res.status(400).send({ message: "No Product found" });
    }
    res.json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      hasNextPage: page * limit < totalProducts,
      hasPrevPage: page > 1
    });
  } catch (error) {
    res.status(500).send({
      message: "something went wrong while trying to fetch categories",
    });
  }
};


export const getSingleProduct = async (req, res) => {
  const {id} = req.params;
  try {
    const product = await productModel.findById(id)
    if(!product) {
      return res.status(400).send({message: "no product found"})
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).send({
      message: "something went wrong while trying to get product" + error.message,
    });
  }
}
