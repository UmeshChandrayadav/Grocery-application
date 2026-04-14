// src/Components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-green-600 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4 items-center">
        <Link to="/" className="font-bold text-lg">
          FreshGrocer
        </Link>

        {/* Admin Links */}
        {isAuthenticated && isAdmin && (
          <>
            <Link to="/add-product" className="hover:underline">
              Add Product
            </Link>
            <Link to="/update-product" className="hover:underline">
              Update Product
            </Link>
            <Link to="/delete-product" className="hover:underline">
              Delete Product
            </Link>
          </>
        )}

        {/* User Links */}
        {isAuthenticated && !isAdmin && (
          <>
            {/* Change /shop to /products */}
            <Link to="/products" className="hover:underline">
              Shop Now
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
          </>
        )}
      </div>

      {/* Login / Signup or Logout */}
      <div className="flex space-x-4">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </>
        )}

        {isAuthenticated && (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;