import { gameManager } from './game-manager.js';

class CommunicationService {
    constructor() {
        this.ws = new WebSocket(`ws://${location.host}/ws`);

        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onClose();
        this.connected = new Promise(resolve => (this.ws.onopen = resolve));
    }

    async send(type, data) {
        await this.connected;
        this.ws.send(JSON.stringify({ type, data }));
    }

    onMessage(evt) {
        const msg = JSON.parse(evt.data);
        switch (msg.type) {
            case 'error':
                alert(msg.data);
                break;
            case 'games':
                gameManager.gamesList(msg.data);
                break;
            case 'status':
                gameManager.updateState(msg.data);
                break;
            case 'board':
                gameManager.updateBoard(msg.data);
                break;
        }
    }

    onClose() {}
}

const communicationService = new CommunicationService();
export { communicationService };
