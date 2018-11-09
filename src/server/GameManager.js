const Game = require('./Game.js');

class GameManager {
    constructor() {
        this.gamesById = new WeakMap();
    }

    getGame(gameId) {
        if (!this.gamesById.has(gameId)) this.gamesById[gameId] = new Game();
        return this.gamesById[gameId];
    }

    handleMsg(msg, ws) {
        const game = this.getGame('exampleGame');

        switch (msg) {
            case 'getstatus':
                break;
            case 'join':
                return game.addPlayer(ws);
        }

        let type = 'status';
        let data = game.getStatus(ws);
        this.sendMessage(ws, type, data);
    }

    sendMessage(ws, type, data) {
        ws.send(JSON.stringify({ type, data }));
    }
}

module.exports = GameManager;
