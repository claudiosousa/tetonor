const GameBoard = require('./GameBoard.js');

const GAME_STATUS = {
    WAITING_PEER: 0,
    PLAYING: 1,
    OVER: 9
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

    constructor(minPlayerCount) {
        this.minPlayerCount = minPlayerCount;
        this.status = GAME_STATUS.WAITING_PEER;
        this.players = [];
        this.board = new GameBoard();
    }

    addPlayer(ws, user) {
        if (this.status == GAME_STATUS.OVER) return;

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

        if (this.players.length >= this.minPlayerCount) {
            this.status = GAME_STATUS.PLAYING;
            this.communicator.sendToClient(ws, 'board', this.board);
        }
        this.sendStatusToAll();
        return true;
    }

    sendStatusToAll() {
        this.connectedPlayers.forEach(player =>
            this.communicator.sendToClient(
                player.ws,
                'status',
                this.getStatus(player)
            )
        );
    }

    deletePlayer(ws) {
        this.players = this.players.filter(p => p.ws != ws);
        if (this.players.length == 0) {
            this.status = GAME_STATUS.WAITING_PEER;
        }
    }

    updateSolution(ws, solution) {
        if (this.status == GAME_STATUS.OVER) return;

        const player = this.players.find(p => p.ws == ws);
        player.score = this.board.calculateScore(solution);
        if (player.score == 100) {
            this.status = GAME_STATUS.OVER;
            this.winner = ws;
        }
        this.sendStatusToAll();
    }

    getStatus(player) {
        return {
            status: this.status,
            winner: this.winner == player.ws,
            players: this.players.map(p => ({
                connected: p.ws.readyState == p.ws.OPEN,
                score: p.score,
                user: p.user
            }))
        };
    }
}

module.exports = Game;
