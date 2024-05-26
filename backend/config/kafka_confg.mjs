import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER], // 카프카 브로커의 호스트 및 포트
});

console.log("kafka broker url : " + [process.env.KAFKA_BROKER])

// 카프카 프로듀서 생성
const producer = kafka.producer();
// 카프카 컨슈머 생성
const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });

// 카프카 클라이언트 연결
export const connectKafka = async () => {
    try {
        await producer.connect();
        console.log('Connected to Kafka, producer');
        await consumer.connect();
        console.log('Connected to Kafka, consumer');
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
    }
}

// 카프카 클라이언트 연결 해제
export const disconnectKafka = async () => {
    try {
        await producer.disconnect();
        await consumer.disconnect();
        console.log('Disconnected from Kafka');
    } catch (error) {
        console.error('Error disconnecting from Kafka:', error);
    }
}

export { producer, consumer };
