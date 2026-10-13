import { ORDER_STATUSES } from "../../utils/orderHelpers"
const NEXT_ACTION = {
    Pending: "Start Preparing",
    Preparing: "Mark Ready",
    Ready: "Mark Served",
};

const STATUS_STYLES = {
    Pending: {border: "border-gray-500", badge: "bg-red-100 text-red-700"},
    Preparing: {border: "border-yellow-500", badge: "bg-red-100 text-yellow-700"},
    Ready: {border: "border-green-500", badge: "bg-red-100 text-green-700"},
    Served: {border: "border-gray-500", badge: "bg-red-100 text-gray-700"},
};

function minutesAgo(isoDate) {
  const minutes = Math.floor((Date.now() - new Date(isoDate).getTime()) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes === 1) return "1 min ago";
  return `${minutes} min ago`;
}

function OrderCard({ order, onStatusChange }) {
  const nextStatus = ORDER_STATUSES[ORDER_STATUSES.indexOf(order.orderStatus) + 1];
  const styles = STATUS_STYLES[order.orderStatus] || STATUS_STYLES.Served;

  return (
    <div className={`rounded-xl border-l-4 bg-white p-6 shadow ${styles.border}`}>
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">
          Table {order.tableNumber}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}
        >
          {order.orderStatus}
        </span>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        {order.id} · {order.customerName} · {minutesAgo(order.createdAt)}
      </p>
      <div className="divide-y">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between py-2 text-gray-700"
          >
            <span>
              {item.quantity} × {item.name}
            </span>
            <span>KSh {item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {order.paymentMethod} ({order.paymentStatus})
      </p>
      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <span className="text-lg font-bold text-gray-800">
          KSh {order.total}
        </span>

        {nextStatus && (
          <button
            className="rounded-lg bg-red-300 px-4 py-2 font-bold text-white transition hover:bg-red-600"
            type="button"
            onClick={() => onStatusChange(order.id, nextStatus)}
          >
            {NEXT_ACTION[order.orderStatus]}
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderCard;