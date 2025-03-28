import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";

// Pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import DesignSystem from "./pages/DesignSystem";
import BrandPage from "./pages/BrandPage";
import PageNotFound from "./pages/PageNotFound";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import SearchPage from "./pages/SearchPage";
import ScrollToTop from "./components/ui/ScrollTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/design-system" element={<DesignSystem />} />
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/Yuno/:title" element={<ProductPage />} />
          <Route path="/brand/:tag_name" element={<BrandPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
