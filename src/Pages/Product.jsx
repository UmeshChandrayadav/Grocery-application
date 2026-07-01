import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => setProducts(res.data));
  }, []);

  let handleAddToCart = (product) => {
    addToCart(product);
    navigate("/Cart");
  };
  
  return (
    <div className="bg-gray-100 min-h-screen py-8 sm:py-10 px-3 sm:px-4 md:px-6 lg:px-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
        Our Products
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 text-center border"
          >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />

              <h3 className="font-semibold text-lg text-gray-800">
                {product.name}
              </h3>

              <p className="text-emerald-600 font-bold text-lg mt-1">
                ₹{product.price}
              </p>

              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
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
