import { gameManager } from './game-manager.js';

class CommunicationService {
    constructor() {
        this.ws = new WebSocket(`ws://${location.host}/ws`);
        this.ws.onopen = () => this.onOpen();
        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onClose();
    }

    onOpen() {
        // NOOP
    }

    send(type, gameId, data) {
        this.ws.send(JSON.stringify({ type, gameId, data }));
    }

    onMessage(evt) {
        const msg = JSON.parse(evt.data);
        switch (msg.type) {
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

export default new CommunicationService();