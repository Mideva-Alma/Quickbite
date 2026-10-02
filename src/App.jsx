import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmationPage from "./pages/OrderConfirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:id"
          element={<FoodDetails />}
        />

        <Route path="/review" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
