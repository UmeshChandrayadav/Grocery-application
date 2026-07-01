import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, image } = formData;

    if (!name || !price) {
      toast.error("Name and Price are required!");
      return;
    }

    setLoading(true);

    try {
      const newProduct = {
        id: Date.now().toString(),
        ...formData,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/products`, newProduct);

      toast.success("Product added successfully!");
      setFormData({
        name: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl shadow-lg"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-green-700 mb-5 sm:mb-6 md:mb-8">
          Add New Product
        </h2>

        {/* Name */}
        <div className="mb-4 sm:mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4 sm:mb-5">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-5 sm:mb-6">
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 sm:py-3 md:py-3.5 rounded-lg text-sm sm:text-base md:text-lg font-semibold text-white transition-colors ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;