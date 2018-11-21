const gameManager = require('./GameManager.js');

class CommunicationManager {
    constructor() {}

    handleMsg(msg, ws) {
        gameManager.handleMsg(msg, ws);
    }

    sendToAll(players, type, data) {
        players
            .map(({ ws }) => ws)
            .filter(ws => ws.readyState == ws.OPEN)
            .forEach(ws => ws.send(JSON.stringify({ type, data })));
    }

    sendToClient(ws, type, data) {
        ws.send(JSON.stringify({ type, data }));
    }
}

module.exports = new CommunicationManager();
