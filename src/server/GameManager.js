const Game = require('./Game.js');

class GameManager {
    constructor() {
        this.gamesById = new WeakMap();
    }

    getGame(gameId) {
        if (!this.gamesById.has(gameId)) this.gamesById[gameId] = new Game();
        return this.gamesById[gameId];
    }
}

module.exports = GameManager;
