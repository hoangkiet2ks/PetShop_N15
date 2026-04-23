import "../../../css/homePage/locations/LocationCard.css"

const LocationCard = ({ image, title, address, link }) => {
    return (
        <>
            <div className="card">
                <div className="image">
                    <img src={image} className="card-img-top" alt={title} />
                </div>

                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{address}</p>
                    <div className="button-chiduong">
                        <a
                            href={link}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Chỉ Đường
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LocationCard;
