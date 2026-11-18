import { Routes, Route } from "react-router-dom";
import ShopPage from "./pages/ShopPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/admin119922" element={<AdminPage />} />
    </Routes>
  );
}
