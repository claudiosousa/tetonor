const GameBoard = require('./GameBoard.js');

const GAME_STATUS = {
    TO_JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1,
    ZOMBIE: 9
};
class Game {
    constructor() {
        this.status = GAME_STATUS.WAITING_PEER;
        this.players = [];
        this.board = new GameBoard();
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.players.length == 2) {
            this.status = GAME_STATUS.PLAYING;
        }
        this.sendStatusToAll();
    }

    sendStatusToAll() {
        if (!this.communicationManager)
            this.communicationManager = require('./CommunicationManager.js');
        this.communicationManager.sendToAll(
            this.players,
            'status',
            this.getStatus()
        );
    }

    deletePlayer(player) {
        this.players = this.players.filter(p => p != player);
        if (this.players.length == 0) {
            this.status = GAME_STATUS.WAITING_PEER;
        }
    }

    getStatus() {
        return {
            status: this.status,
            players: this.players.length,
            ...this.board
        };
    }
}

module.exports = Game;
