// backend_api/controllers/userControllers.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ResetToken from "../models/ResetTokenModel.js";
import nodemailer from "nodemailer";

// Cấu hình nodemailer với thông tin chi tiết
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Sử dụng SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Thêm kiểm tra transporter khi khởi động
transporter.verify((error, success) => {
  if (error) {
    console.error("Lỗi cấu hình nodemailer:", error.message);
  } else {
    console.log("Nodemailer đã sẵn sàng để gửi email!");
  }
});

export const register = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(401).json({ message: "Email đã tồn tại!" });
    }

    // Validate mật khẩu
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    ) {
      return res.status(400).json({
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!",
      });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      address: {
        city: "",
        district: "",
        ward: "",
        street: "",
      },
    });
    await newUser.save();

    // Tạo token để tự động đăng nhập
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // Tăng lên 7 ngày
    res.status(200).json({
      message: "Đăng ký thành công!",
      user: { email: newUser.email, name: newUser.name },
      token,
    });
  } catch (error) {
    console.error("Lỗi trong register:", error.message);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Sai mật khẩu!" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      user: { email: user.email, name: user.name },
      token,
    });
  } catch (error) {
    console.error("Lỗi trong login:", error.message);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

// backend_api/controllers/userControllers.js
export const verifyToken = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("verifyToken - Token nhận được:", token); // Thêm log
  if (!token) {
    return res.status(401).json({ message: "Không có token!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("verifyToken - Decoded:", decoded); // Thêm log
    const user = await User.findOne({ email: decoded.email });
    console.log("verifyToken - User tìm thấy:", user); // Thêm log
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }
    res.status(200).json({ user: { email: user.email, name: user.name } });
  } catch (err) {
    console.error("Lỗi trong verifyToken:", err.message);
    return res.status(403).json({ message: "Token không hợp lệ!" });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }
    const { password, ...safeUserData } = userData.toObject();
    return res.json({ success: true, user: safeUserData });
  } catch (error) {
    console.error("Lỗi trong getUserInfo:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email là bắt buộc!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email không tồn tại!" });
    }

    // Kiểm tra cấu hình email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ EMAIL_USER hoặc EMAIL_PASS không được cấu hình!");
      return res
        .status(500)
        .json({ success: false, message: "Cấu hình email không hợp lệ!" });
    }

    // Xóa token cũ nếu tồn tại
    await ResetToken.deleteMany({ email });

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;

    await ResetToken.create({ email, token });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🔑 Đặt lại mật khẩu của bạn",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h2 style="color: #333;">🔒 Yêu cầu đặt lại mật khẩu</h2>
          <p style="font-size: 16px; color: #555;">
            Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới để tiếp tục:
          </p>
          <a href="${resetLink}" style="
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 12px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
          ">Đặt lại mật khẩu</a>
          <p style="font-size: 14px; color: #999; margin-top: 20px;">
            Nếu bạn không yêu cầu, hãy bỏ qua email này. Liên kết có hiệu lực trong 15 phút.
          </p>
        </div>
      `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Link đặt lại mật khẩu đã được gửi!" });
  } catch (error) {
    console.error("❌ Lỗi trong forgotPassword:", error.message);
    if (error.code === "EAUTH") {
      return res.status(500).json({
        success: false,
        message: "Thông tin xác thực email không hợp lệ!",
      });
    }
    if (error.code === "ECONNECTION") {
      return res.status(500).json({
        success: false,
        message: "Không thể kết nối đến Gmail SMTP server!",
      });
    }
    res
      .status(500)
      .json({ success: false, message: "Lỗi server: " + error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const storedToken = await ResetToken.findOne({ token });
    if (!storedToken || storedToken.isUsed) {
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    storedToken.isUsed = true;
    await storedToken.save();
    res.json({ message: "Mật khẩu đã được cập nhật!" });
  } catch (error) {
    console.error("Lỗi trong resetPassword:", error.message);
    res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { user } = req.body;
    const { email, name, address } = user;
    await User.findOneAndUpdate(
      { email },
      { name, address },
      { runValidators: true }
    );
    return res.json({
      success: true,
      message: "Cập nhật thông tin thành công!",
    });
  } catch (error) {
    console.error("Lỗi trong updateUserInfo:", error.message);
    res.json({ success: false, message: error.message });
  }
};
