import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminCreateProduct() {
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

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5003/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create product");
        return;
      }

      alert("Product created successfully");

      // redirect back to admin products
      navigate("/admin/products");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="brand" placeholder="Brand" onChange={handleChange} />
        <input name="image" placeholder="Image URL" onChange={handleChange} required />
        <input name="countInStock" type="number" placeholder="Stock" onChange={handleChange} required />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Product
        </button>
      </form>
    </div>
  );
}

export default AdminCreateProduct;