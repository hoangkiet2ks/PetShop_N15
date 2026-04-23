import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryMethod from "./DeliveryMethod";
import PaymentMethod from "./PaymentMethod";
import OrderSummary from "./OrderSummary";
import "../../css/checkout/Checkout.css";
import CheckoutForm from "./CheckoutForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useCart } from "../../Context/PreviewCartContext/CartContext";
import { useAuth } from "../../Context/AuthContext";

const Checkout = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState(null);
  const { cart, setCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để tiếp tục thanh toán.",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, token, navigate]);

  if (!user) return null;

  const fetchCart = async (token) => {
    const response = await fetch("http://localhost:3001/cart/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      return data.cartData;
    }
    throw new Error(data.message);
  };

  const handleConfirm = async () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Giỏ hàng rỗng",
        text: "Vui lòng thêm sản phẩm vào giỏ hàng để hoàn tất đơn hàng.",
      });
      return;
    }

    if (!formData || !selectedDelivery || !selectedPayment) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin",
        text: "Thông tin người nhận, phương thức vận chuyển và thanh toán là bắt buộc.",
      });
      return;
    }

    const deliveryCost =
      selectedDelivery === "express"
        ? 30000
        : selectedDelivery === "fast"
        ? 20000
        : selectedDelivery === "standard"
        ? 10000
        : 0;

    const subtotal = cart.reduce(
      (total, item) => (item ? total + item.price * item.quantity : total),
      0
    );
    const totalAmount = subtotal + deliveryCost;

    const validCartItems = cart.filter((item) => item && item.id);
    if (validCartItems.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Giỏ hàng không hợp lệ",
        text: "Không có sản phẩm hợp lệ trong giỏ hàng.",
      });
      return;
    }

    const orderData = {
      items: validCartItems.map((item) => ({
        id: item.id,
        size: item.size || null,
        flavor: item.flavor || null,
        type: item.type || null,
        quantity: item.quantity,
        name: item.productName,
        price: item.price,
        image: item.images[0],
        brandName: item.brandName,
        discountPercentage: item.discountPercentage || 0,
      })),
      address: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        ward: formData.ward,
        street: formData.street,
      },
      amount: totalAmount,
      deliveryMethod: selectedDelivery, // Thêm deliveryMethod
    };

    try {
      const response = await fetch("http://localhost:3001/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Lỗi khi đặt hàng!");
      }

      const updatedCart = await fetchCart(token);
      setCart(updatedCart || []);

      Swal.fire({
        icon: "success",
        title: result.message, // Hiển thị mã đơn hàng từ backend
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/");
        window.scrollTo(0, 0);
      });
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error.message);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.message,
      });
    }
  };

  const handleFormSubmit = (data) => {
    console.log("Received form data:", data);
    setFormData(data);
  };

  return (
    <div className="container">
      <div className="checkout-container">
        <div className="checkout-left">
          <CheckoutForm onFormSubmit={handleFormSubmit} />
          <h2>Phương thức vận chuyển</h2>
          <DeliveryMethod
            selectedDelivery={selectedDelivery}
            setSelectedDelivery={setSelectedDelivery}
          />
          <h2>Thanh toán</h2>
          <PaymentMethod
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          <button className="checkout-button" onClick={handleConfirm}>
            Hoàn tất đơn hàng
          </button>
        </div>

        <div className="checkout-right">
          <OrderSummary selectedDelivery={selectedDelivery} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;