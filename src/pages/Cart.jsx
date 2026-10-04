import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";

import OrderSummary from "../components/cart/OrderSummary";
import "./Cart.css";

function Cart() {
  const { cart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>

        <div className="empty-cart">
          <p>Your cart is empty.</p>

          <Link className="continue-shopping" to="/menu">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <div className="cart-actions">
            <button className="clear-cart" onClick={clearCart}>
              Clear Cart
            </button>

            <Link className="continue-shopping" to="/menu">
              Continue Shopping
            </Link>
          </div>
        </div>

        <OrderSummary total={cartTotal} />
      </div>
    </main>
  );
}

export default Cart;