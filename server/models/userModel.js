// backend_api/models/userModel.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // productID, kiểu Number để đồng bộ với logic
  size: { type: String, default: null }, // Không bắt buộc
  flavor: { type: String, default: null }, // Không bắt buộc
  type: { type: String, default: null }, // Không bắt buộc
  quantity: { type: Number, required: true, min: 1 },
  name: { type: String, required: true }, // Bắt buộc, vì cartControllers yêu cầu
  price: { type: Number, required: true }, // Bắt buộc
  image: { type: String, required: true }, // Bắt buộc
  brandName: { type: String, required: true }, // Thêm trường brandName
  discountPercentage: { type: Number, default: 0 }, // Thêm trường discountPercentage
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: [cartItemSchema],
  address: {
    type: Object,
    default: {},
  },
});

const User = mongoose.model("User", userSchema);

export default User;