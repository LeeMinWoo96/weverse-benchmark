import { Router } from "express";
import {addClient, removeClient} from "../config/sse_config.mjs";

const notificationRouter = Router();


//Server sent event
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

const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
};

let counter = 0;

notificationRouter.get("/subscribe", (req, res) => {
    console.log("request received");
    res.writeHead(200, headers);
    setInterval(async () => {
        res.write("event: notification\n");
        res.write(
            `data: ${JSON.stringify({
                text: counter,
                date: new Date().toDateString(),
            })}`
        );
        res.write("\n\n");
        counter++;
    }, 2000);
});

export default notificationRouter;