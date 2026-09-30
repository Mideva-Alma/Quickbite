import {BrowserRouter, Routes, Route,Navigate,} from "react-router-dom";

import Menu from "./pages/Menu";

import FoodDetails from "./pages/FoodDetails";

import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;