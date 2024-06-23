import { consumer, connectKafka } from '../config/kafka_confg.mjs';
import {json} from "express";
import {processNotification} from "./notification.service.mjs";
// import { processNotification } from './notification.service.mjs';

const runConsumer = async () => {

    await consumer.subscribe({ topic: 'notification-events', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("receive")
            console.log(message.toString())
            console.log(JSON.stringify(message))
            const event = JSON.parse(JSON.stringify(message));
            console.log("receive2")
            await processNotification(event);
        },
    });
};

export default runConsumer;

