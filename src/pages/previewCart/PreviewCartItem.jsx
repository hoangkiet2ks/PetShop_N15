// frontend/src/components/previewCart/PreviewCartItem.jsx
import "../../css/previewCart/PreviewCartItem.css";
import { useContext } from "react";
import AppContext from "../../Context/AppContext/AppContext";
import { useCart } from "../../Context/PreviewCartContext/CartContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PreviewCartItem = ({ item }) => {
  if (!item) {
    return null;
  }

  const { formatCurrency } = useContext(AppContext);
  const { updateQuantity, removeFromCart } = useCart();

  const handleDelete = () => {
    removeFromCart({
      id: item.id,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
    });
  };

  const handleUp = () => {
    updateQuantity({
      id: item.id,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      amount: item.quantity + 1,
    });
  };

  const handleDown = () => {
    if (item.quantity > 1) {
      updateQuantity({
        id: item.id,
        size: item.size,
        flavor: item.flavor,
        type: item.type,
        amount: item.quantity - 1,
      });
    }
  };

  return (
    <li className="preview-cart-item">
      <div className="preview-cart-item-image">
        <img src={item.images[0]} alt={item.productName} />
      </div>

      <div className="preview-cart-item-content">
        <Link to={`/product/${item.id}`} className="preview-cart-item-name">
          {item.productName}
        </Link>

        <div className="preview-cart-item-options">
          {item.type && <span>Loại: {item.type}</span>}
          {item.flavor && <span>Hương vị: {item.flavor}</span>}
          {item.size && <span>Kích thước: {item.size}</span>}
          <a href="#" className="preview-cart-item-edit">
            <i className="fa-regular fa-pen-to-square"></i>
          </a>
        </div>

        <div className="preview-cart-item-change">
          <span className="preview-cart-item-price">
            {formatCurrency(item.price)}
          </span>
          <div className="preview-cart-item-quantity">
            <button
              className="preview-cart-item-quantity-btn"
              onClick={handleDown}
            >
              -
            </button>
            <span className="preview-cart-item-quantity-number">
              {item.quantity}
            </span>
            <button
              className="preview-cart-item-quantity-btn"
              onClick={handleUp}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <a href="#" className="preview-cart-item-remove" onClick={handleDelete}>
        <i className="fa-solid fa-xmark"></i>
      </a>
    </li>
  );
};

PreviewCartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired, // Đổi thành number để khớp với schema
    productName: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string,
    flavor: PropTypes.string,
    size: PropTypes.string,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default PreviewCartItem;