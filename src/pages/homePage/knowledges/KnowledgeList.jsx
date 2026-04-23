import KnowledgeCard from './KnowledgeCard';
import "../../../css/homePage/knowledges/KnowledgeList.css";
import knowledge1 from "../../../assets/img/knowledge/knowledge1.webp";
import knowledge2 from "../../../assets/img/knowledge/knowledge2.webp";
import knowledge3 from "../../../assets/img/knowledge/knowledge3.webp";

const knowledgeData = [
    {
        image: knowledge1,
        title: "So Sánh Các Loại Thuốc Tẩy Giun Chó Mèo",
        content: `Chuyên mục:
            1. Vì sao cần so sánh các loại thuốc tẩy giun chó mèo?
            2. Chó mèo thường nhiễm loại giun nào?
            3. Nguyên nhân khiến chó mèo bị giun sán
            4. So sánh các loại thuốc tẩy giun chó mèo phổ biến nhất`,
        link: "#"
    },
    {
        image: knowledge2,
        title: "Nguyên Nhân Và Cách Trị Chó Bị Rụng Lông Thành Từng Mảng",
        content: `Chuyên mục:
            1. Tại sao chó bị rụng lông thành từng mảng?
            2. Hướng dẫn cách trị rụng lông chó tại nhà
            3. Cách phòng ngừa tình trạng chó bị rụng lông thành từng mảng`,
        link: "#"
    },
    {
        image: knowledge3,
        title: "Cách Trị Chó Bị Đổ Ghèn",
        content: `Chuyên mục:
            1. Nguyên nhân mắt chó bị đổ ghèn
            2. Hướng dẫn cách trị chó bị đổ ghèn hiệu quả
            3. Những thực phẩm hỗ trợ cách trị chó bị đổ ghèn
            4. Cách phòng tránh bệnh đổ ghèn ở chó`,
        link: "#"
    }
];

const KnowledgeList = () => {
    return (
        <div className="knowledge-card-list">
            <div className="container">
                <div className="block-header-content">
                    <h3 className="title">
                        <span className="text">
                            Chăm Boss Cùng Tớ Nhé
                            <span> <i className="fa-solid fa-paw"></i></span>
                        </span>
                    </h3>

                    <a href="#" className="view_all">Xem tất cả</a>
                </div>

                <div className="block-knowledge">
                    {knowledgeData.map((item, index) => (
                        <KnowledgeCard
                            key={index}
                            image={item.image}
                            title={item.title}
                            content={item.content}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KnowledgeList;
