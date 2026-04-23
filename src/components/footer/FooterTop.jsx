
import "../../css/footer/FooterTop.css"
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FooterTop = () => {

    const [email, setEmail] = useState("");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const notify = () => {
        if (emailRegex.test(email)) {
            toast.info('Bạn sẽ sớm nhận được thông tin mới nhất từ chúng tôi', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        } else {
            toast.warn('Email không hợp lệ!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };


    return (
        <div className="footer-top-content">
            <div className="container">
                <div className="footer-top-content-dangkyTV">
                    <h2 className="footer-block-heading">Thành viên Nhóm 13</h2>
                    <div className="footer-block-subheading">
                        <p>Nhập email của bạn để nhận thông tin về những sản phẩm và chương trình khuyến mãi mới nhất của chúng tôi!</p>
                    </div>
                    <div className="form-dangkyEmail">
                        <input
                            type="text"
                            placeholder="Email của bạn..."
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <div className="button-dangkyTV">
                            <a style={{ cursor: "pointer" }} onClick={notify}>Nhận Mail</a>
                        </div>
                    </div>
                </div>

                <div className="footer-top-content-cotThongTin">
                    <FooterBlock
                        title="Shop"
                        links={["Dành Cho Chó", "Dành Cho Mèo", "Thương Hiệu", "Blogs", "Bộ Sưu Tập"]}
                    />
                    <FooterBlock
                        title="Paddy Pet Shop"
                        links={["Giới Thiệu", "Thành Viên Nhóm 13", "Điều Khoản Sử Dụng", "Tuyển Dụng"]}
                    />
                    <FooterBlock
                        title="Hỗ Trợ Khách Hàng"
                        links={["Chính Sách Đổi Trả Hàng", "Phương Thức Vận Chuyển", "Chính Sách Bảo Mật", "Phương Thức Thanh Toán", "Chính Sách Hoàn Tiền"]}
                    />

                    <div className="footer-top-block-item">
                        <div className="footer-block-mobile">
                            <h2 className="footer-block-heading">Liên Hệ</h2>
                            <div className="footer-block-list">
                                <p>CÔNG TY CỔ PHẦN THUƠNG MẠI & DỊCH VỤ Nhóm 13</p>
                                <p>MST: 0316459054</p>
                                <p>116 Nguyễn Văn Thủ, Phường Đa Kao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
                                <p style={{ lineHeight: "24px" }}>
                                    <i style={{ fontSize: "20px" }} className="fa-solid fa-phone"></i>
                                    <span> Hotline: 0867677891 </span>
                                </p>
                                <p style={{ lineHeight: "24px" }}>
                                    <i style={{ fontSize: "20px" }} className="fa-solid fa-envelope"></i>
                                    <span> Email: <span style={{ textDecoration: "underline" }}>marketing@nhom13hoppet.vn</span></span>
                                </p>

                                <div className="social-item">
                                    <ul>
                                        <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-square-instagram"></i></a></li>
                                        <li><a href="#"><i className="fa-brands fa-tiktok"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FooterBlock = ({ title, links }) => {
    return (
        <div className="footer-top-block-item">
            <div className="footer-block-mobile">
                <h2 className="footer-block-heading">{title}</h2>
                <div className="footer-block-list">
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}><a href="#">{link}</a></li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterTop;