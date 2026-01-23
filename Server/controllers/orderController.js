const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @desc   Place order
// @route  POST /api/orders
// @access Private
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // calculate total (simple version)
    let totalAmount = 0;
    cart.items.forEach((item) => {
      totalAmount += item.quantity * 100; // temp price logic
    });

    const order = new Order({
      user: req.user._id,
      items: cart.items,
      totalAmount
    });

    await order.save();

    // clear cart after order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { placeOrder };