import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../css/header/HeaderBottom.css";

const HeaderBottom = () => {
  const [showDogDropdown, setShowDogDropdown] = useState(false);
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.pageYOffset > 190);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header-bottom ${isFixed ? "fixed" : ""}`}>
      <div className="header-bottom-container">
        <div className="header-bottom-container-wrapper">
          <div className="nav-menu">
            <ul>
              <li>
                <Link to="/filter">Tất cả</Link>
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => setShowDogDropdown(true)}
                onMouseLeave={() => setShowDogDropdown(false)}
              >
                <Link to="/">Chó</Link>
                {showDogDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-section">
                      <Link to="/products/thuc-an-cho-cho">
                        <h4>Thức Ăn Cho Chó</h4>
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn hạt" }}
                      >
                        Thức Ăn Hạt
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn ướt" }}
                      >
                        Thứ Ăn Ướt
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn điều trị bệnh" }}
                      >
                        Thức Ăn Hỗ Trợ Điều Trị Bệnh
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn tươi" }}
                      >
                        Thức Ăn Thịt Tươi
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn hữu cơ" }}
                      >
                        Thức Ăn Hữu Cơ
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-cho"
                        state={{ productType: "Thức ăn không ngũ cốc" }}
                      >
                        Thức Ăn Không Ngũ Cốc
                      </Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Phụ Kiện</h4>
                      <Link to="/">Vòng Cổ & Dây Dắt</Link>
                      <Link to="/">Quần Áo & Nón Mũ</Link>
                      <Link to="/">Dụng Cụ Ăn Uống</Link>
                      <Link to="/">Nệm - Chuồng Cho Cún</Link>
                      <Link to="/">Tã Lót & Khay Vệ Sinh</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Bánh Thưởng</h4>
                      <Link to="/">Bánh Thưởng Mềm</Link>
                      <Link to="/">Xương Gặm Sạch Răng</Link>
                      <Link to="/">Súp Thưởng</Link>
                      <Link to="/">Bánh Quy</Link>
                      <Link to="/">Thịt Sấy Khô</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Chăm Sóc Vệ Sinh Cún</h4>
                      <Link to="/">Vệ Sinh Răng Miệng</Link>
                      <Link to="/">Vệ Sinh Tai - Mắt</Link>
                      <Link to="/">Sữa Tắm & Phụ Kiện Tắm</Link>
                      <Link to="/">Xịt Khử Mùi</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Chăm Sóc Sức Khoẻ Cún</h4>
                      <Link to="/">Vitamin Cho Chó</Link>
                      <Link to="/">Trị Ve Rận & Xổ Giun</Link>
                      <Link to="/">Thực Phẩm Chức Năng</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Đồ Chơi</h4>
                      <Link to="/">Xương Gặm</Link>
                      <Link to="/">Nhồi Bông</Link>
                      <Link to="/">Huấn Luyện & Tương Tác</Link>
                    </div>
                  </div>
                )}
              </li>
              <li
                className="nav-item"
                onMouseEnter={() => setShowCatDropdown(true)}
                onMouseLeave={() => setShowCatDropdown(false)}
              >
                <Link to="/">Mèo</Link>
                {showCatDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-section">
                      <Link to="/products/thuc-an-cho-meo">
                        <h4>Thức Ăn Cho Mèo</h4>
                      </Link>

                      <Link
                        to="/products/thuc-an-cho-meo"
                        state={{ productType: "Thức ăn hạt" }}
                      >
                        Thức Ăn Hạt
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-meo"
                        state={{ productType: "Thức ăn ướt" }}
                      >
                        Thức Ăn Ướt
                      </Link>
                      <Link
                        to="/products/thuc-an-cho-meo"
                        state={{ productType: "Thức ăn điều trị bệnh" }}
                      >
                        Thức Ăn Điều Trị Bệnh
                      </Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Bánh Thưởng</h4>
                      <Link
                        to="/products/thuc-an-cho-meo"
                        state={{ productType: "Bánh thưởng mèo" }}
                      >
                        Bánh Thưởng Mềm
                      </Link>
                      <Link to="/">Súp Thưởng</Link>
                      <Link to="/">Bánh Quy</Link>
                      <Link to="/">Thịt Sấy Khô</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Phụ Kiện</h4>
                      <Link to="/">Vòng Cổ & Dây Dắt</Link>
                      <Link to="/">Đồ Chơi</Link>
                      <Link to="/">Cát Vệ Sinh</Link>
                      <Link to="/">Nhà & Giường Cho Mèo</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Chăm Sóc Sức Khoẻ</h4>
                      <Link to="/">Vitamin & Dinh Dưỡng</Link>
                      <Link to="/">Sữa Tắm & Vệ Sinh</Link>
                      <Link to="/">Thuốc & Điều Trị</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Vận Chuyển Chuồng</h4>
                      <Link to="/">Chuồng - Nhà - Nệm</Link>
                      <Link to="/">Lồng Vận Chuyển</Link>
                    </div>
                    <div className="dropdown-section">
                      <h4>Chăm Sóc Vệ Sinh Cho Mèo</h4>
                      <Link to="/">Vệ Sinh Răng Miệng</Link>
                      <Link to="/">Sữa Tắm Cho Mèo</Link>
                      <Link to="/">Cát Mèo</Link>
                      <Link to="/">Xịt Khử Mùi</Link>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <Link to="/">Thiết bị thông minh</Link>
              </li>
              <li>
                <Link to="/">Hàng mới về</Link>
              </li>
              <li>
                <Link to="/brands">Thương hiệu</Link>
              </li>
              <li>
                <Link to="/">Pagazine chăm Boss</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
