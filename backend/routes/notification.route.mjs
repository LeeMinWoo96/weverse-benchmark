import { Router } from "express";
import {addClient, removeClient} from "../config/sse_config.mjs";
import {producer} from "../config/kafka_config.mjs";
import {getNotifications} from "../services/notification.service.mjs";
import {getInitNotifications} from "../controllers/notification.controller.mjs";


const notificationRouter = Router();

// 이벤트 발생 api, 이벤트 발생 시 카프카 producer push 하는 부분
notificationRouter.post('/events/:type', async (req, res) => {
    const { userId, senderId, title, message } = req.body;
    const timestamp = new Date().toISOString();
    const read = false;

    try {
        await producer.send({
            topic: `notification-events-${req.params.type}`,
            messages: [
                {
                    value: JSON.stringify({
                        userId,
                        senderId,
                        type: req.params.type,
                        title,
                        message,
                        timestamp,
                        read
                    })
                },
            ],
        });
        res.status(200).send('Successfully stored event of type: ' + req.params.type + '\n');
    } catch (error) {
        res.status(500).send('Error storing event: ' + error.message);
    }
});

//Server sent event 연결 부분
// 데이터 전송은 카프카 consumer 에서 수행함
notificationRouter.get('/:userId/sse', (req, res) => {
    const { userId } = req.params;
    console.log("request received");
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    addClient(userId, res);

    req.on('close', () => {
        removeClient(userId);
    });
});

notificationRouter.get('/:userId/initial', getInitNotifications);

export default notificationRouter;