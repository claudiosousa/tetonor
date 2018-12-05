 import { gameManager } from './game-manager.js';

/**
 * Service handling the communication
 * @class CommunicationService
 */
class CommunicationService {
    constructor() {
        // establishment of the socket to the server
        this.ws = new WebSocket(`ws://${location.host}/ws`);

        this.ws.onmessage = evt => this.onMessage(evt);
        this.ws.onclose = () => this.onClose();
        this.connected = new Promise(resolve => (this.ws.onopen = resolve));
    }


    /**
     * Asynchronously sends a message to the server
     *
     * @param {*} type Message type
     * @param {*} data Message data
     * @memberof CommunicationService
     */
    async send(type, data) {
        await this.connected;
        this.ws.send(JSON.stringify({ type, data }));
    }

    /**
     * Register the main view
     * @param {*} app Vue.js app
     * @memberof CommunicationService
     */
    registerApp(app) {
        this.app = app;
    }

    /**
     * Handles newly received messages
     *
     * @param {*} evt the socket event
     * @memberof CommunicationService
     */
    onMessage(evt) {
        const msg = JSON.parse(evt.data);
        switch (msg.type) {
            case 'ERROR':
                this.app.showError(msg.data);
                break;
            case 'gameCreated':
                gameManager.chooseGame(msg.data);
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

    /**
     * Handles the socket diconnection
     *
     * @memberof CommunicationService
     */
    onClose() {
        gameManager.disconnected();
    }
}

const communicationService = new CommunicationService();
export { communicationService };
