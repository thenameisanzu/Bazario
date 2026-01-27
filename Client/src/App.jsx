function App() {
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    const res = await fetch("http://localhost:5003/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: "696c4bd33dc417d6f5065d49",
        quantity: 1,
      }),
    });

    const data = await res.json();
    console.log("CART RESPONSE:", data);
  };

  return (
    <div>
      <h1>Test Cart</h1>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default App;