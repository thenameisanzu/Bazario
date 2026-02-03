import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Loading orders...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to view orders");
      return;
    }

    fetch("http://localhost:5003/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setMessage("");
      })
      .catch(() => {
        setMessage("Failed to load orders");
      });
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {message && <p>{message}</p>}

      {orders.length === 0 && !message && (
        <p>No orders found</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
        >
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Orders;