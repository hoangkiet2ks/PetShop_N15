import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  deliveryMethod: { type: String, required: true }, // Thêm trường deliveryMethod
  date: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;