import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
    countInStock: "",
  });

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔥 Fetch existing product
  useEffect(() => {
    fetch(`http://localhost:5003/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          category: data.category || "",
          brand: data.brand || "",
          image: data.image || "",
          countInStock: data.countInStock || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5003/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      alert("Product updated successfully");
      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="name" value={formData.name} onChange={handleChange} />
        <input name="description" value={formData.description} onChange={handleChange} />
        <input name="price" type="number" value={formData.price} onChange={handleChange} />
        <input name="category" value={formData.category} onChange={handleChange} />
        <input name="brand" value={formData.brand} onChange={handleChange} />
        <input name="image" value={formData.image} onChange={handleChange} />
        <input name="countInStock" type="number" value={formData.countInStock} onChange={handleChange} />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;