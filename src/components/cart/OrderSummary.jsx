import { Link } from "react-router-dom";

function OrderSummary({ total }) {
  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <p className="order-total">
        Total: <strong>KSh {total}</strong>
      </p>

      <Link className="checkout-link" to="/customer-details">
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default OrderSummary;