import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate
import signup from "../assets/signup.svg";
import "../css/login/AuthForms.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const namePattern = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Khởi tạo useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateInputs = () => {
    let isValid = true;
    let errors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name.trim().match(namePattern)) {
      errors.name = "Tên không hợp lệ!";
      isValid = false;
    }
    if (!email.match(emailPattern)) {
      errors.email = "Email không hợp lệ!";
      isValid = false;
    }
    if (!password.match(passwordPattern)) {
      errors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!";
      isValid = false;
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Đăng ký thất bại!");
        }

        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login"); // Chuyển hướng đến trang đăng nhập
      } catch (err) {
        console.error("Lỗi đăng ký:", err.message);
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper row w-100 m-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center p-0">
          <img src={signup} alt="Signup illustration" className="auth-image" />
        </div>
        <div className="col-md-6 d-flex align-items-center p-0">
          <form className="auth-form w-100" onSubmit={handleSignUp}>
            <h3>
              Xin chào{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
              , Chào mừng!
            </h3>
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p style={{ color: "red" }}>{error.name}</p>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p style={{ color: "red" }}>{error.email}</p>

              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mb-3"
                  placeholder="Mật khẩu mới"
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
                <p style={{ color: "red" }}>{error.confirmPassword}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center auth-links">
                <button type="submit" className="btn btn-success">
                  Đăng ký
                </button>
                <p className="mb-0">
                  Đã có tài khoản?{" "}
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

export default Signup;