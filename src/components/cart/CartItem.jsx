import { useCart } from "../../context/CartContext";

import QuantityControl from "./QuantityControl";

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img
        className="cart-item-image"
        src={item.image}
        alt={item.name}
      />

      <div className="cart-item-details">
        <h2>{item.name}</h2>

        <p className="cart-item-price">
          KSh {item.price} each
        </p>

        <QuantityControl
          id={item.id}
          quantity={item.quantity}
        />

        <p className="cart-item-total">
          Item total: KSh {itemTotal}
        </p>

        <button
          className="remove-item"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;