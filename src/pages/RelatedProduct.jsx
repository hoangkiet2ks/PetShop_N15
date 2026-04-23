import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import ProductItem from "../components/productListPage/ProductItem";
import { useProducts } from "../Context/PreviewCartContext/ProductProvider";
import Product from "./homePage/products/Product";
import PropTypes from "prop-types";

const RelatedProduct = ({ category }) => {
  const { products } = useProducts();

  console.log(category)
  let productsCopy = products.filter((product) => product.category === category);

  return (
    <div className="mb-5">
      <div className="text-center mb-5">
        <h4>Related Products</h4>
      </div>
      <Swiper
        className="related-products-swiper"
        slidesPerView={4}
        spaceBetween={15}
        navigation
        loop={true}
        modules={[Navigation]}
      >
        {productsCopy.map((p, index) => (
          <SwiperSlide key={index}>
            <div className="product__item">
              <Product item={p} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

RelatedProduct.propTypes = {
  category: PropTypes.string.isRequired,
};

export default RelatedProduct;
