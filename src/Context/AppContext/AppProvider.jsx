import { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  function formatCurrency(number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(number || 0);
  }

  return (
    <AppContext.Provider value={{ isCartOpen, setIsCartOpen, formatCurrency }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
