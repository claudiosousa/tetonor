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
        const game = this.getGame(msg.gameId);
        switch (msg.type) {
            case 'join':
                game.addPlayer(ws);
            case 'solution':
                game.updateSolution(ws, msg.data);
        }
    }
}

module.exports = new GameManager();
