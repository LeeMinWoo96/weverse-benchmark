import axios from 'axios';

const apiUrl = 'http://localhost:3005/notifications/events/message';

const notificationData = {
    userId: '8ab9bd81-fd65-4136-bad2-ada3e32b53b2',
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
