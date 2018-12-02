const communicationManager = require('./CommunicationManager.js'),
    { GAME_STATUS, Game } = require('./Game.js'),
    _ = require('lodash');

class GameManager {
    constructor() {
        this.gamesById = {};
    }

    getGame(gameId) {
        return this.gamesById[gameId];
    }

    sendGameList(ws = null) {
        const sendMethod = ws
            ? _.partial(communicationManager.sendToClient, ws)
            : communicationManager.sendToEveryone;

        sendMethod.call(
            communicationManager,
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
        if (msg.type == 'list') {
            this.sendGameList(ws);
            return;
        }
        if (!msg.data.gameId) {
            communicationManager.sendError(ws, 'Game name cannot be empty');
            return;
        }
        let game = this.getGame(msg.data.gameId);

        if (
            msg.type != 'create' &&
            (!game || game.status === GAME_STATUS.OVER)
        ) {
            communicationManager.sendError(ws, 'Game not found');
            return;
        }

        switch (msg.type) {
            case 'list':
                this.sendGameList(ws);
                break;
            case 'create':
                if (game && game.status != GAME_STATUS.OVER) {
                    communicationManager.sendError(ws, 'Game already exists');
                    return;
                }
                this.gamesById[msg.data.gameId] = new Game(msg.data.players);
                this.sendGameList();
                communicationManager.sendToClient(
                    ws,
                    'gameCreated',
                    msg.data.gameId
                );
                break;
            case 'join':
                game.addPlayer(ws, msg.data.user);
                this.sendGameList();
                break;
            case 'solution':
                game.updateSolution(ws, msg.data);
                this.sendGameList();
                break;
        }
    }
}

module.exports = new GameManager();
