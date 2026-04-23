import LocationCard from "./LocationCard";
import address1 from "../../../assets/img/address/diachi1.jpg"
import address2 from "../../../assets/img/address/diachi2.webp"
import "../../../css/homePage/locations/LocationList.css"

const locations = [
    {
        image: address1,
        title: "PetShop - Trường Sa",
        address: "168 Trường Sa, Phường 1, Q. Bình Thạnh, Tp Hồ Chí Minh",
        link: "https://www.google.com/maps/place/Paddy+Pet+Shop+-+Tr%C6%B0%E1%BB%9Dng+Sa/@10.8034369,106.6956629,15z/data=!4m6!3m5!1s0x317529c2174993a7:0xbc82826ea83f2193!8m2!3d10.794183!4d106.696823!16s%2Fg%2F11n0dsm80n?entry=ttu"
    },
    {
        image: address2,
        title: "PetShop - Nơ Trang Long",
        address: "412/3 Nơ Trang Long, P. 13, Q. Bình Thạnh, Tp Hồ Chí Minh",
        link: "https://www.google.com/maps/place/Paddy+Pet+Shop+-+N%C6%A1+Trang+Long/@10.8190337,106.7024864,15z/data=!4m6!3m5!1s0x3175290d14321b03:0xa1f619f0168a6013!8m2!3d10.8189637!4d106.70252!16s%2Fg%2F11tsgzkzh6?entry=ttu"
    }
];

const LocationList = () => {

    return (
        <>
            <div className="location-card-list">
                <div className="container">
                    <div className="block-location">
                        {locations.map((location, index) => (
                            <LocationCard key={index} {...location} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default LocationList;
