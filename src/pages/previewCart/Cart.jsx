// frontend/src/components/previewCart/Cart.jsx
import { Link, useNavigate } from "react-router-dom";
import "../../css/previewCart/Cart.css";
import { useCart } from "../../Context/PreviewCartContext/CartContext";
import { useContext, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext"; // Điều chỉnh đường dẫn nếu cần
import AppContext from "../../Context/AppContext/AppContext";
import EmptyCart from "./EmptyCart";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, deleteAll } = useCart();
  const { formatCurrency } = useContext(AppContext);
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("Giỏ hàng:", cart);

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để xem giỏ hàng.",
        icon: "warning",
        confirmButtonText: "Đăng nhập",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUp = (item) => {
    updateQuantity({
      id: item.id,
      size: item.size,
      flavor: item.flavor,
      type: item.type,
      amount: item.quantity + 1, // Truyền số lượng mới
    });
  };

  const handleDown = (item) => {
    if (item.quantity > 1) {
      updateQuantity({
        id: item.id,
        size: item.size,
        flavor: item.flavor,
        type: item.type,
        amount: item.quantity - 1, // Truyền số lượng mới
      });
    }
  };

  const handleDelete = (item) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa không?",
      text: "Nếu xóa thì bạn không thể khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart({
          id: item.id,
          size: item.size,
          flavor: item.flavor,
          type: item.type,
        });
        Swal.fire({
          title: "Đã xóa!",
          text: "Bạn đã xóa thành công.",
          icon: "success",
        });
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa toàn bộ giỏ hàng không?",
      text: "Nếu xóa thì bạn không thể khôi phục lại được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAll();
        Swal.fire({
          title: "Đã xóa!",
          text: "Giỏ hàng đã được xóa sạch.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="container cart py-5">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <h2 className="product__heading mb-3 text-center">
            Giỏ Hàng Của Bạn
          </h2>
          <div className="row align-items-start">
            <div className="col-12 col-md-8 product">
              <table className="table cart__list">
                <thead>
                  <tr>
                    <th className="text-start">Sản phẩm</th>
                    <th className="text-center">Giá</th>
                    <th className="text-center">Số lượng</th>
                    <th className="text-center">Tổng</th>
                    <th className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item.id}-${item.size}-${item.flavor}-${item.type}`}>
                      <td>
                        <div className="cart-product">
                          <img
                            src={item.images[0]}
                            alt={item.productName}
                            className="cart-product-img"
                          />
                          <div className="cart-product-info">
                            <p>{item.productName}</p>
                            <span>{item.brandName}</span>
                            <br />
                            {item.size && <span>Kích thước: {item.size} </span>}
                            {item.flavor && <span>Hương vị: {item.flavor} </span>}
                            {item.type && <span>Loại: {item.type} </span>}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="text-center">
                        <div className="quantity-control">
                          <button
                            className="quantity-btn"
                            onClick={() => handleDown(item)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleUp(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="text-center">
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(item)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                className="btn-clear mt-3"
                onClick={handleClearCart}
              >
                Xóa tất cả
              </button>
            </div>
            <div className="col-12 col-md-4">
              <div className="cart-summary p-4 border rounded">
                <h5 className="mb-3">TỔNG SỐ TIỀN</h5>
                <div className="d-flex justify-content-between">
                  <span>Tổng số tiền:</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
                <input
                  type="text"
                  className="form-control my-3"
                  placeholder="Mã khuyến mãi"
                />
                <div className="d-flex justify-content-between">
                  <span>Tổng:</span>
                  <strong>{formatCurrency(total)}</strong>
                </div>
                <Link to="/checkout" className="btn btn-dark w-100 mt-2">
                  Đi Đến Trang Thanh Toán
                </Link>
                <Link to="/" className="btn btn-warning w-100 mt-2">
                  Tiếp Tục Mua Sắm
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;