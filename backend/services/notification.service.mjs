import {sendNotification} from "../config/sse_config.mjs"; // This utility sends notifications to the client using WebSocket

export const processNotification = async (event) => {
    const { userId, senderId, type, title, message, timestamp } = event;

    // Store notification in Redis
    // const notificationKey = `user:${userId}:notifications`;
    const notification = {
        senderId,
        type,
        title,
        message,
        timestamp,
        read: false,
    };

    // await redisClient.lpush(notificationKey, JSON.stringify(notification));
    // await redisClient.incr(`user:${userId}:unreadCount`);

    // Send notification to the client using WebSocket
    await sendNotification(userId, notification);
};
