import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async () => {
    if (!selectedProductId) {
      toast.error("Select a product first");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/products/${selectedProductId}`);
      toast.success("Product deleted successfully");
      setProducts(products.filter(p => p.id !== selectedProductId));
      setSelectedProductId("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 md:px-8 py-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-white shadow-lg rounded-xl p-5 sm:p-6 md:p-8">
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Delete Product
        </h2>

        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="w-full border px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select a product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleDelete}
          className="w-full bg-red-600 text-white py-2 sm:py-3 rounded text-sm sm:text-base md:text-lg font-semibold hover:bg-red-700 transition"
        >
          Delete Product
        </button>

      </div>
    </div>
  );
};

export default DeleteProductForm;