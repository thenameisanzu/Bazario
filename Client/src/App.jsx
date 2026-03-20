import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProtectedRoute from "./pages/ProtectedRoute";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import AdminEditProduct from "./pages/AdminEditProduct";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin/products"
  element={
    <ProtectedRoute>
      <AdminProducts />
    </ProtectedRoute>
  }
/><Route
  path="/admin/create-product"
  element={
    <ProtectedRoute>
      <AdminCreateProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/product/:id/edit"
  element={
    <ProtectedRoute>
      <AdminEditProduct />
    </ProtectedRoute>
  }
/>



      </Routes>
    </>
  );
}

export default App;