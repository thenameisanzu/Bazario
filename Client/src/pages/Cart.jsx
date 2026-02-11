import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);
  const [message, setMessage] = useState("Loading cart...");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to view cart");
      return;
    }

    fetch("http://localhost:5003/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setMessage("");
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to load cart");
      });
  }, []);

  // Calculate total
  const getCartTotal = () => {
    if (!cart || !Array.isArray(cart.items)) return 0;

    return cart.items.reduce((total, item) => {
      if (!item.product) return total;
      return total + item.product.price * item.quantity;
    }, 0);
  };

  // Update quantity
  const updateQuantity = async (productId, change) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5003/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity: change,
        }),
      });

      const data = await res.json();

      const items = Array.isArray(data.items) ? data.items : [];

      const cleanedItems = items.filter(
        (item) => item.quantity > 0 && item.product
      );

      setCart({
        ...data,
        items: cleanedItems,
      });
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  // Place order (UX Step 1A + 1B)
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    setPlacingOrder(true);

    try {
      const res = await fetch("http://localhost:5003/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Order failed");
        setPlacingOrder(false);
        return;
      }

      // ✅ UX Step 1B
      setOrderSuccess(true);

      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } catch (err) {
      console.error("Place order failed", err);
      alert("Something went wrong");
      setPlacingOrder(false);
    }
  };

  return (
    <div>
      <h2>My Cart</h2>

      {message && <p>{message}</p>}

      {cart && cart.items.length === 0 && (
        <p>Your cart is empty. Add some products.</p>
      )}

      {cart &&
        cart.items.map((item) => (
          <div
            key={item._id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <p>
              <strong>{item.product.name}</strong>
            </p>
            <p>Price: ₹{item.product.price}</p>

            <div>
              <button onClick={() => updateQuantity(item.product._id, -1)}>
                −
              </button>

              <span style={{ margin: "0 10px" }}>{item.quantity}</span>

              <button onClick={() => updateQuantity(item.product._id, 1)}>
                +
              </button>
            </div>

            <p>Subtotal: ₹{item.product.price * item.quantity}</p>
          </div>
        ))}

      {cart && cart.items.length > 0 && (
        <h3>Total: ₹{getCartTotal()}</h3>
      )}

      {orderSuccess && (
        <p style={{ color: "green" }}>
          ✅ Order placed successfully!
        </p>
      )}

      {cart && cart.items.length > 0 && (
        <button onClick={handlePlaceOrder} disabled={placingOrder}>
          {placingOrder ? "Placing order..." : "Place Order"}
        </button>
      )}
    </div>
  );
}

export default Cart;