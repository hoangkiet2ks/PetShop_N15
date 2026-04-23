import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventData from "./EventData";

import "../../css/news/NewsEvent1.css";
import "../../css/news/NewsEvent2.css";
import "../../css/news/NewsEvent3.css";
import "../../css/news/NewsEvent6.css";

const NewsEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const data = EventData[eventId];
  const id = parseInt(eventId);

  useEffect(() => {
    if (eventId === "6" || eventId === "8") {
      // Hiệu ứng bóng bay
      const createBalloons = () => {
        const container = document.querySelector(".balloon-container");
        if (!container) return;

        for (let i = 0; i < 10; i++) {
          const balloon = document.createElement("div");
          balloon.className = "balloon";
          balloon.style.left = `${Math.random() * 100}%`;
          balloon.style.animationDuration = `${4 + Math.random() * 4}s`;
          container.appendChild(balloon);
          setTimeout(() => {
            balloon.remove();
          }, 8000);
        }
      };

      const interval = setInterval(createBalloons, 1500);
      return () => clearInterval(interval);
    }

    if (eventId === "2") {
      // Hiệu ứng tuyết rơi
      const createSnowflakes = () => {
        const container = document.querySelector(".snowflake-container");
        if (!container) return;

        for (let i = 0; i < 20; i++) {
          const snowflake = document.createElement("div");
          snowflake.className = "snowflake";
          snowflake.style.left = `${Math.random() * 100}%`;
          snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
          snowflake.style.animationDelay = `${Math.random() * 5}s`; // delay for staggered effect
          container.appendChild(snowflake);
          setTimeout(() => {
            snowflake.remove();
          }, 10000); // snowflakes disappear after 10 seconds
        }
      };

      const snowInterval = setInterval(createSnowflakes, 1000);
      return () => clearInterval(snowInterval);
    }
  }, [eventId]);

  if (!data) return <div className="text-center p-4 text-lg text-red-500">❌ Sự kiện không tồn tại</div>;

  return (
    <div className={`background-container ${data.cssClass}`}>
      {/* Container tuyết rơi ở đầu tiêu đề sự kiện */}
      {eventId === "2" && <div className="snowflake-container"></div>}
      
      {/* Nội dung sự kiện */}
      <div className="event-content">
        {data.content}
      </div>

      {/* Nút điều hướng sự kiện */}
      <div className="text-center mt-5 d-flex justify-content-center gap-3 flex-wrap">
        <button
          onClick={() => navigate(`/news-event/${id - 1}`)}
          disabled={id <= 1}
          className="btn btn-warning"
          style={{ width: "300px", height:50 }}
        >
          ⬅ Sự kiện trước
        </button>
        <button
          onClick={() => navigate(`/news-event/${id + 1}`)}
          disabled={id >= 8}
          className="btn btn-success"
          style={{ width: "300px",  height:50, marginBottom:20 }}
        >
          Sự kiện tiếp theo ➡
        </button>
      </div>
    </div>
  );
};

export default NewsEvent;
