// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Products from "./Pages/Product";
import Signup from "./Pages/Signup";
import AddProductForm from "./Pages/AddProductForm";
import UpdateProductForm from "./Pages/UpdateProductForm";
import DeleteProductForm from "./Pages/DeleteProductForm";

// ✅ ProtectedRoute lives here — inside BrowserRouter via AppRoutes
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
};

// ✅ All routes in a separate component — this renders INSIDE BrowserRouter
const AppRoutes = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

        <Route path="/products" element={
          <ProtectedRoute><Products /></ProtectedRoute>
        } />
        <Route path="/add-product" element={
          <ProtectedRoute adminOnly={true}><AddProductForm /></ProtectedRoute>
        } />
        <Route path="/update-product" element={
          <ProtectedRoute adminOnly={true}><UpdateProductForm /></ProtectedRoute>
        } />
        <Route path="/delete-product" element={
          <ProtectedRoute adminOnly={true}><DeleteProductForm /></ProtectedRoute>
        } />
        <Route path="/shop" element={
          <ProtectedRoute><Shop /></ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute><Cart /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

// ✅ App just handles providers
const App = () => {
  return (
    <BrowserRouter>          {/* ✅ BrowserRouter OUTERMOST */}
      <AuthProvider>         {/* ✅ Auth inside Router */}
        <CartProvider>
          <AppRoutes />      {/* ✅ All routes inside Router + Auth */}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;