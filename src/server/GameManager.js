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
                return game.getStatus();
            case 'join':
                return game.addPlayer(ws);
        }
    }
}

module.exports = GameManager;
