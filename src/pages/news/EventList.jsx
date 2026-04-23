import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../../css/news/EventList.css";
import n1 from "../../assets/img/news/n1.png";
import n2 from "../../assets/img/news/n2.png";
import n3 from "../../assets/img/news/n3.png";
import n4 from "../../assets/img/news/n4.png";
import n5 from "../../assets/img/news/n5.png";
import n6 from "../../assets/img/news/n6.png";
import n7 from "../../assets/img/news/n7.png";
import n8 from "../../assets/img/news/n8.png";

const events = [
  {
    title: "PADDY LÊN 4 - RỘN RÀNG QUÀ TẶNG",
    date: "Jan 07, 2025",
    category: "Marketing Paddy",
    description: "Sự kiện được các Sen mong chờ nhất năm chính thức khởi động rồi đây!...",
    image: n1,
    id: 1
  },
  {
    title: "Sự Kiện 'Paddy Xmas Pawty 21/12'",
    date: "Dec 05, 2024",
    category: "Marketing Paddy",
    description: "Chương trình 'Paddy Xmas Pawty 21/12/2024' do Hana Pet, Nutri Plan...",
    image: n2,
    id: 2
  },
  {
    title: "Sự Kiện 'Paddy Pet Weekend 24/11/2024' Tại Paddy 91B Trần Não",
    date: "Nov 14, 2024",
    category: "Marketing Paddy",
    description: "Chương trình Paddy Pet Weekend 24/11/2024 do Bossen và Moochie...",
    image: n3,
    id: 3
  },
  {
    title: "Bật Nắp Pate - Trúng Quà Thích Mê",
    date: "Oct 23, 2024",
    category: "Marketing Paddy",
    description: "Đỉnh Nóc - Kịch Trần - Bay Phấp Phới, cơ hội sở hữu Iphone 16 mới nhất...",
    image: n4,
    id: 4
  },
  {
    title: "Chiến Dịch “Cất Cánh” Cùng Bé Cưng",
    date: "Oct 07, 2024",
    category: "Marketing Paddy",
    description: "Với thông điệp “Embrace pethood happiness – Cho bé cưng hạnh phúc suốt tuổi thơ dài”...",
    image: n5,
    id: 5
  },
  {
    title: "KHAI TRƯƠNG CHI NHÁNH 3",
    date: "Aug 10, 2024",
    category: "Marketing Paddy",
    description: "Tưng bừng Khai trương chi nhánh thứ 3 của Paddy...",
    image: n6,
    id: 6
  },
  {
    title: "Ngày Hội Chăm Sóc Thú Cưng Paddy",
    date: "Jul 08, 2024",
    category: "Marketing Paddy",
    description: "Chương trình Ngày Hội Chăm Sóc Thú Cưng Paddy 20/7/2024 do ADM phối...",
    image: n7,
    id: 7
  },
  {
    title: "Bật Nắp Pate - Trúng Quà Thích Mê",
    date: "Oct 23, 2024",
    category: "Marketing Paddy",
    description: "Đỉnh Nóc - Kịch Trần - Bay Phấp Phới, cơ hội sở hữu Iphone 16 mới nhất. Chưa bao giờ Iphone 16, 10 chỉ vàng và hàng...",
    image: n8,
    id: 8
  }
];

const itemsPerPage = 4;

export default function EventList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const currentEvents = events.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <h1 className="event-header">SỰ KIỆN MỚI NHẤT TẠI PADDY SHOP !!!!</h1>
      <div className="event-container">
        {currentEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
            <div className="event-content">
              <div>
                <h2 className="event-title">{event.title}</h2>
                <p className="event-meta">{event.date} • {event.category}</p>
                <p className="event-description">{event.description}</p>
              </div>
              <Link to={`/news-event/${event.id}`} className="event-button">Đọc Thêm</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          className={`page-button ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Trước
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`page-button ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau →
        </button>
      </div>
    </>
  );
}
