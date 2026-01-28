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

  return (
    <div>
      <h2>Products</h2>

      {products.length === 0 && <p>No products found</p>}

      {products.map((p) => (
        <div key={p._id}>
          <p>{p.name}</p>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;