import PropTypes from "prop-types";
import "../../../css/checkout/OrderSummary.css";
import { useCart } from "../../../Context/PreviewCartContext/CartContext";
import { useContext } from "react";
import AppContext from "../../../Context/AppContext/AppContext";

const OrderSummary = ({ selectedDelivery }) => {
  const { formatCurrency } = useContext(AppContext);
  const { cart } = useCart();

  // Xác định phí vận chuyển dựa trên loại giao hàng
  const deliveryCost =
    selectedDelivery === "express"
      ? 30000
      : selectedDelivery === "fast"
      ? 20000
      : selectedDelivery === "standard"
      ? 10000
      : 0;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = formatCurrency(subtotal + deliveryCost);

  return (
    <div className="order-summary">
      {cart.length > 0 ? (
        <>
          <div className="order-summary__list">
            <ul>
              {cart.map((item, index) => (
                <li
                  key={`${item.id}-${item.size || ""}-${item.flavor || ""}-${
                    item.type || index
                  }`}
                  className="order-summary__item"
                >
                  <img
                    src={item.images?.[0] || ""}
                    alt={item.productName || "Sản phẩm"}
                    className="order-summary__image"
                  />
                  <div className="order-summary__details">
                    <p className="order-summary__title">
                      {item.productName || "Không có tên"}
                    </p>

                    {/* Hiển thị thêm thông tin type, size, flavor nếu có */}
                    {(item.type || item.size || item.flavor) && (
                      <p className="order-summary__meta">
                        {item.type ? `Loại: ${item.type}` : ""}
                        {item.size ? ` Kích cỡ: ${item.size}` : ""}
                        {item.flavor ? ` Hương vị: ${item.flavor}` : ""}
                      </p>
                    )}

                    <p className="order-summary__quantity">
                      x{item.quantity || 1}
                    </p>
                    <p className="order-summary__subtotal">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-summary__discount">
            <input type="text" placeholder="Mã giảm giá" />
            <button>Áp dụng</button>
          </div>

          <div className="order-summary__total">
            <p>
              Tổng phụ - {cart.length} mặt hàng:{" "}
              <span>{formatCurrency(subtotal)}</span>
            </p>
            <p>
              Vận chuyển:{" "}
              <span>
                {selectedDelivery ? formatCurrency(deliveryCost) : "Miễn phí"}
              </span>
            </p>
            <p className="order-summary__final">
              Tổng: <span>{total}</span>
            </p>
          </div>
        </>
      ) : (
        <p className="order-summary__empty">Giỏ hàng trống</p>
      )}
    </div>
  );
};

// Xác thực kiểu dữ liệu props
OrderSummary.propTypes = {
  selectedDelivery: PropTypes.string,
};

export default OrderSummary;
