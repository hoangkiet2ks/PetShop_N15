import "../../../css/homePage/brands/BrandList.css";
import BrandItem from "./BrandItem";

import absoluteHoistic from "../../../assets/img/brand/absoluteHoistic.webp";
import anf from "../../../assets/img/brand/anf.webp";
import ciaoChuru from "../../../assets/img/brand/ciaoChuru.webp";
import equilibrio from "../../../assets/img/brand/equilibrio.webp";
import gimCat from "../../../assets/img/brand/gimCat.webp";
import hiRaw from "../../../assets/img/brand/hiRaw.webp";
import inaba from "../../../assets/img/brand/inaba.webp";
import kitCat from "../../../assets/img/brand/kitCat.webp";
import lapaw from "../../../assets/img/brand/lapaw.webp";
import meO from "../../../assets/img/brand/meO.webp";
import monge from "../../../assets/img/brand/monge.webp";
import nekko from "../../../assets/img/brand/nekko.webp";
import nutrience from "../../../assets/img/brand/nutrience.webp";
import royalCanin from "../../../assets/img/brand/royalCanin.webp";
import tropiclean from "../../../assets/img/brand/tropiclean.webp";
import zenith from "../../../assets/img/brand/zenith.webp";

const brands = [
    { name: "Absolute Holistic", image: absoluteHoistic },
    { name: "ANF", image: anf },
    { name: "Ciao Churu", image: ciaoChuru },
    { name: "Equilibrio", image: equilibrio },
    { name: "GimCat", image: gimCat },
    { name: "HiRaw", image: hiRaw },
    { name: "Inaba", image: inaba },
    { name: "KitCat", image: kitCat },
    { name: "Lapaw", image: lapaw },
    { name: "Me-O", image: meO },
    { name: "Monge", image: monge },
    { name: "Nekko", image: nekko },
    { name: "Nutrience", image: nutrience },
    { name: "Royal Canin", image: royalCanin },
    { name: "Tropiclean", image: tropiclean },
    { name: "Zenith", image: zenith },
];

const BrandList = () => {
    return (
        <div className="brand-list">
            <div className="container">
                <div className="block-header-content">
                    <h3 className="title">
                        <span className="text">
                            1000+ Thương Hiệu Boss Thích
                        </span>
                    </h3>
                    <a href="#" className="view_all">Xem tất cả</a>
                </div>

                <div className="block-brand">
                    {brands.map((brand, index) => (
                        <BrandItem key={index} image={brand.image} name={brand.name} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandList;
