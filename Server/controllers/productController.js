const Product = require("../models/product");

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Create a product
// @route  POST /api/products
// @access Public (admin later)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      image,
      countInStock
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      image,
      countInStock
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProducts, createProduct };