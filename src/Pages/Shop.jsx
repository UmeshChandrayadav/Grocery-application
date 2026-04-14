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
      .get("http://localhost:3000/products")
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

    // Add product to cart
    addToCart({ ...selectedProduct, quantity: 1 });

    toast.success("Order placed successfully 🎉");
    setOrderPlaced(true);

    // Store in localStorage for order page
    localStorage.setItem("currentOrder", JSON.stringify({ ...selectedProduct, quantity: 1 }));
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Order Placed Successfully 🎉
          </h2>
          <p>Payment Method: {paymentMethod}</p>
          <p className="mt-2 font-semibold">Total Amount: ₹{total}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-green-600 font-semibold">₹{product.price}</p>

            {/* Payment options */}
            <div className="mt-3">
              <select
                value={paymentMethod}
                onChange={(e) => { setPaymentMethod(e.target.value); setSelectedProduct(product); }}
                className="w-full border px-3 py-2 rounded mb-2"
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
                  className="w-full border px-3 py-2 rounded mb-2"
                />
              )}

              {paymentMethod === "Card" && selectedProduct?.id === product.id && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Expiry MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => handleOrder()}
              className="mt-2 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
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