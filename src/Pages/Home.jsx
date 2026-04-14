import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered</h1>
        <p className="mb-6">Buy fresh vegetables, fruits & daily essentials</p>

        {/* Only show Shop Now for users */}
        {!isAdmin && (
          <Link
            to="/shop"
            className="bg-white text-green-600 px-6 py-3 rounded font-semibold"
          >
            Shop Now
          </Link>
        )}
      </section>

      {/* Category Cards (common for both users/admin) */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="font-bold text-lg">Vegetables</h3>
          <img
            src="/src/assets/vegetables.webp"
            // alt="Vegetables"
            className="w-full h-62 object-cover rounded mb-3"
          />
          <p className="text-green-600">Up to 30% OFF</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="font-bold text-lg">Dairy</h3>
          <img
            src="/src/assets/Dairy.avif"
            // alt="Vegetables"
            className="w-full h-62 object-cover rounded mb-3"
          />
          <p className="text-green-600">Flat 15% OFF</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="font-bold text-lg">Fruits</h3>
          <img
            src="/src/assets/fruits.webp"
            // alt="Vegetables"
            className="w-full h-42 object-cover rounded mb-3"
          />
          <p className="text-green-600">Flat 15% OFF</p>
        </div>
      </section>

      {/* Admin Actions Section */}
      {/* {isAdmin && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Actions</h2>
          <div className="flex justify-center gap-6">
            <Link
              to="/add-product"
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Add Product
            </Link>
            <Link
              to="/update-product"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Update Product
            </Link>
            <Link
              to="/delete-product"
              className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
            >
              Delete Product
            </Link>
          </div>
        </section>
      )} */}
    </div>
  );
};

export default Home;