const clients = new Map();

export const addClient = (userId, res) => {
    console.log("addClient",userId)
    clients.set(userId, res);
};

export const removeClient = (userId) => {
    clients.delete(userId);
};

export const sendNotification = (userId, notification) => {
    console.log("sendNotification (sse_config.mjs)")
    console.log(userId, notification[0])
    const client = clients.get(userId);
    // console.log(client)
    if (client) {
        client.write(`data: ${JSON.stringify(notification[0])}\n\n`);
    }
};

export const sendUnreadCount = (userId, count) => {
    const client = clients.get(userId);
    if (client) {
        client.write(`data: ${JSON.stringify({ unreadCount: count })}\n\n`);
    }
};
