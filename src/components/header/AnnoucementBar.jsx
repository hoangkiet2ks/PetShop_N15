import "../../css/header/AnnoucementBar.css"

const AnnoucementBar = () => {
    return (
        <>
            <div className="annoucement-bar">
                <div className="annoucement-bar-container">
                    <p className="annoucement">Giảm đến <span>50% OFF</span> dành cho hội viên</p>
                    <div className="register-click"><a href="">Đăng ký ngay!</a></div>
                </div>
            </div>
        </>
    )
}

export default AnnoucementBar;