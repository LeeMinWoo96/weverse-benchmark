import EventSource from 'eventsource';

const userId = 'test';
const url = `http://localhost:3005/notifications/${userId}/sse`;
const eventSource = new EventSource(url);

eventSource.onopen = () => {
    console.log(`Connected to ${url}`);
};

eventSource.onmessage = (event) => {
    console.log('New event:', event.data);
};

eventSource.onerror = (event) => {
    if (event.readyState === EventSource.CLOSED) {
        console.error('Connection was closed by the server.');
    } else {
        console.error('An error occurred:', event);
    }
};
