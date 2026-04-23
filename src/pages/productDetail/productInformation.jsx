import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../Context/PreviewCartContext/ProductProvider";
import axios from "axios";
import { Container } from "react-bootstrap";
import "../../css/productDetail/productInformation.css";
import AppContext from "../../Context/AppContext/AppContext";
import { useCart } from "../../Context/PreviewCartContext/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const ProductInformation = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { formatCurrency } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); 

  // ✅ Fetch product từ Context hoặc API
  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
    } else {
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((res) => setProduct(res.data))
        .finally(() => setLoading(false));
    }
  }, [id, products]);

  const hasFlavors = product?.flavors?.length > 0;
  const hasTypes = product?.type?.length > 0;

  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  // Cập nhật state khi product thay đổi
  useEffect(() => {
    if (product) {
      setSelectedFlavor(
        hasFlavors ? product.flavors.find((f) => f.available) || null : null
      );
      setSelectedSize(
        hasFlavors
          ? product.flavors?.[0]?.size?.[0]?.label || ""
          : product.size?.[0]?.label || ""
      );
      setSelectedType(
        hasTypes ? product.type.find((t) => t.available) || null : null
      );
    }
  }, [product, hasFlavors, hasTypes]);

  // Hiển thị loading nếu đang fetch API
  if (loading) return <p>Loading...</p>;

  // ✅ Nếu không tìm thấy sản phẩm, quay về trang chủ
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  // Tính giá tiền
  const availableSizes = hasFlavors
    ? selectedFlavor?.size || [] // Giữ nguyên tất cả kích thước, không lọc
    : product.size || [];

  const selectedIndex = product.price?.findIndex(
    (_, i) => availableSizes[i]?.label === selectedSize
  );
  const validIndex = selectedIndex !== -1 ? selectedIndex : 0;

  const pricePerUnit =
    (product.price?.[validIndex] || 0) * (1 - product.discountPercentage / 100);
  const totalPrice = quantity * pricePerUnit;

  const handleAddToCart = () => {
    if (!selectedSize && availableSizes.length > 0) {
      console.log("Chưa chọn size, không thêm vào giỏ hàng!");
      return;
    }
  
    addToCart({
      ...product,
      type: selectedType?.label || null,
      flavor: selectedFlavor ? selectedFlavor.label : null,
      size: selectedSize,
      price: pricePerUnit,
      quantity: quantity,
    });
  
  };
  

  return (
    <Container>
      <div className="breadcrumb">
        <ul>
          <li>
            <a href="/">Trang chủ</a>
          </li>
          <li> &gt; </li>
          <li>{product.productName}</li>
        </ul>
      </div>

      <div className="product-name">
        <p>{product.productName}</p>
      </div>

      <div className="brand-name">
        <p>
          <strong>Thương hiệu:</strong> {product.brandName}
        </p>
      </div>

      <div className="price">
        <span className="old-price">
          {formatCurrency(product.price[validIndex])}
        </span>
        <span> | </span>
        <span className="new-price">{formatCurrency(pricePerUnit)}</span>
      </div>

      {hasFlavors && (
        <div className="flavor">
          <p className="flavor-title">
            <strong>Vị:</strong> {selectedFlavor?.label || ""}
          </p>
          <div className="flavor-options">
            {product.flavors.map((flavor, index) => (
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
          <div className="size-options">
            {availableSizes.map((size, index) => (
              <button
                key={index}
                className={`size-btn ${
                  selectedSize === size.label ? "selected" : ""
                } ${!size.available ? "disabled" : ""}`}
                onClick={() => size.available && setSelectedSize(size.label)}
                disabled={!size.available}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {hasTypes && !hasFlavors && (
        <div className="type">
          <p className="type-title">
            <strong>Loại:</strong> {selectedType?.label || ""}
          </p>
          <div className="type-options">
            {product.type.map((type, index) => (
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

      <div className="amount">
        <p>Số Lượng:</p>
        <button
          className="quantity-btn"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity === 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>

      <div className="total-price">
        <p>
          <strong>Tổng số tiền:</strong> {formatCurrency(totalPrice)}
        </p>
      </div>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Thêm Vào Giỏ Hàng
      </button>
    </Container>
  );
};

export default ProductInformation;
