// backend_api/controllers/cartControllers.js
import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const {
      id,
      size,
      flavor,
      type,
      quantity = 1,
      name,
      price,
      image,
      brandName,
      discountPercentage = 0,
    } = req.body;
    const email = req.user.email;

    if (!id || quantity < 1 || !name || !price || !image || !brandName) {
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

    const existingItem = user.cartData.find(
      (item) =>
        item.id === id &&
        (item.size === size || (!item.size && !size)) &&
        (item.flavor === flavor || (!item.flavor && !flavor)) &&
        (item.type === type || (!item.type && !type))
    );

    if (existingItem) {
      const result = await User.updateOne(
        {
          email,
          cartData: {
            $elemMatch: {
              id,
              size: size || null,
              flavor: flavor || null,
              type: type || null,
            },
          },
        },
        { $inc: { "cartData.$.quantity": quantity } }
      );
      if (result.modifiedCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy sản phẩm để cập nhật!",
        });
      }
    } else {
      await User.updateOne(
        { email },
        {
          $push: {
            cartData: {
              id,
              size,
              flavor,
              type,
              quantity,
              name,
              price,
              image,
              brandName,
              discountPercentage,
            },
          },
        }
      );
    }

    const updatedUser = await User.findOne({ email });
    const formattedCartData = updatedUser.cartData.map((item) => ({
      id: item.id,
      productName: item.name,
      brandName: item.brandName,
      images: [item.image],
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      discountPercentage: item.discountPercentage,
    }));

    return res.json({
      success: true,
      message: "Thêm vào giỏ hàng thành công!",
      cartData: formattedCartData,
    });
  } catch (error) {
    console.error("Lỗi trong addToCart:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id, size, flavor, type, amount } = req.body;
    const email = req.user.email;

    if (!id || !amount) {
      return res.status(400).json({ success: false, message: "Dữ liệu đầu vào không hợp lệ!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      {
        email,
        cartData: {
          $elemMatch: {
            id,
            size: size || null,
            flavor: flavor || null,
            type: type || null,
          },
        },
      },
      {
        $set: { "cartData.$.quantity": Math.max(1, amount) },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm hoặc người dùng để cập nhật!",
      });
    }

    const formattedCartData = updatedUser.cartData.map((item) => ({
      id: item.id,
      productName: item.name,
      brandName: item.brandName,
      images: [item.image],
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      discountPercentage: item.discountPercentage,
    }));

    return res.json({
      success: true,
      message: "Cập nhật giỏ hàng thành công!",
      cartData: formattedCartData,
    });
  } catch (error) {
    console.error("Lỗi trong updateCart:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { id, size, flavor, type } = req.body;
    const email = req.user.email;

    if (!id) {
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

    user.cartData = user.cartData.filter(
      (item) =>
        !(
          item.id === id &&
          (item.size === size || (!item.size && !size)) &&
          (item.flavor === flavor || (!item.flavor && !flavor)) &&
          (item.type === type || (!item.type && !type))
        )
    );

    await user.save();

    const formattedCartData = user.cartData.map((item) => ({
      id: item.id,
      productName: item.name,
      brandName: item.brandName,
      images: [item.image],
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      discountPercentage: item.discountPercentage,
    }));

    return res.json({
      success: true,
      message: "Xóa sản phẩm khỏi giỏ hàng thành công!",
      cartData: formattedCartData,
    });
  } catch (error) {
    console.error("Lỗi trong deleteCartItem:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllCartItem = async (req, res) => {
  try {
    const email = req.user.email;

    const result = await User.updateOne({ email }, { $set: { cartData: [] } });

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại hoặc giỏ hàng đã trống!",
      });
    }

    return res.json({
      success: true,
      message: "Xóa toàn bộ sản phẩm khỏi giỏ hàng thành công!",
      cartData: [],
    });
  } catch (error) {
    console.error("Lỗi trong deleteAllCartItem:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại!" });
    }

    const formattedCartData = user.cartData.map((item) => ({
      id: item.id,
      productName: item.name,
      brandName: item.brandName,
      images: [item.image],
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      discountPercentage: item.discountPercentage,
    }));

    return res.json({ success: true, cartData: formattedCartData });
  } catch (error) {
    console.error("Lỗi trong getUserCart:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addToCart,
  updateCart,
  getUserCart,
  deleteCartItem,
  deleteAllCartItem,
};
