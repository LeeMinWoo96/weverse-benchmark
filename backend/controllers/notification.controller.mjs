import {getNotifications} from "../services/notification.service.mjs";

export const getInitNotifications = async (req, res) => {
    try {
        const { userId } = req.params;

        const notifications = await getNotifications(userId);

        res.status(200).json({
            message: "Get Notifications",
            data: notifications[0],
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Internal Server Error");
    }
};
