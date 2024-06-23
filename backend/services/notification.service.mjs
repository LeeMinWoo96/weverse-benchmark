// import redisClient from './redis_config.mjs';

import {sendNotification} from "../config/sse_config.mjs";

const NOTIFICATION_PREFIX = 'notification:';
const USER_UNREAD_COUNT_PREFIX = 'unread_count:';

export const processNotification = async (event) => {
    const { userId, message } = event;
    const notificationId = Date.now().toString(); // 고유한 알림 ID 생성
    const notification = {
        id: notificationId,
        userId,
        message,
        readStatus: false,
        createdAt: new Date().toISOString(),
    };

    // 알림 저장
    // await redisClient.hSet(`${NOTIFICATION_PREFIX}${userId}`, notificationId, JSON.stringify(notification));

    // 읽지 않은 알림 카운트 증가
    // await redisClient.hIncrBy(`${USER_UNREAD_COUNT_PREFIX}${userId}`, 'count', 1);

    // SSE 클라이언트로 알림 전송
    sendNotification(userId, notification);
};
//
// export const getUnreadNotificationCount = async (userId) => {
//     const unreadCount = await redisClient.hGet(`${USER_UNREAD_COUNT_PREFIX}${userId}`, 'count');
//     return parseInt(unreadCount, 10) || 0;
// };
//
// // SSE 클라이언트 목록
// const clients = new Map();
//
// export const addClient = (userId, res) => {
//     clients.set(userId, res);
// };
//
// export const removeClient = (userId) => {
//     clients.delete(userId);
// };
//
// const sendSseNotification = (userId, notification) => {
//     const client = clients.get(userId);
//     if (client) {
//         client.write(`data: ${JSON.stringify(notification)}\n\n`);
//     }
// };
