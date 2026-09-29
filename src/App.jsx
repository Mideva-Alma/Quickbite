import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu";
import FoodDetails from "./pages/FoodDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/:id"
          element={<FoodDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;