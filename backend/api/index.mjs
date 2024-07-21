import express, { json } from 'express';
import cors from 'cors'; // Import the cors middleware
import sql from '../config/sql.mjs';
import { producer, consumer, connectKafka, disconnectKafka } from "../config/kafka_config.mjs";
import runConsumer from "../services/kafka.consumer.mjs"
import indexRouter from '../routes/index.route.mjs';
import {addClient, removeClient} from "../config/sse_config.mjs";

const app = express();
const port = 3005; // Choose a port for your server
app.use(cors());
app.use(json());

//routes
app.use("/", indexRouter)
app.use(("*"), (req, res) => {
    res.send("404 - Not Found!")
})


// 카프카 연결
connectKafka().then(() => {
    console.log('Connected to Kafka');
}).catch((err) => {
    console.error('Error connecting to Kafka:', err);
    process.exit(1); // 카프카 연결에 실패하면 프로세스 종료
});


runConsumer().then(() => {}).catch((err) => {});

sql.connect().then(() => {
    console.log('connected to database');
}).catch((err) => console.log(err.message))

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

// 프로세스가 종료될 때 카프카 연결도 종료되도록 설정
process.on('exit', async () => {
    await disconnectKafka();
});

// Ctrl+C로 프로세스를 종료할 때 카프카 연결도 종료되도록 설정
process.on('SIGINT', async () => {
    await disconnectKafka();
    process.exit();
});
