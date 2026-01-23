const express = require("express");
const router = express.Router();

const { placeOrder } = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, placeOrder);

module.exports = router;