import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    fetch("http://localhost:5003/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("PRODUCTS:", data);
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", "Smartphones", "Laptops", "Accessories"];

  // Category filter
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Search filter
  const visibleProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedProducts = [...visibleProducts];

if (sortOption === "priceLow") {
  sortedProducts.sort((a, b) => a.price - b.price);
}

if (sortOption === "priceHigh") {
  sortedProducts.sort((a, b) => b.price - a.price);
}

if (sortOption === "newest") {
  sortedProducts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />
      <select
  value={sortOption}
  onChange={(e) => setSortOption(e.target.value)}
  style={{
    padding: "8px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #ddd"
  }}
>
  <option value="default">Sort By</option>
  <option value="priceLow">Price: Low → High</option>
  <option value="priceHigh">Price: High → Low</option>
  <option value="newest">Newest</option>
</select>

      {/* Category buttons */}
      <div style={{ marginBottom: "25px", display: "flex", gap: "10px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              background: selectedCategory === cat ? "#0071e3" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p>No products found</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "25px",
        }}
      >
        {sortedProducts.map((product) => (
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