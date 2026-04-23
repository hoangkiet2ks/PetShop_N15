import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../../css/checkout/OrderDetail.css";
import AppContext from "../../../Context/AppContext/AppContext";
import { useAuth } from "../../../Context/AuthContext";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const calculateDeliveryCost = (deliveryMethod) => {
  return deliveryMethod === "express"
    ? 30000
    : deliveryMethod === "fast"
    ? 20000
    : deliveryMethod === "standard"
    ? 10000
    : 0;
};

const OrderDetail = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const { formatCurrency } = useContext(AppContext);

  useEffect(() => {
    if (!user || !token) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để xem chi tiết đơn hàng.",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const fetchOrderDetail = async () => {
      try {
        setIsLoading(true); // Bật loading
        const response = await fetch(
          `http://localhost:3001/order/detail/${orderID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Lỗi khi lấy chi tiết đơn hàng!");
        }

        setOrder(data.order);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error.message);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: error.message,
        });
      } finally {
        setIsLoading(false); // Tắt loading
      }
    };

    fetchOrderDetail();
  }, [orderID, user, token, navigate]);

  if (isLoading) {
    return <div className="loading">Đang tải chi tiết đơn hàng...</div>;
  }

  if (!order) {
    return (
      <div className="no-order">
        <p>Không tìm thấy đơn hàng!</p>
        <Link to="/orders" className="cta-button">
          Quay lại lịch sử đơn hàng
        </Link>
      </div>
    );
  }

  const deliveryCost = calculateDeliveryCost(order.deliveryMethod);
  const finalTotalAmount = order.amount + deliveryCost;

  return (
    <div className="container order-detail-container">
      <h2>Chi Tiết Đơn Hàng</h2>
      <div className="order-info">
        <p>
          <strong>Mã đơn hàng:</strong> {order.orderID}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {new Date(order.date).toLocaleString()}
        </p>
      </div>

      <h3>Danh Sách Sản Phẩm</h3>
      <div className="order-table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tổng</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={`${item.id}-${index}`}>
                <td>{item.name}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.quantity}</td>
                <td>{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-summary">
        <p>
          <strong>Tổng tiền hàng:</strong> {formatCurrency(order.amount)}
        </p>
        <p>
          <strong>Phí vận chuyển:</strong> {formatCurrency(deliveryCost)}
        </p>
        <p className="final-total">
          <strong>Tổng thanh toán:</strong> {formatCurrency(finalTotalAmount)}
        </p>
      </div>

      <Link to="/orders" className="back-button">
        Quay lại lịch sử đơn hàng
      </Link>
    </div>
  );
};

export default OrderDetail;