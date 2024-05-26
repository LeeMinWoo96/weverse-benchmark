import axios from 'axios';

// API 엔드포인트 URL
const apiUrl = 'http://localhost:3005/test/events/';

// 이벤트 이름
const eventName = 'myEvent';

// POST 요청 보내기
axios.post(apiUrl + eventName)
    .then(response => {
        // 응답 데이터 출력
        console.log('API 응답 데이터:', response.data);
    })
    .catch(error => {
        // 오류 처리
        console.error('API 호출 중 오류 발생:', error);
    });
