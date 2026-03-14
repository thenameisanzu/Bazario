const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  addProductReview,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// ⭐ Admin routes
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

// ⭐ Logged in users can review
router.post("/:id/review", protect, addProductReview);

module.exports = router;