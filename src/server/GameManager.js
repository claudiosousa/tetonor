const communicationManager = require('./CommunicationManager.js'),
    { GAME_STATUS, Game } = require('./Game.js'),
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
                if (!msg.data.gameName) {
                    communicationManager.sendError(
                        ws,
                        'Game name cannot be empty'
                    );
                    return;
                }
                game = this.getGame(msg.data.gameName);
                if (game && game.status != GAME_STATUS.OVER) {
                    communicationManager.sendError(ws, 'Game already exists');
                    return;
                }
                this.gamesById[msg.data.gameName] = new Game(msg.data.players);
                this.sendGameList(ws);
                break;
            case 'join':
                game = this.getGame(msg.data.game);
                if (!game) {
                    communicationManager.sendError(ws, 'Game not found');
                    return;
                }
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
