import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600/90 backdrop-blur-md text-white px-4 sm:px-6 md:px-8 py-3 shadow-lg sticky top-0 z-50 border-b border-green-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="font-bold text-lg sm:text-xl">
          🛒FreshGrocer
        </Link>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">

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
              <Link to="/products" className="hover:underline">
                Products
              </Link>
              <Link to="/cart" className="hover:underline">
                cart
              </Link>
            </>
          )}

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 bg-green-700 p-4 rounded-lg">

          {/* Admin Links */}
          {isAuthenticated && isAdmin && (
            <>
              <Link to="/add-product" onClick={()=>setMenuOpen(false)}>Add Product</Link>
              <Link to="/update-product" onClick={()=>setMenuOpen(false)}>Update Product</Link>
              <Link to="/delete-product" onClick={()=>setMenuOpen(false)}>Delete Product</Link>
            </>
          )}

          {/* User Links */}
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/products" onClick={()=>setMenuOpen(false)}>Products</Link>
              <Link to="/cart" onClick={()=>setMenuOpen(false)}>Cart</Link>
            </>
          )}

          {/* Auth */}
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={()=>setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={()=>setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="bg-red-500 px-3 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;