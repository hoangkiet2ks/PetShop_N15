import jwt from "jsonwebtoken";
import process from "process";

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Không có token!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: token_decode.email }; // Lưu email vào req.user thay vì req.body
    next();
  } catch (error) {
    console.error("Lỗi xác thực token:", error.message);
    return res
      .status(403)
      .json({ success: false, message: "Token không hợp lệ!" });
  }
};

export default authUser;
