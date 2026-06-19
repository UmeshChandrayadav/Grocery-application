import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white text-center py-12 sm:py-16 md:py-20 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Fresh Groceries Delivered
        </h1>
        <p className="mb-6 text-sm sm:text-base">
          Buy fresh vegetables, fruits & daily essentials
        </p>

        {/* Only show Shop Now for users */}
        {!isAdmin && (
          <Link
            to="/shop"
            className="bg-white text-green-600 px-5 py-2.5 sm:px-6 sm:py-3 rounded font-semibold text-sm sm:text-base inline-block"
          >
            Shop Now
          </Link>
        )}
      </section>

      {/* Category Cards (common for both users/admin) */}
      {/* Offers Section */}
<section className="max-w-6xl mx-auto px-4 py-10">

  {/* Title */}
  <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
    <span className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-xl shadow-sm">
      Offers
    </span>
  </h1>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

    {/* Card 1 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center">
      <h3 className="font-bold text-lg mb-2">Vegetables</h3>
      <img
        src="/src/assets/vegetables.webp"
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <p className="text-green-600 font-semibold">Up to 30% OFF</p>
    </div>

    {/* Card 2 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center">
      <h3 className="font-bold text-lg mb-2">Dairy</h3>
      <img
        src="/src/assets/Dairy.avif"
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <p className="text-green-600 font-semibold">Flat 15% OFF</p>
    </div>

    {/* Card 3 */}
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center">
      <h3 className="font-bold text-lg mb-2">Fruits</h3>
      <img
        src="/src/assets/fruits.webp"
        className="w-full h-44 object-cover rounded-lg mb-3"
      />
      <p className="text-green-600 font-semibold">Flat 15% OFF</p>
    </div>

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