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
        console.log("PRODUCT DATA:", data); // debug
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

        <div style={{ maxWidth: "500px" }}>
          <h2>{product.name}</h2>

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
    </div>
  );
}

export default ProductDetails;