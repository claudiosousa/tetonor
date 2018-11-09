class CommunicationService {
    constructor() {
        this.ws = new WebSocket(`ws://${location.host}/ws`);
        this.ws.onopen = () => this.onopen();
        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onclose();
    }

    onopen() {
        this.ws.send('getstatus');
    }

    onMessage(evt) {
        const msg = evt.data;

        alert('Message is received...' + msg);
    }

    onclose() {}
}

export default new CommunicationService();
