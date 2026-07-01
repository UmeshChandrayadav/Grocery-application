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

  // ✅ COMMON VALIDATION
  const validatePayment = () => {
    if (user == null) {
      toast.error("Please login to place the order");
      navigate("/login");
      return false;
    }

    if (!paymentMethod) {
      toast.error("Please select payment method");
      return false;
    }

    if (paymentMethod === "UPI" && !upiId) {
      toast.error("Enter UPI ID");
      return false;
    }

    if (paymentMethod === "Card") {
      const { cardNumber, expiry, cvv } = cardDetails;
      if (!cardNumber || !expiry || !cvv) {
        toast.error("Fill all card details");
        return false;
      }
    }

    return true;
  };

  // ✅ ORDER ALL ITEMS
  const handleOrderAll = () => {
    if (!validatePayment()) return;

    cart.forEach(item => {
      toast.success(`${item.name} ordered 🎉`);
    });

    setOrderPlaced(true);
  };

  // ✅ ORDER SINGLE ITEM
  const handleSingleOrder = (item) => {
    if (!validatePayment()) return;

    toast.success(`${item.name} ordered 🎉`);
  };

  // ✅ SUCCESS PAGE
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Order Placed Successfully 🎉
          </h2>
          <p>Payment Method: {paymentMethod}</p>
          <p className="mt-2 font-semibold">Total: ₹{total}</p>
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
        <div className="max-w-5xl mx-auto bg-white shadow rounded p-6">

          {/* 🛒 ITEMS */}
          {cart.map(item => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center border-b py-4 gap-4"
            >

              {/* INFO */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
              </div>

              {/* QUANTITY */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  −
                </button>

                <span className="font-bold text-lg text-green-600">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col sm:flex-row items-center gap-3">

                <p className="font-semibold">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => handleSingleOrder(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Order Now
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

          {/* 🧾 SUMMARY */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold text-green-600">
                ₹{total}
              </span>
            </div>
          </div>

          {/* 💳 PAYMENT */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">Payment</h3>

            <div className="space-y-3">

              <label className="flex gap-2">
                <input type="radio" value="COD"
                  onChange={(e)=>setPaymentMethod(e.target.value)} />
                Cash on Delivery
              </label>

              <label className="flex gap-2">
                <input type="radio" value="UPI"
                  onChange={(e)=>setPaymentMethod(e.target.value)} />
                UPI
              </label>

              {paymentMethod === "UPI" && (
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e)=>setUpiId(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                />
              )}

              <label className="flex gap-2">
                <input type="radio" value="Card"
                  onChange={(e)=>setPaymentMethod(e.target.value)} />
                Card
              </label>

              {paymentMethod === "Card" && (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={(e)=>setCardDetails({...cardDetails,cardNumber:e.target.value})}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e)=>setCardDetails({...cardDetails,expiry:e.target.value})}
                      className="w-1/2 border px-3 py-2 rounded"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e)=>setCardDetails({...cardDetails,cvv:e.target.value})}
                      className="w-1/2 border px-3 py-2 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ✅ ORDER ALL */}
          <button
            onClick={handleOrderAll}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded font-semibold hover:bg-green-700"
          >
            Place Order (All Items)
          </button>

        </div>
      )}
    </div>
  );
};

export default Cart;