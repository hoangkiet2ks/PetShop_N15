import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useProducts } from "../../Context/PreviewCartContext/ProductProvider";
import "../../css/productDetail/productDescription.css";

const ProductDescription = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const [expanded, setExpanded] = useState(false);

  // Kiểm tra nếu products rỗng
  if (!products || products.length === 0) {
    return <p className="text-danger">Không tìm thấy sản phẩm</p>;
  }

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return <p className="text-danger">Sản phẩm không tồn tại</p>;
  }

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Container
      className="product_description_tab"
      style={{ marginBottom: "100px" }}
    >
      <h4>{product.descriptions?.[0]?.title || "Thông tin sản phẩm"}</h4>
      <div>
        <p style={{ textAlign: "center" }}>
          <b>{product.productName}</b>
        </p>
        <p>
          <b>Thương hiệu:</b> {product.brandName}
        </p>
        <p>{product.descriptions?.[0]?.content || "Không có mô tả"}</p>

        <div
          className={`content-container ${expanded ? "expanded" : "collapsed"}`}
        >
          {product.descriptions?.map((desc, index) => (
            <div key={index}>
              <p>
                <b>{desc.title}:</b>
              </p>
              {Array.isArray(desc.content) ? (
                <ul>
                  {desc.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{desc.content}</p>
              )}
            </div>
          ))}
          <p>
            <a href="https://paddy.vn/">Xem thêm sản phẩm tại Paddy.vn</a>
          </p>
        </div>

        <Button className="read-more-btn" onClick={handleToggle}>
          {expanded ? "Thu Gọn" : "Đọc Thêm"}
        </Button>
      </div>
    </Container>
  );
};

export default ProductDescription;
