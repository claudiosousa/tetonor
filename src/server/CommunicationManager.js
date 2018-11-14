const gameManager = require('./GameManager.js');

class CommunicationManager {
    constructor() {}

    handleMsg(msg, ws) {
        gameManager.handleMsg(msg, ws);
    }

    sendToAll(wsLst, type, data) {
        wsLst.forEach(ws => ws.send(JSON.stringify({ type, data })));
    }

    sendToClient(ws, type, data) {
        ws.send(JSON.stringify({ type, data }));
    }
}

module.exports = new CommunicationManager();
