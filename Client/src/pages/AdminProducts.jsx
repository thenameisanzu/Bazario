import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchProducts = () => {
    setLoading(true);

    fetch("http://localhost:5003/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:5003/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchProducts(); // refresh list
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Products</h2>

      {/* ✅ Add Product Button */}
      <button
        onClick={() => navigate("/admin/create-product")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        + Add Product
      </button>

      {/* ✅ Loading State */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>

                <td>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProducts;