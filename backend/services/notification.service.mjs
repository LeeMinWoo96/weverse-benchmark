import {sendNotification} from "../config/sse_config.mjs";
import sql from "../config/sql.mjs"; // This utility sends notifications to the client using WebSocket

/*
    그 자체를 보내는게 아니라 DB에 저장되어 있는 값을 가져와서 전체를 보내기 (일정기간, 만약 클라이언트에서 지우기 누르면 지우기 할 순 있어도 일단 고려
 */
export const processNotification = async (event) => {
    const { userId, senderId, type, title, message, timestamp } = event;



    // Store notification in Redis
    // const notificationKey = `user:${userId}:notifications`;
    // const notification = {
    //     senderId,
    //     type,
    //     title,
    //     message,
    //     timestamp,
    //     read: false,
    // };

    // await redisClient.lpush(notificationKey, JSON.stringify(notification));
    // await redisClient.incr(`user:${userId}:unreadCount`);

    // Send notification to the client using WebSocket


    const notifications = await getNotifications(userId);
    // console.log("a",notifications)
    await sendNotification(userId, notifications);
};


// 저장 및 읽음 플래그 업데이트 (DB)
export const createNotificationLog = (notification) => {
    return new Promise((resolve, reject) => {
        const { userId, senderId, type, title, message, read, timestamp } =notification;
        // console.log(notification)
        let query;
        let params;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // 현재 시각을 ISO 형식으로 가져옴


        query = 'INSERT INTO notification_logs (user_id, sender_id, type, title, message, read_yn, reg_dt) VALUES(?, ?, ?, ?,?, ?,?)';


        // const query = `
        //     INSERT INTO notification_logs (userId, senderId, type, title, message, read_yn, reg_dt)
        //     VALUES (?, ?, ?, ?, ?, ?, ?)
        //     ON DUPLICATE KEY UPDATE
        //         senderId = VALUES(senderId),
        //         type = VALUES(type),
        //         title = VALUES(title),
        //         message = VALUES(message),
        //         read_yn = VALUES(read_yn),
        //         reg_dt = VALUES(reg_dt);
        //
        //     -- 다른 쿼리를 추가할 수 있습니다
        //     UPDATE another_table SET column = value WHERE condition;
        // `;


        params = [userId, senderId, type, title, message, read, currentDate];
        console.log(params)
        sql.execute(query, [...params])
            .then((result) => resolve(result))
        // .catch((err) => reject(err))
    })
}

export const getNotifications = (userId, pageSize='10') => {
    return new Promise((resolve, reject) => {
        let query;
        let params;

        query = 'SELECT * FROM notification_logs  WHERE user_id = ? LIMIT ?';
        params = [userId, pageSize];

        // console.log(params)


        sql.execute(query, params)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => reject(err));
    });
};