import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5003/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCT DATA:", data);
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5003/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("ADD TO CART RESPONSE:", data);

      alert("Product added to cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading product...</p>;
  }

  if (!product) {
    return <p style={{ padding: "40px" }}>Product not found</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <button
        onClick={() => navigate("/products")}
        style={{
          marginBottom: "20px",
          padding: "8px 12px",
          border: "none",
          background: "#eee",
          cursor: "pointer",
        }}
      >
        ← Back to Products
      </button>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* Product Image */}
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        {/* Product Info */}
        <div style={{ maxWidth: "500px" }}>
          <h2>{product.name}</h2>

          {/* Rating */}
          <p style={{ marginTop: "5px" }}>
            ⭐ {product.rating?.toFixed(1) || 0} ({product.numReviews || 0} reviews)
          </p>

          <p
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            ₹{product.price}
          </p>

          <p style={{ marginBottom: "20px" }}>
            {product.description || "No description available."}
          </p>

          <button
            onClick={addToCart}
            style={{
              padding: "12px 20px",
              borderRadius: "6px",
              border: "none",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ marginTop: "50px", maxWidth: "700px" }}>
        <h3>Reviews</h3>

        {!product.reviews || product.reviews.length === 0 && (
          <p>No reviews yet</p>
        )}

        {product.reviews &&
          product.reviews.map((review) => (
            <div
              key={review._id}
              style={{
                borderBottom: "1px solid #eee",
                padding: "15px 0",
              }}
            >
              <p>
                <strong>⭐ {review.rating}</strong>
              </p>

              <p>{review.comment}</p>

              <small style={{ color: "#666" }}>
                {new Date(review.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductDetails;