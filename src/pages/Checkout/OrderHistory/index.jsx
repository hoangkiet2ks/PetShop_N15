import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../css/checkout/OrderHistory.css";
import AppContext from "../../../Context/AppContext/AppContext";
import { useAuth } from "../../../Context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const getDeliveryMethodLabel = (deliveryMethod) => {
  switch (deliveryMethod) {
    case "express":
      return "Vận chuyển hỏa tốc";
    case "fast":
      return "Vận chuyển nhanh";
    case "standard":
      return "Vận chuyển tiêu chuẩn";
    default:
      return "Không xác định";
  }
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { formatCurrency } = useContext(AppContext);

  useEffect(() => {
    if (!user || !token) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để xem lịch sử đặt hàng.",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true); // Bật loading
        const response = await fetch("http://localhost:3001/order/list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Lỗi khi lấy danh sách đơn hàng!");
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error.message);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: error.message,
        });
      } finally {
        setIsLoading(false); // Tắt loading
      }
    };

    fetchOrders();
  }, [user, token, navigate]);

  return (
    <div className="container order-history-container">
      <h2 className="title">Lịch Sử Đơn Hàng</h2>
      {isLoading ? (
        <div className="loading">Đang tải đơn hàng...</div>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <p>Không có đơn hàng nào được lưu.</p>
          <Link to="/products" className="cta-button">
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="order-history-wrapper">
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Đơn Hàng</th>
                <th>Ngày Tạo</th>
                <th>Phương Thức Vận Chuyển</th>
                <th>Tổng Tiền</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderID || order._id}>
                  <td>
                    <Link to={`/orders/${order.orderID || order._id}`}>
                      {order.orderID || "Chưa có mã"}
                    </Link>
                  </td>
                  <td>{new Date(order.date).toLocaleString()}</td>
                  <td>{getDeliveryMethodLabel(order.deliveryMethod)}</td>
                  <td>{formatCurrency(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;