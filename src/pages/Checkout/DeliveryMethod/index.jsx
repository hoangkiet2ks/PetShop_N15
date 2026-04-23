import PropTypes from "prop-types";
const DeliveryMethod = ({ selectedDelivery, setSelectedDelivery }) => {
  return (
    <>
      <div className="delivery-method">
        <label className={selectedDelivery === "express" ? "selected" : ""}>
          <input
            type="radio"
            name="delivery"
            value="express"
            checked={selectedDelivery === "express"}
            onChange={() => setSelectedDelivery("express")}
          />
          Vận chuyển hỏa tốc (1-2 ngày) - 30,000đ
        </label>
        <label className={selectedDelivery === "fast" ? "selected" : ""}>
          <input
            type="radio"
            name="delivery"
            value="fast"
            checked={selectedDelivery === "fast"}
            onChange={() => setSelectedDelivery("fast")}
          />
          Vận chuyển nhanh (2-3 ngày) - 20,000đ
        </label>
        <label className={selectedDelivery === "standard" ? "selected" : ""}>
          <input
            type="radio"
            name="delivery"
            value="standard"
            checked={selectedDelivery === "standard"}
            onChange={() => setSelectedDelivery("standard")}
          />
          Vận chuyển tiêu chuẩn (5-7 ngày) - 10,000đ
        </label>
      </div>
    </>
  );
};

DeliveryMethod.propTypes = {
  selectedDelivery: PropTypes.string.isRequired, 
  setSelectedDelivery: PropTypes.func.isRequired, 
};

export default DeliveryMethod;
