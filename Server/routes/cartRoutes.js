const express = require("express");
const router = express.Router();
const { addToCart } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addToCart);

module.exports = router;