import mongoose from 'mongoose';

const resetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true, unique: true }, // Thêm unique
  isUsed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 900 }, // 15 phút = 900 giây
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export default ResetToken;