// src/Components/Admin/UpdateProductForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    // Load all products for dropdown
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedProductId(id);
    const prod = products.find((p) => p.id === id || p.id === parseInt(id));
    if (prod) setUpdatedProduct({ name: prod.name, price: prod.price, image: prod.image });
  };

  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      toast.error("Select a product first");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/products/${selectedProductId}`, updatedProduct);
      toast.success("Product updated successfully");
      // Optional: reset form
      setSelectedProductId("");
      setUpdatedProduct({ name: "", price: "", image: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Update Product
        </h2>

        {/* Product Dropdown */}
        <select
          value={selectedProductId}
          onChange={handleSelect}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select a product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        {/* Update Form */}
        {selectedProductId && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProductForm;