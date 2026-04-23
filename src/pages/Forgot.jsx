import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import forgot from "../assets/forgot.svg";
import "../css/login/AuthForms.css";

const Forgot = () => {
  const inputEmail = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/auth/forgot-password", {
        email: inputEmail.current.value,
      });
      toast.success(`✅ ${res.data.message}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "❌ Đã xảy ra lỗi!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper row w-100 m-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-0">
          <img src={forgot} alt="Forgot password illustration" className="auth-image" />
        </div>
        <div className="col-md-6 d-flex align-items-center p-0">
          <form className="auth-form w-100" onSubmit={handleForgotPassword}>
            <h3>
              Xin chào{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
              , <br /> Đặt lại mật khẩu!
            </h3>
            <div>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Địa chỉ Email"
                ref={inputEmail}
                required
              />
              <div className="d-flex justify-content-between align-items-center auth-links">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    "Gửi"
                  )}
                </button>
                <p className="mb-0">
                  <Link to="/login" className="text-primary">
                    Đăng nhập
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

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("❌ Token không hợp lệ!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/auth/reset-password", {
        token,
        newPassword,
      });
      toast.success(`✅ ${res.data.message}`);
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "❌ Đã xảy ra lỗi!";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper row w-100 m-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-0">
          <img src={forgot} alt="Reset password illustration" className="auth-image" />
        </div>
        <div className="col-md-6 d-flex align-items-center p-0">
          <form className="auth-form w-100" onSubmit={handleResetPassword}>
            <h3>
              Xin chào{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
              , <br /> Đặt lại mật khẩu!
            </h3>
            <div>
              <div className="position-relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control mb-3"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control mb-3"
                  placeholder="Xác nhận mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center auth-links">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="spinner-border spinner-border-sm me-2" />
                  ) : (
                    "Đặt lại"
                  )}
                </button>
                <p className="mb-0">
                  <Link to="/login" className="text-primary">
                    Đăng nhập
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

export { ResetPassword };
export default Forgot;