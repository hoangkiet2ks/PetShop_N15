import { Carousel } from 'react-bootstrap';
import happyNewYear2025 from "../../../assets/img/banner/happy2025.webp";
import sale from "../../../assets/img/banner/sale.webp";
import quayThuong from "../../../assets/img/banner/quayThuong.webp";
import "../../../css/homePage/carousel/PromotionCarousel.css";

const carouselItems = [
    { id: 1, src: happyNewYear2025, alt: 'Happy New Year 2025' },
    { id: 2, src: sale, alt: 'Sale' },
    { id: 3, src: quayThuong, alt: 'Quay thưởng' },
];

const PromotionCarousel = () => {
    return (
        <div className="promotion-carousel">
            <Carousel>
                {carouselItems.map((item) => (
                    <Carousel.Item key={item.id}>
                        <img
                            className="d-block w-100"
                            src={item.src}
                            alt={item.alt}
                        />
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default PromotionCarousel;
