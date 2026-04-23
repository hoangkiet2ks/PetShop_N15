import { useState } from "react";
import { Button, Image, Container, Col } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "lucide-react";
import "../../css/productDetail/imageCarousel.css";
import { useProducts } from "../../Context/PreviewCartContext/ProductProvider";
import { useParams } from "react-router-dom";

export default function ImageCarousel() {
  const { id } = useParams();
  const { products } = useProducts(); 
  const [currentIndex, setCurrentIndex] = useState(0);

  // Kiểm tra nếu danh sách sản phẩm rỗng hoặc không có sản phẩm nào khớp ID
  if (!products || products.length === 0) {
    return <p className="text-danger">Không tìm thấy sản phẩm</p>;
  }

  const product = products.find((p) => p.id.toString() === id);
  
  if (!product) {
    return <p className="text-danger">Sản phẩm không tồn tại</p>;
  }

  const productImages = product.images || []; 

  const handleUp = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  const handleDown = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Container className="d-flex gap-4 p-4">
      {/* Danh sách hình ảnh */}
      <Col xs={2} className="d-flex flex-column align-items-center">
        <Button variant="light" onClick={handleUp} className="mb-2">
          <ChevronUp size={24} />
        </Button>
        <div className="d-flex flex-column gap-2">
          {productImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className={`w-100 cursor-pointer ${
                index === currentIndex ? "border border-primary" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              thumbnail
              style={{ border: "none" }}
            />
          ))}
        </div>
        <Button variant="light" onClick={handleDown} className="mt-2">
          <ChevronDown size={24} />
        </Button>
      </Col>
      {/* Hình ảnh lớn */}
      <Col
        xs={10}
        className="d-flex justify-content-center align-items-center img-container"
      >
        {productImages.length > 0 ? (
          <Image
            src={productImages[currentIndex]}
            alt="Large preview"
            className="img-fluid rounded"
          />
        ) : (
          <p className="text-muted">Không có hình ảnh</p>
        )}
      </Col>
    </Container>
  );
}
