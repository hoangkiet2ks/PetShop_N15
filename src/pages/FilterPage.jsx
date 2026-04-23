import { useState, useEffect } from "react";
import Product from "./homePage/products/Product";
import { useProducts } from "../Context/PreviewCartContext/ProductProvider";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../css/FilterPage/FilterPage.css";

const FilterPage = () => {
    const { products } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayCount, setDisplayCount] = useState(20);
    const [visibleCount, setVisibleCount] = useState(20);
    const [sortOption, setSortOption] = useState("default");
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("Tất cả sản phẩm"); // Trạng thái cho tiêu đề

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('search');

        let results = searchTerm ? products.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        ) : products;

        if (searchTerm) {
            setTitle(`Tìm kiếm sản phẩm với từ khóa "${searchTerm}"`); // Cập nhật tiêu đề khi tìm kiếm
        } else {
            setTitle("Tất cả sản phẩm"); // Đặt lại tiêu đề khi không tìm kiếm
        }

        if (sortOption === "price_low") {
            results.sort((a, b) => a.price[0] - b.price[0]);
        } else if (sortOption === "price_high") {
            results.sort((a, b) => b.price[0] - a.price[0]);
        }

        setFilteredProducts(results);
        setVisibleCount(displayCount);
    }, [location.search, products, displayCount, sortOption]);

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prevCount) => Math.min(prevCount + displayCount, filteredProducts.length));
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="filter-page">
            <div className="container">
                <h1 className="title-filter text-center">{title}</h1> {/* Hiển thị tiêu đề động */}
                <div className="divider"></div>

                <div className="toolbar d-flex justify-content-end">
                    <Form.Select
                        style={{ width: "80px", marginRight: "10px" }}
                        value={displayCount}
                        onChange={(e) => setDisplayCount(parseInt(e.target.value, 10))}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                    </Form.Select>

                    <Form.Select
                        style={{ width: "150px" }}
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="price_low">Giá thấp - cao</option>
                        <option value="price_high">Giá cao - thấp</option>
                    </Form.Select>
                </div>

                <div className="filter-collection">
                    <ul className="productList-filter-collection">
                        {filteredProducts.slice(0, visibleCount).map((item) => (
                            <li className="productItem-filter-collection" key={item.id}>
                                <Product item={item} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center mt-4 d-flex flex-column align-items-center">
                    <p>
                        {filteredProducts.length === 0
                            ? "Không có sản phẩm nào"
                            : `${Math.min(visibleCount, filteredProducts.length)} - ${filteredProducts.length}`}
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
                                width: `${filteredProducts.length > 0
                                    ? (Math.min(visibleCount, filteredProducts.length) / filteredProducts.length) * 100
                                    : 0
                                    }%`,
                            }}
                        ></div>
                    </div >
                    {visibleCount < filteredProducts.length ? (
                        <button
                            className={`btn load-more-btn mt-3 ${loading ? "loading" : ""}`}
                            onClick={handleLoadMore}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <div className="custom-spinner"></div> : "Xem Thêm"}
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
    );
}

export default FilterPage;