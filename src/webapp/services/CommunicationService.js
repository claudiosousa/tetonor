class CommunicationService {
    constructor() {
        this.ws = new WebSocket(`ws://${location.host}/ws`);
        this.ws.onopen = () => this.onopen();
        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onclose();
    }

    onopen() {
        this.ws.send('Message to send');
    }

    onopen() {
        this.ws.send('Message to send');
    }

    onMessage(evt) {
        const msg = evt.data;

        alert('Message is received...' + received_msg);
    }

    onclose() {}
}

export default new CommunicationService();
