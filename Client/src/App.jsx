import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;