import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Shop = () => {
  const { user } = useAuth();
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiry: "", cvv: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleOrder = () => {
    if (!user) {
      toast.error("Please login to place the order");
      navigate("/login");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (paymentMethod === "UPI" && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }

    if (paymentMethod === "Card") {
      const { cardNumber, expiry, cvv } = cardDetails;
      if (!cardNumber || !expiry || !cvv) {
        toast.error("Please fill all card details");
        return;
      }
    }

    addToCart({ ...selectedProduct, quantity: 1 });

    toast.success("Order placed successfully 🎉");
    setOrderPlaced(true);

    localStorage.setItem("currentOrder", JSON.stringify({ ...selectedProduct, quantity: 1 }));
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded shadow text-center max-w-sm sm:max-w-md">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-2">
            Order Placed Successfully 🎉
          </h2>
          <p className="text-sm sm:text-base">Payment Method: {paymentMethod}</p>
          <p className="mt-2 font-semibold text-base sm:text-lg">
            Total Amount: ₹{total}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 sm:py-10 px-3 sm:px-4 md:px-6 lg:px-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
        Our Products
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 sm:h-40 md:h-44 object-cover mb-2 sm:mb-3 rounded"
            />

            <h3 className="font-semibold text-base sm:text-lg md:text-xl line-clamp-1">
              {product.name}
            </h3>

            <p className="text-green-600 font-semibold text-sm sm:text-base md:text-lg mt-1">
              ₹{product.price}
            </p>

            {/* Payment options */}
            <div className="mt-3 space-y-2">
              <select
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setSelectedProduct(product);
                }}
                className="w-full border px-3 py-2 rounded text-sm sm:text-base"
              >
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>

              {paymentMethod === "UPI" && selectedProduct?.id === product.id && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                />
              )}

              {paymentMethod === "Card" && selectedProduct?.id === product.id && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Expiry MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvv: e.target.value })
                    }
                    className="w-full border px-3 py-2 rounded text-sm sm:text-base"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => handleOrder()}
              className="mt-3 w-full bg-green-600 text-white px-3 py-2 sm:py-2.5 rounded text-sm sm:text-base hover:bg-green-700 transition"
            >
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;