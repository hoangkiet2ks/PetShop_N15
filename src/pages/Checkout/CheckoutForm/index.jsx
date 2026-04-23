import { useEffect, useState } from "react";
import { getCountryList } from "../../../services/countryService";
import "../../../css/checkout/ChechoutForm.css";

const CheckoutForm = ({ onFormSubmit }) => {
  const [dataCountry, setDataCountry] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState("");

  // State để chứa dữ liệu biểu mẫu và lỗi
  const [formData, setFormData] = useState({
    phoneNumber: "",
    fullName: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    phoneNumber: "",
    fullName: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCountryList();
      setDataCountry(result);
    };
    fetchApi();
  }, []);

  const handleDeliveryChange = (event) => {
    setSelectedDelivery(event.target.value);
  };

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setWards([]);

    const cityData = dataCountry.find((city) => city.Name === cityId);
    setDistricts(cityData ? cityData.Districts : []);
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);

    const districtData = districts.find(
      (district) => district.Name === districtId
    );
    setWards(districtData ? districtData.Wards : []);
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        const fullNameRegex = /^[A-ZÀ-Ỹ][a-zà-ỹ]+(\s[A-ZÀ-Ỹ][a-zà-ỹ]+)*$/;
        if (!fullNameRegex.test(value)) {
          error = "Họ và tên không hợp lệ.";
        }
        break;

      case "phoneNumber":
        const phoneRegex = /^(0[2-9][0-9]{8}|84[2-9][0-9]{8})$/;
        if (!phoneRegex.test(value)) {
          error = "Số điện thoại không hợp lệ.";
        }
        break;

      case "email":
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          error = "Email không hợp lệ.";
        }
        break;

      case "address":
        const addressRegex = /^[A-Za-z0-9À-ỹ\s,.-]{5,100}$/;
        if (!addressRegex.test(value)) {
          error = "Địa chỉ phải từ 5 đến 100 ký tự.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));

    // Kiểm tra xem không còn lỗi nào thì gọi hàm onFormSubmit
    if (!error) {
      onFormSubmit({ ...formData, [name]: value });
    }
  };

  return (
    <>
      <h2>Thông tin người nhận hàng</h2>
      <form>
        <div className="phoneNumber-input">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div className="checkbox-option">
          <input type="checkbox" id="email-checkbox" />
          <span htmlFor="email-checkbox ">
            Gửi cho tôi tin tức và ưu đãi qua email
          </span>
        </div>

        <h2>Giao hàng</h2>
        <div className="checkout-options">
          <div className="checkout-delivery-method">
            <div className="checkout-delivery-item">
              <div className="checkout-delivery-title">
                <label htmlFor="delivery-home" className={selectedDelivery === "home" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="delivery-method"
                    id="delivery-home"
                    value="home"
                    onChange={handleDeliveryChange}
                  />
                  Giao hàng tận nơi
                </label>
              </div>
              {selectedDelivery === "home" && (
                <div className="checkout-delivery-details">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Họ và tên"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && <span className="error">{errors.fullName}</span>}

                  <div className="checkout-contact">
                    <div className="checkout-email">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="checkout-phone">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Số điện thoại"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>
                  </div>

                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <span className="error">{errors.address}</span>}

                  <div className="checkout-location">
                    <select name="city" id="city" onChange={handleCityChange} value={selectedCity}>
                      <option value="">Tỉnh/Thành</option>
                      {dataCountry.map((city) => (
                        <option key={city.Id} value={city.Name}>
                          {city.Name}
                        </option>
                      ))}
                    </select>
                    <select
                      name="district"
                      id="district"
                      onChange={handleDistrictChange}
                      disabled={!selectedCity}
                      value={selectedDistrict}
                    >
                      <option value="">Quận/Huyện</option>
                      {districts.map((district) => (
                        <option key={district.Id} value={district.Name}>
                          {district.Name}
                        </option>
                      ))}
                    </select>
                    <select name="ward" id="ward" disabled={!selectedDistrict}>
                      <option value="">Phường/Xã</option>
                      {wards.map((ward) => (
                        <option key={ward.Id} value={ward.Name}>
                          {ward.Name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="checkout-delivery-item">
              <div className="checkout-delivery-title">
                <label htmlFor="delivery-shop" className={selectedDelivery === "shop" ? "selected" : ""}>
                  <input
                    type="radio"
                    name="delivery-method"
                    id="delivery-shop"
                    value="shop"
                    onChange={handleDeliveryChange}
                  />
                  Nhận tại cửa hàng
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;