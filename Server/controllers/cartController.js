const Cart = require("../models/Cart");
const Product = require("../models/product");

// @desc   Add product to cart
// @route  POST /api/cart
// @access Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // find user's cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // create new cart
      cart = new Cart({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
    } else {
      // check if product already in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart };