import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";

// Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DesignSystem from "./pages/DesignSystem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/design-system" element={<DesignSystem />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/Yuno/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
