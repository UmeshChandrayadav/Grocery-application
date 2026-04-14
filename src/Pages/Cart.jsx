import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: ""
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    // 🔐 Login check
    if (user == null) {
      toast.error("Please login to place the order");
      navigate("/login");
      return;
    }

    // 💳 Payment validation
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

    toast.success("Order placed successfully 🎉");
    setOrderPlaced(true);
  };

  // ✅ Order success screen
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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Cart is empty
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow rounded p-6">

          {/* 🛒 Cart Items */}
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              {/* Product Info */}
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  −
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>

              {/* Item Total */}
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          {/* 🧾 Order Summary */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold mb-2">
              Order Summary
            </h3>
            <div className="flex justify-between">
              <span>Total Amount</span>
              <span className="font-semibold text-green-600">
                ₹{total}
              </span>
            </div>
          </div>

          {/* 💳 Payment Options */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-2">
              Payment Method
            </h3>

            <div className="space-y-3">

              {/* COD */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              {/* UPI */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>

              {paymentMethod === "UPI" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID (example@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              )}

              {/* Card */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Debit / Credit Card
              </label>

              {paymentMethod === "Card" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardNumber: e.target.value
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                  />

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          expiry: e.target.value
                        })
                      }
                      className="w-1/2 border px-3 py-2 rounded"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cvv: e.target.value
                        })
                      }
                      className="w-1/2 border px-3 py-2 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ✅ Place Order */}
          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
          >
            Place Order
          </button>

        </div>
      )}
    </div>
  );
};

export default Cart;
