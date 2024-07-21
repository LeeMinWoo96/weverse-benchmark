import React, { useEffect, useState } from 'react';

const NotificationComponent = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3005/notifications/${userId}/sse`);
        console.log(userId)
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("메시지 왔다!!",data)
            if (data.read !== undefined && data.read === false) {
                setUnreadCount(unreadCount +1);
            } else {
                setNotifications((prev) => [...prev, data]);
            }
        };

        return () => {
            eventSource.close();
        };
    }, [userId,unreadCount]);

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
