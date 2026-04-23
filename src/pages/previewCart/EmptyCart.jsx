import { Link } from "react-router-dom";
import emptyCart from "../../assets/img/cart/blank_cart.svg"
import "bootstrap/dist/css/bootstrap.min.css";

function EmptyCart() {
  return (
    <div className="cart__empty py-5">
      <img src={emptyCart} alt="" />
      <span>Giỏ hàng của bạn trống</span>
      <div>
        <Link to='/' className="main-button">
          Mua ngay
        </Link>
      </div>
    </div>
  );
}

export default EmptyCart;
