const express = require("express");
const router = express.Router();

const { addToCart, getCart } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, addToCart);
router.get("/", protect, getCart);

module.exports = router;