class CommunicationManager {
    constructor() {}

    get gameManager() {
        if (!this._gameManager) this._gameManager = require('./GameManager.js');
        return this._gameManager;
    }

    handleMsg(msg, ws) {
        this.gameManager.handleMsg(msg, ws);
    }

    sendError(ws, error) {
        this.sendToClient(ws, 'ERROR', error);
    }

    setWssRoot(wssRoot) {
        this.wssRoot = wssRoot;
    }

    sendToEveryone(type, data) {
        this.wssRoot.clients.forEach(ws =>
            ws.send(JSON.stringify({ type, data }))
        );
    }

    sendToAll(players, type, data) {
        players
            .map(({ ws }) => ws)
            .forEach(ws => ws.send(JSON.stringify({ type, data })));
    }

    sendToClient(ws, type, data) {
        ws.send(JSON.stringify({ type, data }));
    }
}

module.exports = new CommunicationManager();
