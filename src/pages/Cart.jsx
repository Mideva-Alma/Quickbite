import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

import CartItem from "../components/cart/CartItem";

import OrderSummary from "../components/cart/OrderSummary";

function Cart() {
  const { cart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>

        <Link to="/menu">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Your Cart</h1>

      <div className="cart-grid">
        <div>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <button onClick={clearCart}>
            Clear Cart
          </button>

          <Link to="/menu">
            Continue Shopping
          </Link>
        </div>

        <OrderSummary total={cartTotal} />
      </div>
    </main>
  );
}

export default Cart;