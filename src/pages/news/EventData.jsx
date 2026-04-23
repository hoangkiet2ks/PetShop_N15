import eventImage from "../../assets/img/news/paddy_xmas_pawty.png";
import santaImage from "../../assets/img/news/santa.png";
import treeImage from "../../assets/img/news/christmas_tree.png";
import reindeerImage from "../../assets/img/news/reindeer.png";
import eventImage3 from "../../assets/img/news/paddy_pet_weekend.png";
import eventImage4 from "../../assets/img/news/pate_promo.png";
import eventImage4_2 from "../../assets/img/news/pate_promo2.png";
import eventImage5 from "../../assets/img/news/natural_core_event.png";
import bingobingo from "../../assets/img/news/bingo.png";
import opening from "../../assets/img/news/opening.png";
import vongquay from "../../assets/img/news/vongquay.png";
import sticker1 from "../../assets/img/news/stickers1.png";


const EventData = {
    "1": {
        title: "Sự kiện 1",
        cssClass: "NewsEvent1",
        content: (
            <div className="background-container">
                {/* Hiệu ứng bóng bay 🎈 */}
                <div className="balloons">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="balloon"></div>
                    ))}
                </div>
                <div className="news-event-list">
                    <h1 className="text-2xl font-bold text-orange-600" style={{ color: "orange" }}>
                        PADDY LÊN 4 - RỘN RÀNG QUÀ TẶNG 🎉
                    </h1>
                    <p className="text-gray-700">
                        Sự kiện được các Sen mong chờ nhất năm chính thức khởi động rồi đây! Để tri ân những khách hàng đã và đang ủng hộ Paddy,
                        <strong> "Paddy Lên 4 - Rộn Ràng Quà Tặng" </strong> hứa hẹn sẽ mang đến hàng loạt phần quà hấp dẫn.
                    </p>
                </div>
                {/* Tiêu đề */}
                <div className="news-event-list text-center">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0624/1746/9697/files/z6212291664989_2676c26c748abc3e3ceceb5858dd0939_1024x1024.jpg?v=1736416164"
                        alt="Sự kiện Paddy"
                        className="rounded-lg mx-auto mb-4"
                    />

                </div>

                {/* Thời gian & Địa điểm */}
                <div className="news-event-list">

                    <h2 className="text-lg font-semibold" style={{ color: "orange" }}>📅 Thời gian:</h2>
                    <p className="text-gray-600">Thứ bảy, chủ nhật ngày 18-19/01/2025</p>

                    <h2 className="text-lg font-semibold mt-4" style={{ color: "orange" }}>📍 Địa điểm:</h2>
                    <p className="text-gray-600">Paddy Pet Shop - 168 Trường Sa, Phường 1, Q. Bình Thạnh, Tp Hồ Chí Minh</p>
                </div>

                {/* Phần quà 1 */}
                <div className="news-event-list">

                    <h2 className="text-xl font-bold text-orange-500" style={{ color: "orange" }}>1️⃣ Miễn phí chăm sóc sức khỏe cho Boss</h2>
                    <p><strong>⏰ Thời gian:</strong> 10h - 17h Thứ bảy 18/01</p>
                    <ul className="list-disc ml-6">
                        <li>Miễn phí chích ngừa dại</li>
                        <li>Miễn phí xổ giun</li>
                        <li>Miễn phí thăm khám và tư vấn sức khỏe</li>
                        <li>Miễn phí tắm khô cơ bản & vệ sinh tai (Tropiclean)</li>
                    </ul>
                </div>

                {/* Phần quà 2 */}
                <div className="news-event-list">

                    <h2 className="text-xl font-bold text-orange-500" style={{ color: "orange" }}>2️⃣ Rút thăm trúng thưởng 100%</h2>
                    <p><strong>⏰ Thời gian:</strong> 9h - 22h ngày 18-19/01</p>
                    <p>Khách hàng sẽ nhận được phiếu rút thăm khi mua sắm tại Paddy từ ngày 06 - 19/01/2025.</p>
                </div>

                {/* Phần quà 3 */}
                <div className="news-event-list">

                    <h2 className="text-xl font-bold text-orange-500" style={{ color: "orange" }}>3️⃣ Ưu đãi hấp dẫn khác</h2>
                    <p><strong>⏰ Thời gian:</strong> 9h - 22h ngày 18-19/01</p>
                    <ul className="list-disc ml-6">
                        <li>Combo quà 249K cho 40 khách đầu tiên</li>
                        <li>Combo quà trị giá 1 triệu cho 4 đơn hàng cao nhất</li>
                        <li>Giảm giá lên đến 40% và mua 1 tặng 1 nhiều sản phẩm</li>
                    </ul>
                </div>
                <div className="news-event-list">
                    <img
                        src="https://cdn.shopify.com/s/files/1/0624/1746/9697/files/z6212291776850_c83ac531113595a4d1472760849efa89_1024x1024.jpg?v=1736416164"
                        alt="Chăm sóc thú cưng miễn phí"
                        className="rounded-lg mx-auto mb-4"
                    />
                </div>

                {/* Liên hệ */}
                <div className="news-event-list">

                    <p className="text-lg font-semibold">📞 Mọi thắc mắc vui lòng liên hệ:</p>
                    <p>Hotline: <strong>0867677891</strong> hoặc Fanpage Paddy</p>
                </div>

                {/* Button Call to Action */}
                <div className="text-center mt-4">
                    <a href="https://www.facebook.com/PaddyPetShop" className="button">
                        Tham gia ngay!
                    </a>
                </div>

            </div>
        )
    },
    "2": {
        title: "Sự kiện 2",
        cssClass: "NewsEvent2",
        content: (
            <div className="background-container">
                <div className="news-event-list">
                    {/* Cây thông Noel và ông già Noel */}
                    <div className="christmas-decorations">
                        <img src={treeImage} alt="Christmas Tree" className="tree" />
                        <img src={santaImage} alt="Santa Claus" className="santa" />
                        <img src={reindeerImage} alt="Reindeer" className="reindeer" />
                    </div>
                </div>
                <div className="snow-container">
                    <br />
                </div>
                <div className="news-event-list">

                    <h1 className="text-2xl font-bold text-red-600" style={{ margin: 20, color: "red" }}>🎄 PADDY XMAS PAWTY 21/12 - MERRY CHRISTMAS 🎁</h1>
                    <img src={eventImage} alt="Paddy Xmas Pawty" className="rounded-lg mx-auto mb-4" />
                </div>
                <div className="news-event-list">
                    <h2 className="text-lg font-semibold" style={{ color: "red" }}>📅 Thời gian:</h2>
                    <p>Thứ bảy ngày 21/12/2024</p>
                    <h2 className="text-lg font-semibold mt-4" style={{ color: "red" }}>📍 Địa điểm:</h2>
                    <p>Paddy Pet Shop - 168 Trường Sa, Phường 1, Q. Bình Thạnh, Tp Hồ Chí Minh</p>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-green-500" style={{ color: "red" }}>1️⃣ Miễn phí chăm sóc sức khỏe cho Boss</h2>
                    <p><strong>⏰ Thời gian:</strong> 10h00 - 17h00</p>
                    <ul className="list-disc ml-6">
                        <li>Miễn phí tắm khô cơ bản</li>
                        <li>Miễn phí vệ sinh chân</li>
                        <li>Miễn phí chích ngừa dại</li>
                        <li>Miễn phí xổ giun và tư vấn sức khỏe</li>
                    </ul>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-red-500" style={{ color: "red" }}>2️⃣ Vòng quay may mắn - 100% trúng thưởng</h2>
                    <p><strong>⏰ Thời gian:</strong> 9h00 - 22h00</p>
                    <p>Nhận phiếu quay trúng thưởng khi mua hàng từ 09 - 21/12/2024.</p>
                </div>
                <div className="news-event-list">

                    <h2 className="text-xl font-bold text-blue-500" style={{ color: "red" }}>3️⃣ Ưu đãi hấp dẫn</h2>
                    <ul className="list-disc ml-6">
                        <li>Giảm giá 15% các sản phẩm Nutri Plan và Hana Pet</li>
                        <li>Mua 1 tặng 1 nhiều sản phẩm</li>
                        <li>Quà tặng cho khách check-in và follow social media</li>
                    </ul>
                </div>

                <div className="news-event-list">
                    <p className="text-lg font-semibold">📞 Mọi thắc mắc vui lòng liên hệ:</p>
                    <p>Hotline: <strong>0867677891</strong> hoặc Fanpage Paddy</p>
                </div>
                <div className="text-center mt-4">
                    <a href="https://www.facebook.com/PaddyPetShop" className="button">
                        Tham gia ngay!
                    </a>
                </div>
            </div>
        )
    },
    "3": {
        title: "Sự kiện 3",
        cssClass: "NewsEvent3",
        content: (
            <div className="background-container">
                <div className="news-event-list">
                    <h1 className="text-2xl font-bold text-orange-600" style={{ margin: 20, color: "orange" }}>
                        🎉 Sự Kiện "Paddy Pet Weekend 24/11/2024" 🐾
                    </h1>
                    <img src={eventImage3} alt="Paddy Pet Weekend" className="rounded-lg mx-auto mb-4" />
                </div>
                <div className="news-event-list">
                    <h2 className="text-lg font-semibold" style={{ color: "orange" }}>📅 Thời gian:</h2>
                    <p>Chủ Nhật ngày 24/11/2024</p>
                    <h2 className="text-lg font-semibold mt-4" style={{ color: "orange" }}>📍 Địa điểm:</h2>
                    <p>Paddy Pet Shop - 91B Trần Não, P. An Khánh, Tp. Thủ Đức</p>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-red-500" style={{ color: "orange" }}>1️⃣ Miễn phí xổ giun cho Boss</h2>
                    <p><strong>⏰ Thời gian:</strong> 10h00 - 17h00</p>
                    <p><strong>Đăng ký miễn phí:</strong> <a href="#">tại đây</a></p>
                    <p>Xổ giun miễn phí từ thương hiệu chăm sóc sức khỏe thú cưng Bossen.</p>
                    <p><strong>*Ưu tiên khách hàng đăng ký trước.</strong></p>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-green-500" style={{ color: "orange" }}>2️⃣ Thử tài ném đúng trúng quà</h2>
                    <p><strong>⏰ Thời gian:</strong> 9h00 - 22h00</p>
                    <p>Khách hàng sẽ nhận được phiếu chơi game trúng quà khi mua sắm từ ngày 15 - 24/11/2024.</p>
                    <p><strong>🎯 Thể lệ trò chơi:</strong></p>
                    <ul className="list-disc ml-6 text-lg">
                        <li>🎟️ Với mỗi <strong>200K</strong> giá trị đơn hàng, khách nhận <strong>1 phiếu</strong> chơi game.</li>
                        <li>🏀 Mỗi phiếu tương đương <strong>2 lượt ném banh.</strong></li>
                        <li>🎁 <strong>Quà tặng dựa trên tổng điểm 2 lượt ném:</strong></li>
                        <ul className="list-disc ml-10 bg-yellow-100 p-2 rounded-lg border border-yellow-400">
                            <li>🥇 <strong>Từ 120 điểm trở lên:</strong> Giải nhất - <span className="text-red-500 font-bold">Combo quà 200K</span></li>
                            <li>🥈 <strong>60 đến 110 điểm:</strong> Giải nhì - <span className="text-blue-500 font-bold">Combo quà 130K</span></li>
                            <li>🥉 <strong>Dưới 60 điểm:</strong> Giải khuyến khích - <span className="text-green-500 font-bold">Combo quà 50K</span></li>
                        </ul>
                        <li className="text-red-500 font-bold">⚠️ *Lưu ý:* Số lượng quà có hạn, chương trình có thể kết thúc sớm.</li>
                    </ul>

                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-blue-500" style={{ color: "orange" }}>3️⃣ Ưu đãi hấp dẫn</h2>
                    <ul className="list-disc ml-6">
                        <li>Giảm giá 15% các sản phẩm từ Bossen và Moochie.</li>
                        <li>Tặng áo bông cho cún khi mua hạt LuvCare từ 500g (số lượng có hạn).</li>
                    </ul>
                </div>
                <div className="news-event-list">
                    <p className="text-lg font-semibold">📞 Mọi thắc mắc vui lòng liên hệ:</p>
                    <p>Hotline: <strong>0867677891</strong> hoặc Fanpage Paddy</p>
                </div>
                <div className="text-center mt-4">
                    <a href="https://www.facebook.com/PaddyPetShop" className="button">
                        Tham gia ngay!
                    </a>
                </div>
            </div>
        )
    },
    "4": {
        title: "Sự kiện 4",
        cssClass: "NewsEvent4",
        content: (
            <div className="background-container">
                <div className="news-event-list">
                    <h1 className="event-title" style={{ color: "orange", fontSize: 40 }}>🎉 BẬT NẮP PATE - TRÚNG QUÀ THÍCH MÊ 🎁</h1>
                    <img src={eventImage4} alt="Bật Nắp Pate" className="rounded-lg mx-auto mb-4" />
                </div>

                <div className="news-event-list">
                    <h2 className="text-red-500 font-bold">📅 Thời gian:</h2>
                    <p>Từ nay đến hết 31/01/2025</p>
                    <h2 className="text-red-500 font-bold mt-4">📍 Địa điểm đổi quà:</h2>
                    <p>Hệ thống cửa hàng Paddy tại Tp.HCM</p>
                </div>

                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-yellow-500">🏆 Danh sách giải thưởng</h2>
                    <p><strong>Tổng giá trị giải thưởng lên đến 1 tỷ đồng:</strong></p>
                    <ul className="prize-list">
                        <li>🎯 <strong>01 Giải đặc biệt:</strong> Iphone 16 trị giá 25.000.000 đồng</li>
                        <li>🏅 <strong>10 Giải nhất:</strong> Mỗi giải 01 chỉ vàng SJC (tổng trị giá 80.000.000 đồng)</li>
                        <li>🎁 <strong>18.000 Giải khuyến khích:</strong> Mỗi giải 01 lon Pate 380g</li>
                    </ul>
                </div>

                <div className="news-event-list">
                    <img src={eventImage4_2} alt="Bật Nắp Pate" className="rounded-lg mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-green-500">📜 Cách tham gia</h2>
                    <ul className="steps-list">
                        <li>🛍️ Ghé cửa hàng, website hoặc sàn thương mại Paddy Pet Shop</li>
                        <li>🍽️ Chọn sản phẩm Pate King’s Pet 380g</li>
                        <li>🎊 Khui hộp và đổi thưởng ngay tại cửa hàng Paddy</li>
                    </ul>
                    <p className="note">⚠️ Paddy hỗ trợ thu đổi nắp trúng thưởng mà không cần hóa đơn mua hàng.</p>
                </div>

                <div className="news-event-list">
                    <h2 className="text-lg font-bold text-blue-500">📌 Thông tin sản phẩm</h2>
                    <p><strong>🛡️ Đạt chuẩn an toàn thực phẩm:</strong> Mực in an toàn, không ảnh hưởng sức khỏe thú cưng.</p>
                    <p>💰 <strong>Ưu đãi:</strong> Giảm giá 5% khi mua trực tiếp tại Paddy.</p>
                </div>

                <div className=" text-center mt-4">
                    <a href="https://www.facebook.com/PaddyPetShop" className="button">Tham gia ngay!</a>
                </div>
            </div>
        )
    },
    "5": {
        title: "Sự kiện 5",
        cssClass: "NewsEvent5",
        content: (
            <div className="background-container">
                <div className="news-event-list text-center">
                    <h1 className="text-2xl font-bold text-green-600 my-4">✈️ Chiến Dịch “Cất Cánh” Cùng Bé Cưng 🐶🐱</h1>
                    <img src={eventImage5} alt="Natural Core Event" className="rounded-lg mx-auto mb-4" />
                </div>
                <div className="news-event-list">
                    <h2 className="text-lg font-semibold text-green-500">📅 Thời gian:</h2>
                    <p>23/10/2024 - 26/10/2024</p>
                    <h2 className="text-lg font-semibold text-green-500 mt-4">📍 Địa điểm:</h2>
                    <p>Paddy Pet Shop - 91B Trần Não, P. An Khánh, Tp. Thủ Đức</p>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-red-500">🎟️ Thể lệ chương trình “Săn Natural Core – Rinh vé vàng – Đi Hàn Quốc”</h2>
                    <ul className="list-disc ml-6">
                        <li>Mua hạt Natural Core C1 Bene Kitten hoặc Natural Core C3 Bene 3012 Multi-Protein tại Paddy Pet Shop.</li>
                        <li>Tìm vé vàng trong các gói hạt nhỏ để có cơ hội du lịch Hàn Quốc 4 ngày 3 đêm.</li>
                        <li>Liên hệ Fanpage Natural Core hoặc tổng đài 028 38 327 328 (Nhấn phím 201) để nhận thưởng.</li>
                    </ul>
                </div>
                <div className="news-event-list">
                    <h2 className="text-xl font-bold text-blue-500">🎉 Hoạt động đặc sắc trong sự kiện:</h2>
                    <ul className="list-disc ml-6">
                        <li>Giảm giá 10% tất cả sản phẩm Natural Core.</li>
                        <li>Check-in nhận quà hấp dẫn.</li>
                        <li>Gamezone với nhiều trò chơi thú vị.</li>
                        <li>Mua sắm nhận quà từ Natural Core Vietnam.</li>
                    </ul>
                </div>
                <div className="news-event-list">
                    <h2 >🎁 Lucky Draw – Quay số trúng thưởng:</h2>
                    <ul className="list-disc ml-6">
                        <li>03 giải cho cún yêu: Gói Natural Core Bene M50 10kg.</li>
                        <li>03 giải cho mèo cưng: Gói Natural Core Bene 3012 10kg.</li>
                        <img src={bingobingo} alt="Natural Core Event" className="rounded-lg mx-auto mb-4" />

                    </ul>
                </div>
                <div className=" news-event-list">
                    <p className="text-lg font-semibold">📞 Mọi thắc mắc vui lòng liên hệ:</p>
                    <p>Hotline: <strong>0867677891</strong> hoặc Fanpage Paddy</p>
                </div>
            </div>
        )
    },
    "6": {
        title: "🎉 KHAI TRƯƠNG CHI NHÁNH 3 - BOSS ĐẾN LÀ CÓ QUÀ! 🐾",
        cssClass: "NewsEvent6",
        content: (
            <div className="background-container">
                <div className="balloon-container"></div>

                <div className="card-container">
                    <div className="news-event-list">
                        <h2 style={{ color: "red" }}>🎉 KHAI TRƯƠNG CHI NHÁNH 3 - BOSS ĐẾN LÀ CÓ QUÀ! 🐾</h2>
                        <p>🎊 Mời các Sen và Boss cùng đến khám phá chi nhánh mới của Paddy với nhiều ưu đãi hấp dẫn! 🎊</p>
                        <img src={opening} alt="Paddy Pet Weekend" className="rounded-lg mx-auto mb-4" />
                    </div>

                    <div className="news-event-list">
                        <h3>📅 Thời gian & Địa điểm</h3>
                        <p>🕘 9h00 - 22h00, 24-25/08/2024</p>
                        <p>📍 Paddy Pet Shop - 91B Trần Não, Thủ Đức</p>
                    </div>

                    <div className="news-event-list">
                        <h3>🩺 Miễn phí chăm sóc sức khỏe cho Boss</h3>
                        <p>🎁 Miễn phí tẩy giun, chích ngừa dại (100 ca đầu tiên)</p>
                        <p>🐾 Giảm 50% triệt sản (10 khách đầu tiên)</p>
                        <p>🛁 SPA 5 bước miễn phí</p>
                    </div>

                    <div className="news-event-list">
                        <h3>⚖️ “Boss bao nhiêu kí, giảm bấy nhiêu %”</h3>
                        <p>🐶 Boss nặng 5kg, giảm ngay 5%!</p>
                        <p>🎯 Giảm tối đa 150K/ hóa đơn</p>
                    </div>

                    <div className="news-event-list">
                        <h3>🎁 Rút thăm trúng thưởng 100%</h3>
                        <p>🛍️ Hóa đơn từ 199K được rút thăm ngay</p>
                    </div>

                    <div className="news-event-list">
                        <h3>📸 Check-in nhận quà</h3>
                        <p>📲 Quét QR, đánh giá 5 sao & nhận quà</p>
                    </div>

                    <div className="news-event-list">
                        <h3>🔥 Ưu đãi hấp dẫn khác</h3>
                        <p>🆕 Giảm đến 15% cho khách hàng mới</p>
                        <p>🎁 Quà tặng trị giá 199K cho 50 khách đầu tiên</p>
                        <p>💰 Giảm giá lên đến 50% nhiều sản phẩm</p>
                    </div>

                    <div className="news-event-list">
                        <p>📞 Mọi thắc mắc vui lòng liên hệ Hotline 0867677891 hoặc Fanpage Paddy để được hỗ trợ nhé! 💬</p>
                    </div>
                </div>
            </div>
        )
    },
    "7": {
        title: "🐾 Ngày Hội Chăm Sóc Thú Cưng Paddy 20/7/2024 🎉",
        cssClass: "NewsEvent7",
        content: (
            <div className="background-container">
                <div className="news-event-list" style={{ paddingTop: 20 }}>
                    <h2 style={{ color: "blue", fontSize: 40 }}>🐾 Ngày Hội Chăm Sóc Thú Cưng Paddy 20/7/2024 🎉</h2>
                </div>

                <div className="news-event-list">
                    <img
                        src={vongquay}
                        style={{ width: "50%" }}
                        alt="Paddy Pet Weekend"
                        className="rounded-lg mx-auto mb-4"
                    />
                </div>

                <div className="news-event-list">
                    <p>📅 <strong>Thời gian:</strong> 9h30 - 17h00, Thứ bảy 20/07/2024</p>
                    <p>📍 <strong>Địa điểm:</strong> Paddy Pet Shop - 168 Trường Sa, P.1, Q. Bình Thạnh</p>
                    <p>📝 <strong>Đăng ký miễn phí:</strong> <a href="#">Tại đây</a></p>
                </div>

                <div className="news-event-list">
                    <h3>🐶 Miễn phí chăm sóc sức khỏe cho Boss 🐱</h3>
                    <p>👨‍⚕️ Thăm khám & tư vấn sức khỏe từ BOSSEN:</p>
                    <ul>
                        <li>🐕 Cún: Viên nhai trị ve Nomecto, sổ giun & soi nấm da</li>
                        <li>🐈 Mèo: Sổ giun & soi nấm da</li>
                    </ul>
                    <p>⚡ <strong>Ưu tiên khách hàng đăng ký trước!</strong></p>
                </div>

                <div className="news-event-list">
                    <h3>🎡 Vòng quay may mắn 100% trúng thưởng 🎁</h3>
                    <p>🎯 Quà tặng từ Ganador & Minino:</p>
                    <ul>
                        <li>🍖 Combo 2 Minino mực 1.5kg</li>
                        <li>🐶 Equilibrio chó con 2kg</li>
                        <li>🥩 Ganador bò 3Kg, 1.5kg, 400g</li>
                        <li>🐟 Minino mực 1.5kg, 350g</li>
                        <li>🛁 Khăn tắm & 🐾 Dây dắt</li>
                    </ul>
                    <p>💰 Điều kiện: Hóa đơn từ 199.000 vnđ (Tối đa 2 lượt quay/SĐT)</p>
                </div>

                <div className="news-event-list">
                    <h3>🔥 Nhiều ưu đãi hấp dẫn 🔥</h3>
                    <ul>
                        <li>💸 Giảm 10% sản phẩm Ganador vị Bò & Gà</li>
                        <li>🎁 Cùng nhiều khuyến mãi hấp dẫn khác!</li>
                    </ul>
                </div>

                <div className="news-event-list">
                    <p>📞 Mọi thắc mắc vui lòng liên hệ <strong>Hotline 0867677891</strong> hoặc <strong>Fanpage Paddy</strong> để được hỗ trợ nhé!</p>
                </div>
            </div>
        )
    },
    "8": {
        title: "📅 Ngày Hội Sức Khỏe Thú Cưng Paddy",
        cssClass: "NewsEvent8",
        content: (
            <div className="background-container">
                <div className="balloon-container"></div>
                <div className="news-event-list">
                    <h2 style={{ color: "green", fontSize: 40 }}> 📅 Ngày Hội Sức Khỏe Thú Cưng Paddy</h2>
                </div>
                <div className="news-event-list">
                    <img src={sticker1} style={{ width: "50%", display: "block", margin: "0 auto" }} alt="Sticker" className="sticker sticker-left" />
                </div>

                <div className="event-details">
                    <div className="news-event-list">
                        <h3 style={{ color: "green" }}>📅 Thời gian:</h3>
                        <p>10h-17h ngày Thứ 7 (1/6/2024)</p>

                        <h3 style={{ color: "red" }}>📍 Địa điểm:</h3>
                        <p>Paddy - 168 Trường Sa, P.1, Q. Bình Thạnh, Tp Hồ Chí Minh</p>

                        <h3 style={{ color: "blue" }}>🔗 Đăng ký:</h3>
                        <p>Quét mã QR hoặc <a href="#">click vào đây</a></p>
                    </div>
                </div>

                <div className="program-details">
                    <div className="news-event-list">
                        <h3 style={{ color: "green" }}>1️⃣ Miễn phí chăm sóc sức khỏe cho Boss</h3>
                        <p>Miễn phí thăm khám, tẩy giun, vệ sinh tai từ Samyang Animal Clinic.</p>
                        <p>*Ưu tiên khách hàng đăng ký trước, Paddy sẽ liên hệ xác nhận đặt lịch.</p>
                    </div>
                    <div className="news-event-list">
                        <h3 style={{ color: "red" }}>🎡 Vòng quay may mắn 100% trúng thưởng</h3>
                        <p>Danh sách quà tặng:</p>
                        <ul>
                            <li>Súp dinh dưỡng Nutri Stick</li>
                            <li>Pate dinh dưỡng Nutri Plan</li>
                            <li>Thức ăn hạt Nutri Plan – All Stage Plus 5kg</li>
                        </ul>
                        <p>Điều kiện: Hóa đơn tối thiểu 50.000 vnđ từ Nutri Plan hoặc Samyang.</p>
                    </div>
                    <div className="news-event-list">
                        <h3 style={{ color: "blue" }}>🎁 Quà tặng check-in vào cửa</h3>
                        <p>Đánh giá 5 sao hoặc follow TikTok để nhận quà hấp dẫn.</p>
                        <p>Cách thức: Quét mã QR - Đánh giá/Folllow - Đưa nhân viên kiểm tra - Nhận quà.</p>
                    </div>
                    <div className="news-event-list">
                        <h3 style={{ color: "orange" }}>🔥 Nhiều quà tặng và ưu đãi hấp dẫn</h3>
                        <ul>
                            <li>Giảm giá 10% tất cả sản phẩm của Samyang (Nutri Plan, Holic, Zero Lab).</li>
                            <li>Voucher bệnh viện Samyang Animal Clinic trị giá 100.000 vnđ.</li>
                            <li>Tặng mẫu thử thức ăn hạt Gói Nutri Plan – All Stage Plus 50g.</li>
                        </ul>
                    </div>
                </div>
                <div className="news-event-list">
                    <p className="contact">📞 Mọi thắc mắc vui lòng liên hệ Hotline 0867677891 hoặc Fanpage Paddy.</p>
                </div>
            </div>
        )
    }
};

export default EventData;
