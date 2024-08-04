import { consumer } from '../config/kafka_config.mjs';
import { processNotification } from './notification.service.mjs';

const runConsumer = async () => {
    const topics = ['notification-events-message', 'notification-events-friend-request'];
    // const topics = ['notification-events-message'];

    for (const topic of topics) {
        await consumer.subscribe({ topic, fromBeginning: true });
    }

    /*
    수신 시 바로 알람 발송 코드로 넘어가지 말고 DB 저장하는 코드 추가하기
     */
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const event = JSON.parse(message.value.toString());
            console.log("Received Kafka consumer message : ", event);
            await processNotification(event);
        },
    });
};

export default runConsumer;
