import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        products.map(product => (
          <div key={product._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;