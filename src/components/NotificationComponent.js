import React, { useEffect, useState } from 'react';

const NotificationComponent = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3005/notifications/${userId}/sse`);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.unreadCount !== undefined) {
                setUnreadCount(data.unreadCount);
            } else {
                setNotifications((prev) => [...prev, data]);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [userId]);

    return (
        <div className ="txt-white">
            <h2>Unread Notifications: {unreadCount}</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li key={index}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationComponent;
