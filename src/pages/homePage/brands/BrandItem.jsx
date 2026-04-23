import "../../../css/homePage/brands/BrandItem.css";

const BrandItem = ({ image, name }) => {
    return (
        <div className="brand-item">
            <div className="brand-image">
                <img src={image} alt={name} />
            </div>
            <a href="" className="brand-name-text">{name}</a>
        </div>
    );
};

export default BrandItem;
