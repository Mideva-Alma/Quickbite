import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DemoPayment from "../components/checkout/DemoPayment";
import {
  getCustomer,
  getCart,
  getCartTotal,
  placeOrder,
} from "../utils/orderHelpers";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const method = location.state?.method;

  // Read once, so the page doesn't change when the cart is cleared after payment
  const [customer] = useState(() => getCustomer());
  const [cart] = useState(() => getCart());

  if (!method || !customer || cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-12 text-center">
        <p className="mb-4 text-gray-700">
          Nothing to pay for yet. Please review your order first.
        </p>
        <Link to="/review" className="font-bold text-red-500">
          Back to Checkout
        </Link>
      </div>
    );
  }

  const total = getCartTotal(cart);

  const handleSuccess = () => {
    placeOrder({ customer, cart, paymentMethod: method });
    navigate("/order-confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Payment
        </h1>
        <DemoPayment method={method} total={total} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default Payment;
