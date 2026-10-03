import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCart,
  getCartTotal,
  getCustomer,
  updateCartQuantity,
  removeFromCart,
  saveCustomer,
} from "../utils/orderHelpers";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => getCart());
  const [customer, setCustomer] = useState(
    () => getCustomer() || { fullName: "", phone: "", tableNumber: "" }
  );
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const phoneDigits = customer.phone.replace(/\D/g, "");

    if (!customer.fullName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (phoneDigits.length < 9) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!Number(customer.tableNumber) || Number(customer.tableNumber) < 1) {
      setError("Please enter your table number.");
      return;
    }

    saveCustomer({ ...customer, fullName: customer.fullName.trim() });
    navigate("/review");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12 text-center">
        <p className="mb-4 text-gray-700">Your cart is empty.</p>
        <Link to="/menu" className="font-bold text-red-500">
          Go to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-center text-3xl font-bold text-gray-800">
          Your Cart
        </h1>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="divide-y">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-3 text-gray-700"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">KSh {item.price} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCart(updateCartQuantity(item.id, item.quantity - 1))
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setCart(updateCartQuantity(item.id, item.quantity + 1))
                    }
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="font-semibold">KSh {item.price * item.quantity}</p>
                  <button className="text-sm text-red-500" type="button" onClick={() => setCart(removeFromCart(item.id))}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold text-gray-800">
            <span>Total</span> <span>KSh {getCartTotal(cart)}</span>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Your Details</h2>

          <input className="mb-3 w-full" name="fullName" placeholder="Full name" value={customer.fullName} onChange={handleChange}/>
          <input className="mb-3 w-full" name="phone" placeholder="Phone number" value={customer.phone} onChange={handleChange} />
          <input className="w-full" name="tableNumber" type="number" min="1" placeholder="Table number" value={customer.tableNumber} onChange={handleChange} />
        </div>
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="flex gap-3">
          <Link
            to="/menu" className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-bold text-gray-700"
          >
            Add More Food
          </Link>
          <button className="flex-1 rounded-lg bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600" type="button" onClick={handleSubmit}>Continue to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;