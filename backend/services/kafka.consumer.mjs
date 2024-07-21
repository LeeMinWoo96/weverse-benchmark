import { consumer } from '../config/kafka_config.mjs';
import { processNotification } from './notification.service.mjs';

const runConsumer = async () => {
    const topics = ['notification-events-message', 'notification-events-friend-request'];
    // const topics = ['notification-events-message'];

    for (const topic of topics) {
        await consumer.subscribe({ topic, fromBeginning: true });
    }

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const event = JSON.parse(message.value.toString());
            console.log("Received Kafka consumer message : ", event);
            await processNotification(event);
        },
    });
};

export default runConsumer;
