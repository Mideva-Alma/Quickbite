const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:5000/api/menu-items";

const WAITER_API_URL = API_BASE_URL.replace(
  /\/menu-items\/?$/,
  "/waiter"
);

async function requestWaiter(endpoint, options = {}) {
  const response = await fetch(`${WAITER_API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed: ${response.status}`);
  }

  return data;
}

function normalizeOrder(order) {
  return {
    id: order.id,
    customerName: order.customer ?? order.customer_name ?? "Customer",
    phone: order.customer_phone ?? order.phone ?? "",
    tableNumber: order.table_number,
    total: Number(order.total_amount ?? order.total ?? 0),
    paymentMethod: order.payment_method ?? "",
    paymentStatus: order.payment_status ?? "",
    orderStatus: order.status ?? order.order_status ?? "Pending",
    createdAt: order.created_at ?? order.createdAt ?? null,
    items: (order.items ?? []).map((item) => ({
      id: item.id,
      name: item.name ?? item.item_name ?? "Unknown item",
      quantity: Number(item.quantity ?? 1),
      price: Number(item.price ?? item.unit_price ?? 0),
    })),
  };
}

export async function getWaiterOrders() {
  const data = await requestWaiter("/orders");

  if (!Array.isArray(data)) {
    throw new Error("The waiter API did not return an order list.");
  }

  return data.map(normalizeOrder);
}

export async function updateWaiterOrderStatus(id, status) {
  const data = await requestWaiter(`/orders/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  return normalizeOrder(data);
}