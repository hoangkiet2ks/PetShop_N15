// frontend/src/Context/AppContext/AuthProvider.jsx
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sai tài khoản hoặc mật khẩu!");
      }

      const res = await response.json();
      setUser({ email: res.user.email, name: res.user.name });
      setToken(res.token);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify({ email: res.user.email, name: res.user.name }));
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.message);
      toast.error(err.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    if (tokenFromStorage) {
      fetch("http://localhost:3001/auth/verifyToken", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser({ email: data.user.email, name: data.user.name });
            setToken(tokenFromStorage);
            localStorage.setItem("user", JSON.stringify({ email: data.user.email, name: data.user.name }));
          } else {
            toast.error("Token không hợp lệ, vui lòng đăng nhập lại!");
            logOut();
          }
        })
        .catch((err) => {
          console.error("Lỗi xác thực token:", err);
          toast.error("Không thể xác thực token, vui lòng đăng nhập lại!");
          logOut();
        });
    } else {
      // Nếu không có token, xóa user khỏi localStorage
      setUser(null);
      localStorage.removeItem("user");
    }
  }, []);

  const getEmail = () => {
    return user ? user.email : null;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logOut, getEmail, setUser, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);