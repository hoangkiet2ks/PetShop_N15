import KnowledgeList from "./homePage/knowledges/KnowledgeList";
import ProductList from "./homePage/products/ProductList";
import LocationList from "./homePage/locations/LocationList"
import "../css/homePage/HomePage.css";
import PromotionCarousel from "./homePage/carousel/PromotionCarousel";
import Collection from "./homePage/collection/Collection";
import BrandList from "./homePage/brands/BrandList";
import Cart from "./previewCart/PreviewCart";

const HomePage = () => {
    return (
        <>
            <div className="main-content">
                <PromotionCarousel />
                <Collection />
                <ProductList />
                <hr className="separator"></hr>

                <BrandList />

                <KnowledgeList />

                <div className="buydirectly">
                    <hr />
                    <h3>Mua Trực Tiếp Tại Cửa Hàng</h3>
                </div>

                <LocationList />

                <Cart />
            </div>
        </>
    );
};

export default HomePage;