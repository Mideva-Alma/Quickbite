import { useCart } from "../../context/CartContext";

function QuantityControl({ id, quantity }) {
  const { increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="quantity-control">
      <button onClick={() => decreaseQuantity(id)}>
        -
      </button>

      <span>{quantity}</span>

      <button onClick={() => increaseQuantity(id)}>
        +
      </button>
    </div>
  );
}

export default QuantityControl;