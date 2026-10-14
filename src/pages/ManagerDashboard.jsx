import { useEffect, useState } from "react";
import {
  getManagerOrders,
  getManagerDashboard,
} from "../services/managerApi";

function ManagerDashboard() {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [ordersData, dashboardData] = await Promise.all([
          getManagerOrders(),
          getManagerDashboard(),
        ]);

        if (!cancelled) {
          setOrders(ordersData);
          setDashboard(dashboardData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load manager dashboard.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = dashboard?.stats ?? {};
  const payments = dashboard?.payments ?? {};
  const orderStatuses = dashboard?.order_statuses ?? {};

  const formatMoney = (amount) =>
    `KSh ${Number(amount ?? 0).toLocaleString()}`;

  const mealCounts = {};

  orders.forEach((order) => {
    (order.items ?? []).forEach((item) => {
      const name = item.name || "Unknown item";
      mealCounts[name] = (mealCounts[name] || 0) + Number(item.quantity || 0);
    });
  });

  const sortedMeals = Object.entries(mealCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  const statusCounts = {
    Pending: Number(orderStatuses.PENDING ?? 0),
    Preparing: Number(orderStatuses.PREPARING ?? 0),
    Ready: Number(orderStatuses.READY ?? 0),
    Served: Number(orderStatuses.SERVED ?? 0),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <p className="text-gray-600">Loading manager dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Could not load manager dashboard
        </h1>
        <p className="mt-3 text-gray-700">{error}</p>
        <p className="mt-2 text-gray-600">
          Confirm that the Flask backend is running and try refreshing this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manager <span className="text-red-500">Dashboard</span>
          </h1>
          <p className="mt-2 text-gray-600">
            Monitor restaurant performance and order activity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={stats.total_orders ?? orders.length}
            description="All orders received"
          />
          <StatCard
            title="Monthly Orders"
            value={stats.monthly_orders ?? 0}
            description="Orders this month"
          />
          <StatCard
            title="Monthly Revenue"
            value={formatMoney(stats.monthly_revenue)}
            description="Revenue this month"
          />
          <StatCard
            title="Total Customers"
            value={stats.total_customers ?? 0}
            description="Customers recorded"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Order Status
            </h2>

            <div className="space-y-4">
              {Object.entries(statusCounts).map(([status, count]) => (
                <div
                  key={status}
                  className="flex items-center justify-between"
                >
                  <span className="text-gray-600">{status}</span>
                  <span className="rounded-full bg-gray-100 px-4 py-1 font-semibold text-gray-700">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Payments
            </h2>

            <div className="space-y-4">
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

        <section className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Top 5 Meals
          </h2>

          {sortedMeals.length === 0 ? (
            <p className="text-gray-500">No meal data available.</p>
          ) : (
            <div className="space-y-4">
              {sortedMeals.slice(0, 5).map(([meal, quantity], index) => (
                <div
                  key={meal}
                  className="flex items-center justify-between border-b border-gray-100 pb-3"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-red-500">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-700">{meal}</span>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500">No orders available.</p>
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
                      className="border-b border-gray-100"
                    >
                      <td className="px-4 py-4 font-semibold text-red-500">
                        {order.id}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.tableNumber ?? "—"}
                      </td>
                      <td className="px-4 py-4 font-semibold text-gray-800">
                        {formatMoney(order.total)}
                      </td>
                      <td className="px-4 py-4 text-gray-700">
                        {order.paymentMethod || "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                          {order.orderStatus}
                        </span>
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

function StatCard({ title, value, description }) {
  return (
    <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>
      <h2 className="mt-3 text-3xl font-bold text-red-500">{value}</h2>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default ManagerDashboard;