const Cart = require("../models/Cart");
const Product = require("../models/product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // quantity must be +1 or -1
    if (![1, -1].includes(quantity)) {
      return res.status(400).json({ message: "Invalid quantity change" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // CREATE CART ONLY FOR +1
    if (!cart) {
      if (quantity === 1) {
        cart = new Cart({
          user: req.user._id,
          items: [{ product: productId, quantity: 1 }],
        });
      } else {
        return res.json({ items: [] });
      }
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;

        // REMOVE ITEM AT ZERO
        if (cart.items[itemIndex].quantity === 0) {
          cart.items.splice(itemIndex, 1);
        }
      } else {
        // add new item only for +1
        if (quantity === 1) {
          cart.items.push({ product: productId, quantity: 1 });
        }
      }
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res.json(populatedCart);
  } catch (error) {
    console.error("ADD TO CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCart };