import { useParams } from "react-router-dom";
import { useProducts } from "../Context/PreviewCartContext/ProductProvider";
import { Col, Container, Row } from "react-bootstrap";
import ImageCarousel from "./productDetail/ImageCarousel";
import ProductInformation from "./productDetail/ProductInformation";
import ProductDescription from "./productDetail/ProductDescription";
import RelatedProduct from "./RelatedProduct";
import ScrollToTop from "../utils/ScrollToTop";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const { products } = useProducts(); // Lấy danh sách sản phẩm từ context

  // Tìm sản phẩm theo id
  const product = products.find((item) => item.id.toString() === id);

  // Nếu không tìm thấy sản phẩm, hiển thị thông báo
  if (!product) {
    return <h2 className="text-center mt-5">Sản phẩm không tồn tại!</h2>;
  }

  return (
    <Container id="wrapper">
      <ScrollToTop />
      <Row>
        <Col xs={7}>
          <ImageCarousel product={product} />
        </Col>
        <Col xs={5}>
          <ProductInformation product={product} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProductDescription product={product} />
        </Col>
      </Row>
      <Row>
        <RelatedProduct category={product.category} />
      </Row>
    </Container>
  );
};

export default ProductDetail;
