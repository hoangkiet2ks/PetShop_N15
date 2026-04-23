// frontend/src/components/previewCart/PreviewCart.jsx
import { Link } from "react-router-dom";
import "../../css/previewCart/PreviewCart.css";
import PreviewCartItem from "./PreviewCartItem";
import { useContext } from "react";
import AppContext from "../../Context/AppContext/AppContext";
import { useCart } from "../../Context/PreviewCartContext/CartContext";

const PreviewCart = () => {
  const { isCartOpen, setIsCartOpen, formatCurrency } = useContext(AppContext);
  const { cart } = useCart();

  const onClose = () => {
    setIsCartOpen(false);
  };

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <>
      {isCartOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`preview-cart ${isCartOpen ? "active" : ""}`}>
        <div className="preview-cart-header">
          <h2>Giỏ hàng</h2>
          <div className="close_btn" onClick={onClose}>
            <span>×</span>
          </div>
        </div>

        <div className="preview-cart-body">
          {cart.length === 0 ? (
            <p className="empty-cart-text">Chưa có sản phẩm nào...</p>
          ) : (
            <ul className="preview-cart-list">
              {cart.map((item) => (
                <PreviewCartItem
                  key={`${item.id}-${item.size}-${item.flavor}-${item.type}`}
                  item={item}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="preview-cart-footer">
          <div className="total-price">
            <p>Tổng số tiền:</p>
            <p className="price-text">{formatCurrency(total)}</p>
          </div>

          <div className="preview-cart-button-box">
            <Link to="/checkout" className="preview-cart-button" onClick={onClose}>
              Thanh toán
            </Link>
            <Link to="/cart" className="preview-cart-button" onClick={onClose}>
              Xem giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewCart;