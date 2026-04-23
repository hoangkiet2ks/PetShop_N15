import { Link } from "react-router-dom";
import loginImg from "../assets/login-pana.svg";
import "../css/login/AuthForms.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let isValid = true;
    let errors = { email: "", password: "" };

    if (!email.match(emailPattern)) {
      errors.email = "Email không hợp lệ!";
      isValid = false;
    }
    if (!password) {
      errors.password = "Mật khẩu không được để trống!";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        await login(email, password);
        setEmail("");
        setPassword("");
      } catch (err) {
        toast.error(err.message || "Đăng nhập thất bại!");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper row w-100 m-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-0">
          <img src={loginImg} alt="Login illustration" className="auth-image" />
        </div>
        <div className="col-md-6 d-flex align-items-center p-0">
          <form className="auth-form w-100" onSubmit={handleSignIn}>
            <h3>
              Xin chào{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
              , Chào mừng trở lại!
            </h3>
            <div>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p style={{ color: "red" }}>{error.email}</p>

              <div className="d-flex flex-column position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-2"
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "12px",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#6c757d",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <p style={{ color: "red" }}>{error.password}</p>
                <Link to="/forgot-password" className="text-muted mb-3 text-end text-decoration-none">
                  Quên mật khẩu
                </Link>
              </div>
              <div className="d-flex justify-content-between align-items-center auth-links">
                <button type="submit" className="btn btn-success">
                  Đăng nhập
                </button>
                <p className="mb-0">
                  Chưa có tài khoản?{" "}
                  <Link to="/signup" className="text-primary">
                    Đăng ký
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;