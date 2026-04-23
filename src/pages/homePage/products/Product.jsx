// frontend/src/components/homePage/products/Product.jsx
import "../../../css/homePage/products/Product.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AppContext from "../../../Context/AppContext/AppContext";
import PropTypes from "prop-types";
import { useCart } from "../../../Context/PreviewCartContext/CartContext";
import "react-toastify/dist/ReactToastify.css";

const Product = ({ item }) => {
  const { setIsCartOpen, formatCurrency } = useContext(AppContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const hasFlavors = item?.flavors?.length > 0;
  const hasTypes = item?.type?.length > 0;

  const [showModal, setShowModal] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const availableSize = hasFlavors
    ? selectedFlavor?.size || []
    : item.size || [];

  const selectedIndex = availableSize.findIndex(
    (size) => size.label === selectedSize
  );
  const validIndex = selectedIndex !== -1 ? selectedIndex : 0;

  const pricePerUnit = availableSize[validIndex]?.price
    ? availableSize[validIndex].price * (1 - (item.discountPercentage || 0) / 100)
    : (item.price?.[validIndex] || 0) *
      (1 - (item.discountPercentage || 0) / 100);

  const hasOptions =
    item.type?.length || item.flavors?.length || item.size?.length;

  const handleClick = () => {
    navigate(`/product/${item.id}`);
  };

  const handleAddToCart = () => {
    if (hasOptions) {
      setShowModal(true);
    } else {
      const payload = {
        id: item.id,
        productName: item.productName,
        brandName: item.brandName,
        images: item.images,
        price:
          (item.price?.[0] || 0) * (1 - (item.discountPercentage || 0) / 100),
        quantity,
        size: null,
        flavor: null,
        type: null,
        discountPercentage: item.discountPercentage || 0,
      };
      console.log("Add to cart (no options):", payload);
      addToCart(payload);
      setIsCartOpen(true);
    }
  };

  const handleConfirmAddToCart = () => {
    if (!selectedSize && availableSize.length > 0) {
      console.log("Chưa chọn size, không thêm vào giỏ hàng!");
      return;
    }

    const payload = {
      id: item.id,
      productName: item.productName,
      brandName: item.brandName,
      images: item.images,
      type: selectedType?.label || null,
      flavor: selectedFlavor ? selectedFlavor.label : null,
      size: selectedSize || null,
      price: pricePerUnit,
      quantity,
      discountPercentage: item.discountPercentage || 0,
    };
    console.log("Add to cart (with options):", payload);
    addToCart(payload);
    setShowModal(false);
    setIsCartOpen(true);
  };

  const availableSizes = selectedFlavor ? selectedFlavor.size : item.size || [];

  return (
    <div className="card">
      <div className="image">
        <img
          src={item.images[0]}
          className="card-img-top"
          alt={item.productName}
          onClick={handleClick}
        />
        <div className="addCart-box">
          <button className="btn btn-light" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="card-body">
        <h5 className="card-title">{item.brandName}</h5>
        <Link to={`/product/${item.id}`} className="product_description">
          {item.productName}
        </Link>
        <div className="card-price">
          <div className="price-regular">
            <s className="price-regular-item">
              {formatCurrency(item.price[0])}
            </s>
          </div>
          <div className="price-compare"></div>
          <div className="price-sale">
            <p className="price-sale-item">
              {formatCurrency(
                (item.price[0] * (100 - (item.discountPercentage || 0))) / 100
              )}
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Chọn tùy chọn</h2>

            {hasFlavors && (
              <div className="flavor">
                <p className="flavor-title">
                  <strong>Vị:</strong> {selectedFlavor?.label || ""}
                </p>
                <div className="flavor_options">
                  {item.flavors.map((flavor, index) => (
                    <button
                      key={index}
                      className={`flavor-btn ${
                        selectedFlavor?.label === flavor.label ? "selected" : ""
                      } ${!flavor.available ? "disabled" : ""}`}
                      onClick={() => {
                        if (flavor.available) {
                          setSelectedFlavor(flavor);
                          setSelectedSize(flavor.size?.[0]?.label || "");
                        }
                      }}
                      disabled={!flavor.available}
                    >
                      {flavor.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {availableSizes.length > 0 && (
              <div className="size">
                <p className="size-title">
                  <strong>Size:</strong> {selectedSize}
                </p>
                <div className="size_options">
                  {availableSizes.map((size, index) => (
                    <button
                      key={index}
                      className={`size-btn ${
                        selectedSize === size.label ? "selected" : ""
                      } ${!size.available ? "disabled" : ""}`}
                      onClick={() =>
                        size.available && setSelectedSize(size.label)
                      }
                      disabled={!size.available}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasTypes && !hasFlavors && item.type?.length > 0 && (
              <div className="type">
                <p className="type-title">
                  <strong>Loại:</strong> {selectedType?.label || ""}
                </p>
                <div className="type_options">
                  {item.type.map((type, index) => (
                    <button
                      key={index}
                      className={`type-btn ${
                        selectedType?.label === type.label ? "selected" : ""
                      } ${!type.available ? "disabled" : ""}`}
                      onClick={() => type.available && setSelectedType(type)}
                      disabled={!type.available}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="option_group">
              <strong>Số lượng:</strong>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className="button_group">
              <button
                className="confirm-btn"
                onClick={handleConfirmAddToCart}
                disabled={
                  (hasFlavors && !selectedFlavor) ||
                  (availableSizes.length > 0 && !selectedSize) ||
                  (hasTypes && !selectedType && !hasFlavors)
                }
              >
                Thêm
              </button>

              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Product.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    productName: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    discountPercentage: PropTypes.number,
    price: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: PropTypes.array,
    type: PropTypes.array,
    flavors: PropTypes.array,
  }).isRequired,
};

export default Product;