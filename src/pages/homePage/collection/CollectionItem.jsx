import { useNavigate } from "react-router-dom";
import "../../../css/homePage/collection/CollectionItem.css";
import PropTypes from "prop-types";

const CollectionItem = ({ name, image, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${slug}`, { state: { categoryName: name } });
  };

  return (
    <div className="collection-item" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="collection-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="collection-item-name">{name}</div> {/* Sửa: Xóa <a href=""> */}
    </div>
  );
};

CollectionItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default CollectionItem;
