/**
 * Provides communication methods and dipatching
 */
class CommunicationManager {
    constructor() {}

    /**
     * Lazy retrival of GameManager dependency
     * @readonly
     * @memberof CommunicationManager
     */
    get gameManager() {
        if (!this._gameManager) this._gameManager = require('./GameManager.js');
        return this._gameManager;
    }

    /**
     * Dispatches the message to the correct handler
     * @param {*} msg Message sent from the client
     * @param {*} ws Client Websocket
     * @memberof CommunicationManager
     */
    handleMsg(msg, ws) {
        this.gameManager.handleMsg(msg, ws);
    }

    /**
     * Sends an error to the client
     * @param {*} ws Client Websocket
     * @param {*} error Error to send to client
     * @memberof CommunicationManager
     */
    sendError(ws, error) {
        this.sendToClient(ws, 'ERROR', error);
    }

    /**
     * Register the WebSocket server
     * @param {*} wssRoot WebSocket server
     * @memberof CommunicationManager
     */
    setWssRoot(wssRoot) {
        this.wssRoot = wssRoot;
    }

    /**
     * Sends a message to all connected clients
     * @param {*} type Message type
     * @param {*} data Message data
     * @memberof CommunicationManager
     */
    sendToEveryone(type, data) {
        this.wssRoot.clients.forEach(ws =>
            ws.send(JSON.stringify({ type, data }))
        );
    }

    /**
     * Sends a message to the specifies lost of players
     * @param {*} players Player liste
     * @param {*} type Message type
     * @param {*} data Message data
     * @memberof CommunicationManager
     */
    sendToAll(players, type, data) {
        players
            .map(({ ws }) => ws)
            .forEach(ws => ws.send(JSON.stringify({ type, data })));
    }

    /**
     * Sends message to a client
     * @param {*} ws Client websocket
     * @param {*} type Message type
     * @param {*} data Messag data
     * @memberof CommunicationManager
     */
    sendToClient(ws, type, data) {
        ws.send(JSON.stringify({ type, data }));
    }
}

module.exports = new CommunicationManager();
