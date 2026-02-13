import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setCartCount(0);
    return;
  }

  fetch("http://localhost:5003/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.items && Array.isArray(data.items)) {
        const totalItems = data.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(totalItems);
      }
    })
    .catch(() => {
      setCartCount(0);
    });
}, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "#222",
        color: "#fff",
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
          Bazario
        </Link>
      </h2>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/products" style={linkStyle}>
          Products
        </Link>

        {token && (
          <>
            <Link to="/cart" style={linkStyle}>
  Cart ({cartCount})
</Link>

            <Link to="/orders" style={linkStyle}>
              Orders
            </Link>

            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        )}

        {!token && (
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const buttonStyle = {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
};

export default Navbar;