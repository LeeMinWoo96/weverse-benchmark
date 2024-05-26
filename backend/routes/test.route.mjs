// Test Router , 서비스 없이 바로 응답
// send 공통 모듈을 만든거니까, 음,,,,,, 알람이 발송되어야 하는 controller 쪽에서 send 를 호출하던지
// SEND 자체를 서비스로 뺴서 거기거 send를 하도록 하자

// 수신부는 음 ...

import { Router } from "express";
import {producer} from "../config/kafka_confg.mjs";

const testRouter = Router();

testRouter.post('/events/:event', async (req, res) => {
    // console.log("test")
    await producer.send({
        // topic: req.params.event,
        topic: "notification-events",
        messages: [
            { value: req.params.event },
        ],
    })
    res.send('successfully stored event : '+ req.params.event + '\n')
})

export default testRouter