import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getManagerOrders,
  getManagerDashboard,
} from "../services/managerApi";

const REFRESH_MS = 10000;

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    style: "bg-red-100 text-red-600",
  },
  PREPARING: {
    label: "Preparing",
    style: "bg-yellow-100 text-yellow-700",
  },
  READY: {
    label: "Ready",
    style: "bg-green-100 text-green-700",
  },
  SERVED: {
    label: "Served",
    style: "bg-gray-100 text-gray-700",
  },
};

function StatCard({ title, value, description }) {
  return (
    <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <h2 className="mt-3 break-words text-3xl font-bold text-red-500 sm:text-4xl">
        {value}
      </h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = String(status ?? "PENDING").toUpperCase();
  const config = STATUS_CONFIG[normalized] ?? {
    label: normalized,
    style: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${config.style}`}
    >
      {config.label}
    </span>
  );
}

function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      const [ordersData, dashboardData] = await Promise.all([
        getManagerOrders(),
        getManagerDashboard(),
      ]);

      setOrders(ordersData);
      setDashboard(dashboardData);
      setError("");
    } catch (err) {
      console.error("Manager dashboard error:", err);
      setError(
        err.message || "Unable to load manager dashboard data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, REFRESH_MS);

    return () => clearInterval(interval);
  }, [loadDashboard]);

  const stats = dashboard?.stats ?? {};
  const payments = dashboard?.payments ?? {};
  const orderStatuses = dashboard?.order_statuses ?? {};

  const formatMoney = (amount) =>
    `KSh ${Number(amount ?? 0).toLocaleString("en-KE", {
      maximumFractionDigits: 2,
    })}`;

  const statusCounts = {
    PENDING: Number(orderStatuses.PENDING ?? 0),
    PREPARING: Number(orderStatuses.PREPARING ?? 0),
    READY: Number(orderStatuses.READY ?? 0),
    SERVED: Number(orderStatuses.SERVED ?? 0),
  };

  const { topMeals, recentOrders } = useMemo(() => {
    const now = new Date();
    const mealCounts = {};

    const monthlyOrders = orders.filter((order) => {
      if (!order.createdAt) return false;

      const createdAt = new Date(order.createdAt);

      return (
        !Number.isNaN(createdAt.getTime()) &&
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear()
      );
    });

    monthlyOrders.forEach((order) => {
      (order.items ?? []).forEach((item) => {
        const name = item.name || "Unknown item";
        const quantity = Number(item.quantity) || 0;

        mealCounts[name] = (mealCounts[name] || 0) + quantity;
      });
    });

    const meals = Object.entries(mealCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const recent = [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 5);

    return {
      topMeals: meals,
      recentOrders: recent,
    };
  }, [orders]);

  if (loading && !dashboard) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-gray-600">
        Loading manager dashboard...
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
          <h1 className="text-xl font-bold text-gray-800">
            Unable to load Manager Dashboard
          </h1>
          <p className="mt-3 text-gray-600">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              loadDashboard();
            }}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Manager <span className="text-red-500">Dashboard</span>
            </h1>
            <p className="mt-2 text-gray-600">
              Monitor restaurant performance and order activity.
            </p>
          </div>

          <button
            onClick={() => {
              setLoading(true);
              loadDashboard();
            }}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error} Showing the last successfully loaded data.
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={Number(stats.total_orders ?? orders.length).toLocaleString()}
            description="All orders received"
          />
          <StatCard
            title="Monthly Orders"
            value={Number(stats.monthly_orders ?? 0).toLocaleString()}
            description="Orders this month"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatMoney(stats.monthly_revenue)}
            description="Confirmed revenue this month"
          />
          <StatCard
            title="Total Customers"
            value={Number(stats.total_customers ?? 0).toLocaleString()}
            description="Identifiable customers recorded"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Order Status
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Current status of all orders.
            </p>

            <div className="space-y-5">
              {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                <div
                  key={status}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-600">{config.label}</span>
                  <span
                    className={`rounded-full px-4 py-1 font-semibold ${config.style}`}
                  >
                    {statusCounts[status]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Payments
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Confirmed payments by payment method.
            </p>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Cash sales</span>
                <span className="font-semibold text-gray-800">
                  {formatMoney(payments.cash)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">M-Pesa sales</span>
                <span className="font-semibold text-gray-800">
                  {formatMoney(payments.mpesa)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="font-semibold text-gray-700">
                  Total sales
                </span>
                <span className="font-bold text-red-500">
                  {formatMoney(stats.total_sales)}
                </span>
              </div>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-xl bg-white p-4 shadow sm:p-6">
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Top 5 Meals
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Ranked by quantity ordered this month.
          </p>

          {topMeals.length === 0 ? (
            <p className="py-4 text-gray-500">
              No meal data available for this month.
            </p>
          ) : (
            <div className="space-y-4">
              {topMeals.map(([meal, quantity], index) => (
                <div
                  key={meal}
                  className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="font-bold text-red-500">
                      #{index + 1}
                    </span>
                    <span className="break-words font-medium text-gray-700">
                      {meal}
                    </span>
                  </div>
                  <span className="shrink-0 font-semibold text-gray-800">
                    {quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-xl bg-white p-4 shadow sm:p-6">
          <h2 className="mb-2 text-xl font-bold text-gray-800">
            Recent Orders
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            The five most recently created orders.
          </p>

          {recentOrders.length === 0 ? (
            <p className="py-6 text-gray-500">No orders available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-sm uppercase text-gray-500">
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Table</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-red-500">
                        #{order.id}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.customerName || "Walk-in customer"}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.tableNumber ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800">
                        {formatMoney(order.total)}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.paymentMethod || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ManagerDashboard;