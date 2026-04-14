// src/Components/Admin/DeleteProductForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const DeleteProductForm = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async () => {
    if (!selectedProductId) {
      toast.error("Select a product first");
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/products/${selectedProductId}`);
      toast.success("Product deleted successfully");
      setProducts(products.filter(p => p.id !== selectedProductId));
      setSelectedProductId("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Delete Product</h2>

      <select
        value={selectedProductId}
        onChange={(e) => setSelectedProductId(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      >
        <option value="">Select a product</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <button
        onClick={handleDelete}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Delete Product
      </button>
    </div>
  );
};

export default DeleteProductForm;