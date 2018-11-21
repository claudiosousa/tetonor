const communicationManager = require('./CommunicationManager.js'),
    Game = require('./Game.js');

class GameManager {
    constructor() {
        this.gamesById = new WeakMap();
        this.gamesByWs = new WeakMap();
    }

    getGame(gameId) {
        if (!this.gamesById[gameId]) this.gamesById[gameId] = new Game();
        return this.gamesById[gameId];
    }

    handleMsg(msg, ws) {
        let game;
        switch (msg.type) {
            case 'join':
                game = this.getGame(msg.data.game);
                this.gamesByWs[ws] = game;
                game.addPlayer(ws, msg.data.user);
                break;
            case 'solution':
                game = this.gamesByWs[ws];
                game.updateSolution(ws, msg.data);
                break;
        }
    }
}

module.exports = new GameManager();
