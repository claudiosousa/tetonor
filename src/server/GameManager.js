const communicationManager = require('./CommunicationManager.js'),
    Game = require('./Game.js'),
    _ = require('lodash');

class GameManager {
    constructor() {
        this.gamesById = {};
        this.gamesByWs = {};
    }

    getGame(gameId) {
        return this.gamesById[gameId];
    }

    sendGameList(ws) {
        communicationManager.sendToClient(
            ws,
            'games',
            _.map(this.gamesById, (game, id) => ({
                id,
                status: game.status,
                players: game.players.length,
                minPlayerCount: game.minPlayerCount
            }))
        );
    }

    handleMsg(msg, ws) {
        let game;
        switch (msg.type) {
            case 'list':
                this.sendGameList(ws);
                break;
            case 'create':
                if (!msg.data.gameName) return;
                game = this.getGame(msg.data.gameName);
                if (game) return;
                this.gamesById[msg.data.gameName] = new Game(msg.data.players);
                this.sendGameList(ws);
                break;
            case 'join':
                game = this.getGame(msg.data.game);
                if (!game) return;
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
