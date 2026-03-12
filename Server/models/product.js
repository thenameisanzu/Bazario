const mongoose = require("mongoose");

// Review Schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true,
      default: 0
    },

    category: {
      type: String,
      required: true
    },

    brand: {
      type: String
    },

    image: {
      type: String,
      required: true
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0
    },

    rating: {
      type: Number,
      default: 0
    },

    numReviews: {
      type: Number,
      default: 0
    },

    // ⭐ NEW FIELD
    reviews: [reviewSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema);