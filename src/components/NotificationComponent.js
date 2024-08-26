import React, { useEffect, useState } from 'react';

const NotificationComponent = ({ userId }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    // 초기 로딩 시 API 호출
    useEffect(() => {
        const fetchInitialNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:3005/notifications/${userId}/initial`);
                const initialData = await response.json();
                const dataArray = initialData.data; // dataArray는 배열로 가정

                dataArray.forEach((data) => {
                    if (data.read_yn !== undefined && data.read_yn === 0) {
                        setUnreadCount(prevCount => prevCount + 1);
                    } else {
                        setNotifications((prev) => [...prev, data]);
                    }
                });
            } catch (error) {
                console.error('Error fetching initial notifications:', error);
            }
        };

        fetchInitialNotifications();
    }, [userId]);

    // SSE 연결 설정
    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:3005/notifications/${userId}/sse`);
        console.log(userId);

        eventSource.onmessage = (event) => {
            const dataArray = JSON.parse(event.data); // dataArray는 배열로 가정
            console.log("메시지 왔다!!", dataArray);

            dataArray.forEach((data) => {
                if (data.read_yn !== undefined && data.read_yn === 0) {
                    setUnreadCount(prevCount => prevCount + 1);
                } else {
                    setNotifications((prev) => [...prev, data]);
                }
            });
        };

        return () => {
            eventSource.close();
        };
    }, [userId, unreadCount]);

    return (
        <div className="txt-white">
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
