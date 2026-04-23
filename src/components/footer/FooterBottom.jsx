import "../../css/footer/FooterBottom.css"
import logoChungNhanBoCongThuong from "../../assets/img/chungnhanbocongthuong.webp";

const FooterBottom = () => {
    return (
        <div className="footer-bottom-content">
            <div className="container">
                <div className="footer-block-bottom">
                    <div className="footer-copyright">
                        <p>@2022 Paddy Pet Shop. All Rights Reserved. Powered By Nhom13 Pet Shop.
                            Themes By Nhom13PetShop.Vn</p>
                    </div>
                    <div className="logochungnhan">
                        <img src={logoChungNhanBoCongThuong} alt="Chứng nhận bộ công thương" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;