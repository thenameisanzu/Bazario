import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("Loading product...");

  useEffect(() => {
    fetch(`http://localhost:5003/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Failed to load product");
      });
  }, [id]);

  if (message) return <p>{message}</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{product.name}</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        ₹{product.price}
      </p>
      <p style={{ marginTop: "20px" }}>
        {product.description || "No description available."}
      </p>
    </div>
  );
}

export default ProductDetails;