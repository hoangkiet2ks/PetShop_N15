import "../../../css/homePage/knowledges/Knowledge.css"

const KnowledgeCard = ({ image, title, content, link }) => {
    return (
        <div className="card">
            <div className="image">
                <img src={image} className="card-img-top" alt={title} />
            </div>

            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{content}</p>
                <a href={link}>Đọc thêm</a>
            </div>
        </div>
    );
};

export default KnowledgeCard;
