import { useEffect, useState } from "react";
import { getOrders } from "../utils/orderHelpers";

function ManagerDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    return (
      orderDate.getMonth() === currentMonth &&
      orderDate.getFullYear() === currentYear
    );
  });

  const totalRevenue = monthlyOrders.reduce(
    (total, order) => total + order.total,
    0
  );

  const mealCounts = {};

  monthlyOrders.forEach((order) => {
    order.items.forEach((item) => {
      mealCounts[item.name] = (mealCounts[item.name] || 0) + item.quantity;
    });
  });

  const sortedMeals = Object.entries(mealCounts).sort(
    (a, b) => b[1] - a[1]
  );

  const mostLikedMeal = sortedMeals[0] || null;
  const topMeals = sortedMeals.slice(0, 5);

  const statusCounts = {
    Pending: 0,
    Preparing: 0,
    Ready: 0,
    Served: 0,
  };

  monthlyOrders.forEach((order) => {
    if (statusCounts[order.orderStatus] !== undefined) {
      statusCounts[order.orderStatus]++;
    }
  });

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manager <span className="text-red-500">Dashboard</span>
          </h1>

          <p className="mt-2 text-gray-600">
            Monitor restaurant performance and order activity.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Total Orders */}
          <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Total Orders
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-500">
              {orders.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              All orders received
            </p>
          </div>

          {/* Monthly Orders */}
          <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Monthly Orders
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-500">
              {monthlyOrders.length}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Orders this month
            </p>
          </div>

          {/* Revenue */}
          <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Monthly Revenue
            </p>

            <h2 className="mt-3 text-3xl font-bold text-red-500">
              KSh {totalRevenue.toLocaleString()}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Revenue this month
            </p>
          </div>

          {/* Most Popular */}
          <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Most Popular Meal
            </p>

            {mostLikedMeal ? (
              <>
                <h2 className="mt-3 text-xl font-bold text-gray-800">
                  {mostLikedMeal[0]}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {mostLikedMeal[1]} orders this month
                </p>
              </>
            ) : (
              <p className="mt-3 text-gray-500">
                No orders this month
              </p>
            )}
          </div>
        </div>

        {/* Middle Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Order Status */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Order Status
            </h2>

            <div className="space-y-4">

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Pending</span>
                <span className="rounded-full bg-red-100 px-4 py-1 font-semibold text-red-600">
                  {statusCounts.Pending}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Preparing</span>
                <span className="rounded-full bg-yellow-100 px-4 py-1 font-semibold text-yellow-700">
                  {statusCounts.Preparing}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Ready</span>
                <span className="rounded-full bg-green-100 px-4 py-1 font-semibold text-green-700">
                  {statusCounts.Ready}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Served</span>
                <span className="rounded-full bg-gray-100 px-4 py-1 font-semibold text-gray-700">
                  {statusCounts.Served}
                </span>
              </div>

            </div>
          </div>

          {/* Top Meals */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Top 5 Meals
            </h2>

            {topMeals.length === 0 ? (
              <p className="text-gray-500">
                No meal data available.
              </p>
            ) : (
              <div className="space-y-4">
                {topMeals.map(([meal, quantity], index) => (
                  <div
                    key={meal}
                    className="flex items-center justify-between border-b border-gray-100 pb-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-red-500">
                        {index + 1}
                      </span>

                      <span className="font-medium text-gray-700">
                        {meal}
                      </span>
                    </div>

                    <span className="font-semibold text-gray-800">
                      {quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          {recentOrders.length === 0 ? (
            <p className="text-gray-500">
              No orders available.
            </p>
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
                      className="border-b border-gray-100"
                    >
                      <td className="px-4 py-4 font-semibold text-red-500">
                        {order.id}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {order.customerName}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {order.tableNumber}
                      </td>

                      <td className="px-4 py-4 font-semibold text-gray-800">
                        KSh {order.total.toLocaleString()}
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
        </div>

      </div>
    </div>
  );
}

export default ManagerDashboard;