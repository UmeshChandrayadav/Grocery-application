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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, image } = formData;

    if (!name || !price) {
      toast.error("Name and Price are required!");
      return;
    }

    setLoading(true);

    try {
      // Auto-generate ID using timestamp or random number
      const newProduct = {
        id: Date.now().toString(), // simple auto-generated ID
        ...formData,
      };

      // Replace URL with your API endpoint
      await axios.post("http://localhost:3000/products", newProduct);

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
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Add New Product
        </h2>

        {/* Name */}
        <div className="mb-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-5">
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL (optional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
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