import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Menu from "./pages/Menu";

import FoodDetails from "./pages/FoodDetails";
import CustomerDetails from "./pages/CustomerDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import Waiter from "./pages/WaiterDashboard";
import Cart from "./pages/Cart";
import ManagerDashboard from "./pages/ManagerDashboard";
import Navbar from "./components/Navbar";
import OrderStatus from "./pages/OrderStatus";
import StaffLogin from "./pages/StaffLogin";
import Games from "./pages/Games";


function App() {
  return (
    <BrowserRouter>
    <>
      <Navbar />
      <main className="ml-64 min-h-screen min-w-0 overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/menu" replace />}
          />

          <Route path="/menu" element={<Menu />} />

          <Route
            path="/menu/:id"
            element={<FoodDetails />}
          />

          <Route path="/cart" element={<Cart />} />

          <Route path="/customer-details" element={<CustomerDetails />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/payment" element={<Payment />} />

          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

          <Route path="/waiter" element={<Waiter />} />

          <Route path= "/manager" element={<ManagerDashboard />} />

          <Route path="/order-status" element={<OrderStatus />} />

          <Route path="/staff-login" element={<StaffLogin />} />

          <Route path="/games" element={<Games />} />

        </Routes>
    </main>
    </>
    </BrowserRouter>
  );
}

export default App;