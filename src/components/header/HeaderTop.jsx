// frontend/src/components/HeaderTop.jsx
import { useState, useEffect, useContext, useRef } from "react";
import "../../css/header/HeaderTop.css";
import AppContext from "../../Context/AppContext/AppContext";
import { useCart } from "../../Context/PreviewCartContext/CartContext";
import { useProducts } from "../../Context/PreviewCartContext/ProductProvider";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo_paddy_desktop_155x.avif";

const HeaderTop = () => {
  const { setIsCartOpen, formatCurrency } = useContext(AppContext);
  const { cart } = useCart();
  const { products } = useProducts();
  const { user, logOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // State cho chức năng tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ref để tham chiếu đến search-box
  const searchBoxRef = useRef(null);

  const filterProducts = (keyword) => {
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(keyword.toLowerCase())
    );

    setSearchResults(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        filterProducts(searchTerm);
        setIsSearchOpen(true);
      } else {
        setIsSearchOpen(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, products]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      navigate(`/filter?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setIsSearchOpen(false);
    }
  };

  const onCartClick = () => {
    setIsCartOpen(true);
  };

  const handleLogout = () => {
    logOut();
    setDropdownOpen(false);
  };

  return (
    <div className="header-top">
      <div className="header-top-container">
        <div className="header-top-container-wrapper">
          <div className="image-logo">
            <Link to="/">
              <img src={logo} alt="" className="logo" />
            </Link>
          </div>

          <div className="search-box" ref={searchBoxRef}>
            <input
              className="input-header-top"
              type="text"
              placeholder="Nhập sản phẩm cần tìm..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleSearchSubmit}
            />
            {isSearchOpen && searchTerm && (
              <div className="search-results">
                {isLoading ? (
                  <p>Đang tải...</p>
                ) : searchResults.length > 0 ? (
                  <div className="product-grid">
                    {searchResults.map((product) => (
                      <Link
                        to={`/product/${product.id}`}
                        key={product.id}
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <div className="product-item">
                          <img
                            src={product.images[0]}
                            alt={product.productName}
                            className="product-image"
                          />
                          <div className="product-details">
                            <span className="product-brand">
                              {product.brandName}
                            </span>
                            <h3 className="product-name">
                              {product.productName}
                            </h3>
                            <div className="product-prices">
                              <span className="original-price">
                                {formatCurrency(product.price[0])}
                              </span>
                              <span className="discounted-price">
                                {formatCurrency(
                                  product.price[0] *
                                    (1 - product.discountPercentage / 100)
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Không tìm thấy sản phẩm phù hợp với mô tả của bạn
                  </p>
                )}
              </div>
            )}
            <button className="button-search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="hotline">
            Hotline
            <br />
            086 767 7891
          </div>

          <div className="icon-header-top">
            <a href="" className="icon-header-top-item">
              <i className="fa-heart fa-regular"></i>
              <br />
              Wishlist
            </a>

            {user ? (
              <div
                className="icon-header-top-item"
                style={{ position: "relative" }}
              >
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                >
                  <i className="fa-regular fa-user"></i>
                  <br />
                  {user.name || user.email.split("@")[0]}
                  <i
                    className="fa-caret-down fa-solid"
                    style={{ marginLeft: "5px" }}
                  ></i>
                </div>

                {dropdownOpen && (
                  <div
                    align="end"
                    style={{
                      gap: "20px",
                      paddingLeft: "30px",
                      minWidth: "260px",
                    }}
                    className="dropdown-menu"
                  >
                    <Link
                      to="/orders"
                      className="dropdown-item"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Lịch sử đặt hàng
                    </Link>
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="dropdown-item logout"
                      style={{ color: "red" }}
                    >
                      Đăng xuất
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="icon-header-top-item">
                <i className="fa-regular fa-user"></i>
                <br />
                Đăng nhập
              </Link>
            )}

            <div
              className="icon-header-top-item"
              onClick={onCartClick}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-cart-shopping fa-solid"></i>
              <div className="cart-count-bubble">
                <span className="quantity">{cart.length}</span>
              </div>
              <br />
              Giỏ hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;