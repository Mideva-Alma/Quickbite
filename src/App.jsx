import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";
import CustomerDetails from "./pages/CustomerDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:id"
          element={<FoodDetails />}
        />

        <Route
  path="/customer-details"
  element={<CustomerDetails />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;