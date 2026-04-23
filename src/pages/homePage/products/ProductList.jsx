import { useProducts } from "../../../Context/PreviewCartContext/ProductProvider.jsx";
import Product from "./Product.jsx";
import "../../../css/homePage/products/ProductList.css";

const ProductList = () => {
  const { products } = useProducts();

  return (
    <div className="product-list">
      <div className="container">
        <div className="block-header-content">
          <h3 className="title">
            <span className="text">Được boss yêu thích</span>
          </h3>
          <a href="#" className="view_all">
            Xem tất cả
          </a>
        </div>

        <div className="block-info-product">
          {products.length > 0 ? (
            products.map((item) => <Product key={item.id} item={item} />)
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
