import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5003/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCTS:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px" }}>Products</h2>

      {products.length === 0 && <p>No products found</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "25px",
        }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/products/${product._id}`)}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "12px",
              padding: "20px",
              background: "#fff",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

            <h3 style={{ marginBottom: "10px" }}>
              {product.name}
            </h3>

            <p style={{ fontWeight: "bold", fontSize: "18px" }}>
              ₹{product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;