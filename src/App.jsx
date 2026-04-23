
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import HomePage from "./pages/HomePage";
import NewsEvent from "./pages/news/NewsEvent"; 
import EventList from "./pages/news/EventList";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound/NotFound";
import Cart from "./pages/previewCart/Cart";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";

import ProductListPage from "./pages/productListPage/ProductListPage";
import OrderHistory from "./pages/Checkout/OrderHistory";
import OrderDetail from "./pages/Checkout/OrderDetail";
import BrandPage from "./pages/BrandPage";
import FilterPage from "./pages/FilterPage";
import ResetPassword from "./pages/ResetPassword";
import Forgot from "./pages/Forgot";
import Signup from "./pages/Signup";

const App = () => {
  console.log("App loaded");
  return (
    <div id="wrapper">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<EventList />} />
        <Route path="/news-event/:eventId" element={<NewsEvent />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/orders/:orderID" element={<OrderDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:slug" element={<ProductListPage />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;