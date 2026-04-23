import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

const userOrders = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }
    const orders = await Order.find({ userId: user._id });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Lỗi trong userOrders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { items, address, amount, deliveryMethod } = req.body;
    const email = req.user.email;

    // Kiểm tra dữ liệu đầu vào
    if (!items?.length || !address || !amount || !deliveryMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Dữ liệu đầu vào không hợp lệ!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }

    // Tạo mã đơn hàng
    const generateOrderID = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return `OD${year}${month}${day}${randomNumber}`;
    };

    let orderID;
    let isUnique = false;
    while (!isUnique) {
      orderID = generateOrderID();
      const existingOrder = await Order.findOne({ orderID });
      if (!existingOrder) {
        isUnique = true;
      }
    }

    const orderData = {
      orderID,
      userId: user._id,
      items,
      address,
      amount,
      deliveryMethod,
      date: new Date(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    // Xóa giỏ hàng
    await User.findOneAndUpdate({ email }, { cartData: [] });

    res.json({
      success: true,
      message: `Đặt hàng thành công! Mã đơn: ${orderID}`,
      orderID,
    });
  } catch (error) {
    console.error("Lỗi trong placeOrder:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getOrderDetail = async (req, res) => {
  try {
    const { orderID } = req.params;
    const email = req.user.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const order = await Order.findOne({ orderID, userId: user._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Đơn hàng không tồn tại!" });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error("Lỗi trong getOrderDetail:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { userOrders, placeOrder, getOrderDetail };