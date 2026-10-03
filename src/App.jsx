import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmationPage from "./pages/OrderConfirmation";
import Waiter from "./pages/WaiterDashboard";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = { <Navigate to=" /menu " replace />} />
        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:id"
          element={<FoodDetails />}
        />

        <Route path="/review" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/waiterdashboard" element={<Waiter />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<Navigate to="/menu" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
