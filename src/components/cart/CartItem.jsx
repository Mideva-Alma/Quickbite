import { useCart } from "../../context/CartContext";

import QuantityControl from "./QuantityControl";

function CartItem({ item }) {
  const { removeFromCart } = useCart();

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
      />

      <div>
        <h2>{item.name}</h2>

        <p>KSh {item.price} each</p>

        <QuantityControl
          id={item.id}
          quantity={item.quantity}
        />

        <p>
          Item total: KSh {itemTotal}
        </p>

        <button onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;