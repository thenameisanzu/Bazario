import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

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

  // Sorting
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

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginatedProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Products</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      />

      {/* Sort */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ddd",
          marginLeft: "10px",
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
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
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

      {paginatedProducts.length === 0 && (
        <p>No products found</p>
      )}

      {/* Products grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "25px",
        }}
      >
        {paginatedProducts.map((product) => (
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

      {/* Pagination */}
      <div
        style={{
          marginTop: "30px",
          display: "flex",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              background: currentPage === index + 1 ? "#0071e3" : "#fff",
              color: currentPage === index + 1 ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;