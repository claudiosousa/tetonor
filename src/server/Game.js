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

    addPlayer(ws, user) {
        let existingPlayer = this.players.find(p => p.user == user);
        if (existingPlayer)
            if (ws.readyState == ws.OPEN) {
                this.communicator.sendToClient(
                    ws,
                    'error',
                    'User already connected'
                );
                return false;
            } else existingPlayer.ws = ws;
        else this.players.push({ ws, score: 0, user });

        if (this.players.length >= 1) {
            this.status = GAME_STATUS.PLAYING;
            this.communicator.sendToClient(ws, 'board', this.board);
        }
        this.sendToAll('status', this.getStatus());
        return true;
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
            players: this.players.map(p => ({
                connected: p.ws.readyState == p.ws.OPEN,
                score: p.score,
                user: p.user
            }))
        };
    }
}

module.exports = Game;
