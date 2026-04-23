import PropTypes from "prop-types";
import "../../../css/checkout/PaymentMethod.css"

const paymentMethods = [
  {
    id: "cod",
    label: "Thanh toán khi nhận hàng (COD)",
    details: "Thanh toán khi nhận hàng",
  },
  {
    id: "bank_transfer",
    label: "Chuyển khoản ngân hàng",
    details: (
      <>
        <p>Quý khách vui lòng chuyển khoản theo thông tin bên dưới:</p>
        <p>
          <strong>Ngân hàng:</strong> MB Bank (Ngân Hàng Quân Đội)
        </p>
        <p>
          <strong>Số tài khoản:</strong> 140224
        </p>
        <p>
          <strong>Chủ tài khoản:</strong> Bui Tan Phat
        </p>
        <p>
          <strong>Nội dung:</strong> Tên Người Mua Hàng + Số Điện Thoại
        </p>
      </>
    ),
  },
  {
    id: "momo",
    label: "Chuyển khoản MoMo",
    details: (
      <>
        <p>Quý khách vui lòng chuyển khoản theo thông tin bên dưới:</p>
        <p>
          <strong>Số điện thoại:</strong> 0929528914
        </p>
        <p>
          <strong>Tên người nhận:</strong> Bui Tan Phat
        </p>
        <p>
          <strong>Nội dung:</strong> Tên Người Mua Hàng + Số Điện Thoại
        </p>
      </>
    ),
  },
];

const PaymentMethod = ({ selectedPayment, setSelectedPayment }) => {
  return (
    <div className="payment-method">
      {paymentMethods.map((method) => (
        <div key={method.id} className="payment-option">
          <label className={selectedPayment === method.id ? "selected" : ""}>
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selectedPayment === method.id}
              onChange={() => setSelectedPayment(method.id)}
            />
            {method.label}
          </label>

          {/* Hiển thị thông tin chi tiết khi phương thức được chọn */}
          {selectedPayment === method.id && (
            <div className="payment-details">{method.details}</div>
          )}
        </div>
      ))}
    </div>
  );
};

//Thêm propTypes để xác thực kiểu dữ liệu props
PaymentMethod.propTypes = {
  selectedPayment: PropTypes.string.isRequired, // `selectedPayment` là string, bắt buộc
  setSelectedPayment: PropTypes.func.isRequired, // `setSelectedPayment` là function, bắt buộc
};

export default PaymentMethod;
