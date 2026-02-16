import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5003/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCTS DATA:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addToCart = async (productId) => {
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
          productId,
          quantity: 1,
        }),
      });

      const data = await res.json();
      console.log("ADD TO CART RESPONSE:", data);
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
  <div style={{ padding: "40px" }}>
    <h2 style={{ marginBottom: "30px" }}>Products</h2>

    {products.length === 0 && <p>No products found</p>}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {products.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ marginBottom: "10px" }}>
              {product.name}
            </h3>

            <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
              ₹{product.price}
            </p>
          </div>

          <button
            onClick={() => addToCart(product._id)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "none",
              background: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Products;