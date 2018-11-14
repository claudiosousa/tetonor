const communicationManager = require('./CommunicationManager.js'),
    Game = require('./Game.js');

class GameManager {
    constructor() {
        this.gamesById = new WeakMap();
    }

    getGame(gameId) {
        if (!this.gamesById[gameId]) this.gamesById[gameId] = new Game();
        return this.gamesById[gameId];
    }

    handleMsg(msg, ws) {
        switch (msg.type) {
            case 'join':
                const game = this.getGame(msg.data);
                game.addPlayer(ws);
        }
    }
}

module.exports = new GameManager();
