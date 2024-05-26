const clients = new Map();

export const addClient = (userId, res) => {
    clients.set(userId, res);
};

export const removeClient = (userId) => {
    clients.delete(userId);
};

export const sendNotification = (userId, notification) => {
    const client = clients.get(userId);
    if (client) {
        client.write(`data: ${JSON.stringify(notification)}\n\n`);
    }
};

export const sendUnreadCount = (userId, count) => {
    const client = clients.get(userId);
    if (client) {
        client.write(`data: ${JSON.stringify({ unreadCount: count })}\n\n`);
    }
};
