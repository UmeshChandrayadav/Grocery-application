import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(res => setProducts(res.data));
  }, []);
  let handleAddToCart=(product)=>{
    addToCart(product);
    navigate("/Cart");
  }
  
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Our Products
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded shadow p-4 text-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-3"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-green-600 font-semibold">
              ₹{product.price}
            </p>

            <button
              onClick={() => handleAddToCart(product)} // 👈
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
