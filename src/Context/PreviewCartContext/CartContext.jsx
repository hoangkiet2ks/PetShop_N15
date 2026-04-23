// frontend/src/contexts/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

// Tạo Context
export const CartContext = createContext();

// Base URL cho API
const BASE_URL = "http://localhost:3001";

// Hàm gọi API
const fetchCart = async (token) => {
  console.log("fetchCart - Token gửi đi:", token);
  const response = await fetch(`${BASE_URL}/cart/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log("fetchCart - Response:", data);
  if (data.success) {
    // Lọc bỏ các phần tử null/undefined
    return data.cartData.filter((item) => item && item.id);
  }
  throw new Error(data.message);
};

const addToCartAPI = async (payload, token) => {
  console.log("addToCartAPI - Token gửi đi:", token); // Thêm log
  console.log("addToCartAPI - Payload:", payload); // Thêm log
  const response = await fetch(`${BASE_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log("addToCartAPI - Response:", data); // Thêm log
  if (data.success) {
    return data.cartData;
  }
  throw new Error(data.message);
};

const verifyToken = async (token) => {
  console.log("verifyToken - Token gửi đi:", token); // Thêm log
  const response = await fetch(`${BASE_URL}/auth/verifyToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("verifyToken - Status:", response.status); // Thêm log
  if (response.status === 404) {
    throw new Error("API xác thực token không tồn tại!");
  }
  const data = await response.json();
  console.log("verifyToken - Response:", data); // Thêm log
  return data.user ? true : false;
};

const updateQuantityAPI = async (payload, token) => {
  const response = await fetch(`${BASE_URL}/cart/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (data.success) {
    return data.cartData;
  }
  throw new Error(data.message);
};

const removeFromCartAPI = async (payload, token) => {
  const response = await fetch(`${BASE_URL}/cart/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (data.success) {
    return data.cartData;
  }
  throw new Error(data.message);
};

const deleteAllAPI = async (token) => {
  const response = await fetch(`${BASE_URL}/cart/delete-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.success) {
    return data.cartData;
  }
  throw new Error(data.message);
};

// CartContext với logic tích hợp
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token, logOut } = useAuth();
  const navigate = useNavigate();

  // Load giỏ hàng từ backend khi user và token hợp lệ
  useEffect(() => {
    const loadCart = async () => {
      console.log("loadCart - User:", user, "Token:", token);
      if (!user || !token) {
        setCart([]);
        return;
      }
      try {
        const isTokenValid = await verifyToken(token);
        console.log("loadCart - isTokenValid:", isTokenValid);
        if (!isTokenValid) {
          toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
          logOut();
          setCart([]);
          navigate("/login");
          return;
        }
        const cartData = await fetchCart(token);
        setCart(cartData || []);
      } catch (error) {
        console.error("Lỗi khi lấy giỏ hàng:", error.message);
        toast.error(error.message);
        setCart([]);
      }
    };
    loadCart();
  }, [user, token, logOut, navigate]);

  // Các hàm hành động
  const handleAddToCart = async (payload) => {
    console.log("handleAddToCart - Payload:", payload);
    if (!user || !token) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!");
      navigate("/login");
      return;
    }
    try {
      const isTokenValid = await verifyToken(token);
      if (!isTokenValid) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
        return;
      }
      const apiPayload = {
        id: payload.id,
        size: payload.size,
        flavor: payload.flavor,
        type: payload.type,
        quantity: payload.quantity,
        name: payload.productName,
        price: payload.price,
        image: payload.images[0],
        brandName: payload.brandName,
        discountPercentage: payload.discountPercentage || 0,
      };
      const cartData = await addToCartAPI(apiPayload, token);
      setCart(cartData);
      toast.success("Thêm vào giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
      if (error.message === "API xác thực token không tồn tại!") {
        toast.error("Lỗi server: API xác thực token không tồn tại!");
        logOut();
        navigate("/login");
      } else if (error.message === "Token không hợp lệ!") {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleUpdateQuantity = async (payload) => {
    if (!user || !token) {
      toast.error("Vui lòng đăng nhập để cập nhật giỏ hàng!");
      navigate("/login");
      return;
    }
    try {
      const isTokenValid = await verifyToken(token);
      if (!isTokenValid) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
        return;
      }
      const cartData = await updateQuantityAPI(payload, token);
      setCart(cartData);
    } catch (error) {
      console.error("Lỗi khi cập nhật số lượng:", error.message);
      if (error.message === "API xác thực token không tồn tại!") {
        toast.error("Lỗi server: API xác thực token không tồn tại!");
        logOut();
        navigate("/login");
      } else if (error.message === "Token không hợp lệ!") {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleRemoveFromCart = async (payload) => {
    if (!user || !token) {
      toast.error("Vui lòng đăng nhập để xóa sản phẩm!");
      navigate("/login");
      return;
    }
    try {
      const isTokenValid = await verifyToken(token);
      if (!isTokenValid) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
        return;
      }
      const cartData = await removeFromCartAPI(payload, token);
      setCart(cartData);
      toast.success("Xóa sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message);
      if (error.message === "API xác thực token không tồn tại!") {
        toast.error("Lỗi server: API xác thực token không tồn tại!");
        logOut();
        navigate("/login");
      } else if (error.message === "Token không hợp lệ!") {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!user || !token) {
      toast.error("Vui lòng đăng nhập để xóa giỏ hàng!");
      navigate("/login");
      return;
    }
    try {
      const isTokenValid = await verifyToken(token);
      if (!isTokenValid) {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
        return;
      }
      const cartData = await deleteAllAPI(token);
      setCart(cartData);
      toast.success("Xóa toàn bộ giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error.message);
      if (error.message === "API xác thực token không tồn tại!") {
        toast.error("Lỗi server: API xác thực token không tồn tại!");
        logOut();
        navigate("/login");
      } else if (error.message === "Token không hợp lệ!") {
        toast.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
        logOut();
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeFromCart: handleRemoveFromCart,
        deleteAll: handleDeleteAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook để sử dụng CartContext
export const useCart = () => useContext(CartContext);

export default CartContextProvider;
