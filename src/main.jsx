import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import AppProvider from "./Context/AppContext/AppProvider.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import ProductProvider from "./Context/PreviewCartContext/ProductProvider.jsx";
import CartContextProvider from "./Context/PreviewCartContext/CartContext.jsx";
import { BrowserRouter as Router } from "react-router-dom"; // 👈 Thêm Router ở đây

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AppProvider>
        <AuthProvider>
          <CartContextProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </CartContextProvider>
        </AuthProvider>
      </AppProvider>
    </Router>
  </StrictMode>
);
