import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "../../css/productListPage/ProductListPage.css";
import { useLocation, useParams } from "react-router-dom";
import { collectionData } from "../homePage/collection/Collection";
import Product from "../homePage/products/Product";

export default function ProductListPage() {
  const { slug } = useParams();
  const location = useLocation();
  const categoryFromUrl =
    collectionData.find((item) => item.slug === slug)?.name ||
    location.state?.categoryName;

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedSort, setSelectedSort] = useState("default");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showProductType, setShowProductType] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showPriceRange, setShowPriceRange] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialProductType = location.state?.productType || null;

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        let filtered = slug
          ? response.data.filter((item) => item.category === categoryFromUrl)
          : response.data;

        setProducts(filtered);
        setFilteredProducts(filtered);

        if (filtered.length > 0) {
          const prices = filtered.map((p) => p.price[0]);
          const max = Math.max(...prices);
          setPriceRange([0, max]);
          setMaxPrice(max);
        }

        setBrands([...new Set(filtered.map((item) => item.brandName))]);
        setTypes([...new Set(filtered.map((item) => item.productType))]);
      })
      .catch((error) => console.error("Lỗi tải sản phẩm:", error));
  }, [categoryFromUrl]);

  useEffect(() => {
    let filtered = products;

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((item) =>
        selectedBrands.includes(item.brandName)
      );
    }

    if (selectedProductType.length > 0) {
      filtered = filtered.filter((item) =>
        selectedProductType.includes(item.productType)
      );
    }

    filtered = filtered.filter(
      (item) => item.price[0] >= priceRange[0] && item.price[0] <= priceRange[1]
    );

    if (selectedSort === "price_low") {
      filtered.sort((a, b) => a.price[0] - b.price[0]);
    } else if (selectedSort === "price_high") {
      filtered.sort((a, b) => b.price[0] - a.price[0]);
    }

    setFilteredProducts(filtered);
  }, [products, selectedBrands, selectedProductType, priceRange, selectedSort]);

  useEffect(() => {
    if (initialProductType) {
      setSelectedProductType([initialProductType]);
    }
  }, [initialProductType]);

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [itemsPerPage]);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + itemsPerPage, filteredProducts.length)
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {products.length > 0 ? products[0].category : ""}
      </h2>
      <hr />
      <div className="d-flex gap-3">
        <div
          className="me-3 p-3 bg-light rounded"
          style={{ width: "20%", minHeight: "800px" }}
        >
          {/* Loại Sản Phẩm */}
          <div className="mb-5">
            <h5
              className="d-flex justify-content-between align-items-center mb-5"
              onClick={() => setShowProductType(!showProductType)}
              style={{ cursor: "pointer" }}
            >
              Loại Sản Phẩm <span>{showProductType ? "−" : "+"}</span>
            </h5>
            {showProductType && (
              <div>
                {types.map((type, index) => (
                  <Form.Check
                    key={type}
                    type="checkbox"
                    id={`type-${index}`}
                    label={type}
                    checked={selectedProductType.includes(type)}
                    onChange={() =>
                      setSelectedProductType((prev) =>
                        prev.includes(type)
                          ? prev.filter((b) => b !== type)
                          : [...prev, type]
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thương Hiệu */}
          <div className="mb-5">
            <h5
              className="d-flex justify-content-between align-items-center mb-5"
              onClick={() => setShowBrands(!showBrands)}
              style={{ cursor: "pointer" }}
            >
              Thương Hiệu <span>{showBrands ? "−" : "+"}</span>
            </h5>
            {showBrands && (
              <div>
                {brands.map((brand, index) => (
                  <Form.Check
                    key={brand}
                    type="checkbox"
                    id={`brand-${index}`}
                    label={brand}
                    checked={selectedBrands.includes(brand)}
                    onChange={() =>
                      setSelectedBrands((prev) =>
                        prev.includes(brand)
                          ? prev.filter((b) => b !== brand)
                          : [...prev, brand]
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* Khoảng Giá */}
          <div className="mb-5">
            <h5
              className="d-flex justify-content-between align-items-center mb-5"
              onClick={() => setShowPriceRange(!showPriceRange)}
              style={{ cursor: "pointer" }}
            >
              Khoảng Giá <span>{showPriceRange ? "−" : "+"}</span>
            </h5>
            {showPriceRange && (
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="number"
                  name="min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="price-input" // Thêm class để tùy chỉnh
                />
                <span>-</span>
                <Form.Control
                  type="number"
                  name="max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  max={maxPrice}
                  className="price-input" // Thêm class để tùy chỉnh
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow-1" style={{ width: "70%" }}>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <Form.Select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                style={{ width: "80px" }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </Form.Select>
              <div className="fw-bold text-uppercase">Sắp xếp theo</div>
              <Form.Select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                style={{ width: "150px" }}
              >
                <option value="default">Mặc định</option>
                <option value="price_low">Giá thấp - cao</option>
                <option value="price_high">Giá cao - thấp</option>
              </Form.Select>
            </div>
          </div>

          <div className="product">
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <Product key={item.id} item={item} />
            ))}
          </div>

          <div className="text-center mt-4 d-flex flex-column align-items-center">
            <p>
              {filteredProducts.length === 0
                ? "Không có sản phẩm nào"
                : `1 - ${Math.min(visibleCount, filteredProducts.length)}`}
            </p>

            <div
              className="progress"
              style={{
                height: "5px",
                width: "200px",
                margin: "0 auto",
              }}
            >
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{
                  width: `${
                    filteredProducts.length > 0
                      ? (Math.min(visibleCount, filteredProducts.length) /
                          filteredProducts.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            {visibleCount < filteredProducts.length ? (
              <button
                className={`btn load-more-btn mt-3 ${loading ? "loading" : ""}`}
                onClick={handleLoadMore}
                disabled={loading}
              >
                <div className="content">
                  {loading ? (
                    <div className="custom-spinner"></div>
                  ) : (
                    <span>Xem Thêm</span>
                  )}
                </div>
              </button>
            ) : (
              <button
                className="btn mt-2 px-5 py-2 rounded-pill"
                style={{
                  backgroundColor: "#F4A98E",
                  color: "white",
                  cursor: "not-allowed",
                  fontWeight: "bold",
                }}
                disabled
              >
                Không Còn Sản Phẩm Nào
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}