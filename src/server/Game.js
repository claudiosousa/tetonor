const GameBoard = require('./GameBoard.js');

const GAME_STATUS = {
    TO_JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1,
    ZOMBIE: 9
};
class Game {
    get connectedPlayers() {
        return this.players.filter(({ ws }) => ws.readyState == ws.OPEN);
    }

    get communicator() {
        if (!this._communicationManager)
            this._communicationManager = require('./CommunicationManager.js');
        return this._communicationManager;
    }

    constructor() {
        this.status = GAME_STATUS.WAITING_PEER;
        this.players = [];
        this.board = new GameBoard();
    }

    addPlayer(ws) {
        this.players.push({ ws, score: 0 });
        if (this.players.length >= 1) {
            this.status = GAME_STATUS.PLAYING;
            this.sendToAll('board', this.board);
        }
        this.sendToAll('status', this.getStatus());
    }

    sendToAll(type, data) {
        this.communicator.sendToAll(this.connectedPlayers, type, data);
    }

    deletePlayer(ws) {
        this.players = this.players.filter(p => p.ws != ws);
        if (this.players.length == 0) {
            this.status = GAME_STATUS.WAITING_PEER;
        }
    }

    updateSolution(ws, solution) {
        const player = this.players.find(p => p.ws == ws);
        player.score = this.board.calculateScore(solution);
        this.sendToAll('status', this.getStatus());
    }

    getStatus() {
        return {
            status: this.status,
            players: this.connectedPlayers.map(p => ({
                connected: p.ws.readyState == p.ws.OPEN,
                score: p.score
            }))
        };
    }
}

module.exports = Game;
