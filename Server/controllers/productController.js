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

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
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

// ⭐ ADD REVIEW
// @desc   Add product review
// @route  POST /api/products/:id/review
// @access Private
const addProductReview = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const { rating, comment } = req.body;

    // ⭐ Prevent duplicate reviews
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this product"
      });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  addProductReview
};