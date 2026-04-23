import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventData from './EventData';

const EventPage = () => {
    const { eventId } = useParams();        
    const navigate = useNavigate();
    const id = parseInt(eventId);

    const event = EventData[eventId];

    if (!event) {
        return <div>Không tìm thấy sự kiện</div>;
    }

    return (
        <div className={event.cssClass}>
            {event.content}
            {/* Nút điều hướng */}
            <div className="text-center mt-4">
                <button
                    className="button mr-2"
                    onClick={() => navigate(`/news/event${id - 1}`)}
                    disabled={id <= 1}
                >
                    ⬅ Sự kiện trước
                </button>
                <button
                    className="button ml-2"
                    onClick={() => navigate(`/news/event${id + 1}`)}
                    disabled={id >= 8}
                >
                    Sự kiện tiếp theo ➡
                </button>
            </div>
        </div>
    );
};

export default EventPage;
