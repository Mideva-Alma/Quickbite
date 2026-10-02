const CUSTOMER_KEY = "quickbite_customer";
const CART_KEY = "quickbite_cart";
const ORDERS_KEY = "quickbite_orders";

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function getCustomer() {
  return readJSON(CUSTOMER_KEY, null);
}

export function getCart() {
  return readJSON(CART_KEY, []);
}

export function getOrders() {
  return readJSON(ORDERS_KEY, []);
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function generateOrderId() {
  return `ORD-${1001 + getOrders().length}`;
}

export function placeOrder({ customer, cart, paymentMethod }) {
  const order = {
    id: generateOrderId(),
    customerName: customer.fullName,
    phone: customer.phone,
    tableNumber: Number(customer.tableNumber),
    items: cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    total: getCartTotal(cart),
    paymentMethod,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(ORDERS_KEY, JSON.stringify([...getOrders(), order]));
  localStorage.removeItem(CART_KEY);
  return order;
}
