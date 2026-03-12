const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  addProductReview
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");

// Get all products
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

// Create product
router.post("/", createProduct);

// ⭐ Add review
router.post("/:id/review", protect, addProductReview);

module.exports = router;