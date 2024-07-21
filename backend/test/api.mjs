import axios from 'axios';

const apiUrl = 'http://localhost:3005/notifications/events/message';

const notificationData = {
    userId: 'test',
    senderId: 'senderUserId',
    title: 'New Message',
    message: 'You have received a new message.'
};

axios.post(apiUrl, notificationData)
    .then(response => {
        console.log('API response data:', response.data);
    })
    .catch(error => {
        console.error('Error occurred during API call:', error);
    });
