
import { useCallback, useEffect, useMemo, useState } from "react";
import { getManagerOrders } from "../services/managerApi";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    try {
      const data = await getManagerOrders();
      setOrders(data);
      setError("");
    } catch (err) {
      console.error("Manager dashboard error:", err);
      setError("Unable to load orders. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();

    const interval = setInterval(loadOrders, REFRESH_MS);

    return () => clearInterval(interval);
  }, [loadOrders]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const {
    monthlyOrders,
    totalRevenue,
    mostLikedMeal,
    topMeals,
    statusCounts,
    recentOrders,
  } = useMemo(() => {
    const monthly = orders.filter((order) => {
      if (!order.createdAt) return false;

      const date = new Date(order.createdAt);

      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });

    const revenue = monthly.reduce(
      (total, order) => total + (Number(order.total) || 0),
      0
    );

    const mealCounts = {};

    monthly.forEach((order) => {
      (order.items ?? []).forEach((item) => {
        const name = item.name || "Unknown item";
        const quantity = Number(item.quantity) || 0;

        mealCounts[name] = (mealCounts[name] || 0) + quantity;
      });
    });

    const sortedMeals = Object.entries(mealCounts).sort(
      (a, b) => b[1] - a[1]
    );

    const counts = {
      PENDING: 0,
      PREPARING: 0,
      READY: 0,
      SERVED: 0,
    };

    monthly.forEach((order) => {
      const status = String(order.orderStatus ?? "").toUpperCase();

      if (Object.hasOwn(counts, status)) {
        counts[status]++;
      }
    });

    const recent = [...orders]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);

    return {
      monthlyOrders: monthly,
      totalRevenue: revenue,
      mostLikedMeal: sortedMeals[0] ?? null,
      topMeals: sortedMeals.slice(0, 5),
      statusCounts: counts,
      recentOrders: recent,
    };
  }, [orders, currentMonth, currentYear]);

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 text-gray-600">
        Loading manager dashboard...
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">
          <h1 className="text-xl font-bold text-gray-800">
            Unable to load Manager Dashboard
          </h1>

          <p className="mt-3 text-gray-600">{error}</p>

          <button
            onClick={loadOrders}
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

        {/* Header */}
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
            onClick={loadOrders}
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

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={orders.length.toLocaleString()}
            description="All orders received"
          />

          <StatCard
            title="Monthly Orders"
            value={monthlyOrders.length.toLocaleString()}
            description="Orders this month"
          />

          <StatCard
            title="Monthly Revenue"
            value={`KSh ${totalRevenue.toLocaleString("en-KE", {
              maximumFractionDigits: 2,
            })}`}
            description="Total order value this month"
          />

          <StatCard
            title="Most Popular Meal"
            value={mostLikedMeal ? mostLikedMeal[0] : "—"}
            description={
              mostLikedMeal
                ? `${mostLikedMeal[1]} portions ordered this month`
                : "No orders this month"
            }
          />
        </div>

        {/* Middle Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Order Status */}
          <section className="rounded-xl bg-white p-6 shadow">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Order Status
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Breakdown of orders received this month.
              </p>
            </div>

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

          {/* Top Meals */}
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Top 5 Meals
            </h2>

            <p className="mb-6 text-sm text-gray-500">
              Ranked by quantity ordered this month.
            </p>

            {topMeals.length === 0 ? (
              <p className="text-gray-500">No meal data available.</p>
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
        </div>

        {/* Recent Orders */}
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
                        {order.tableNumber || "—"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 font-semibold text-gray-800">
                        KSh {(Number(order.total) || 0).toLocaleString("en-KE")}
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
