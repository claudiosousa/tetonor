const GameBoard = require('./GameBoard.js');
const communicationManager = require('./CommunicationManager.js');

/** Possible game states */
const GAME_STATUS = {
    WAITING_PEER: 0,
    PLAYING: 1,
    OVER: 9
};

/**
 * Keeps a state of a running game and players
 * @class Game
 */
class Game {
    /**
     * List of connected players
     * @readonly
     * @memberof Game
     */
    get connectedPlayers() {
        return this.players.filter(({ ws }) => ws.readyState == ws.OPEN);
    }

    /**
     *Creates an instance of Game
     * @param {*} minPlayerCount Minimal nmuber of players to start the game
     * @memberof Game
     */
    constructor(minPlayerCount) {
        this.minPlayerCount = minPlayerCount;
        this.status = GAME_STATUS.WAITING_PEER;
        this.players = [];
        this.board = new GameBoard();
    }

    /**
     * Adds a player to the game
     * @param {*} ws The client websocket
     * @param {*} user  User name
     * @returns True if adding succeded, False otherwise
     * @memberof Game
     */
    addPlayer(ws, user) {
        if (this.status == GAME_STATUS.OVER) {
            communicationManager.sendError(ws, 'Cannot join finished game');
            return;
        }

        let existingPlayer = this.players.find(p => p.user == user);
        if (existingPlayer)
            if (ws.readyState == ws.OPEN) {
                communicationManager.sendError(ws, 'User already connected');
                return false;
            } else existingPlayer.ws = ws;
        else this.players.push({ ws, score: 0, user });

        if (this.players.length == this.minPlayerCount) {
            this.status = GAME_STATUS.PLAYING;
            communicationManager.sendToAll(
                this.connectedPlayers,
                'board',
                this.board
            );
        } else if (this.players.length >= this.minPlayerCount)
            communicationManager.sendToClient(ws, 'board', this.board);
        this.sendStatusToAll();
        return true;
    }

    /**
     * Sends the current game status to all game players
     * @memberof Game
     */
    sendStatusToAll() {
        this.connectedPlayers.forEach(player =>
            communicationManager.sendToClient(
                player.ws,
                'status',
                this.getStatus(player)
            )
        );
    }

    /**
     * Registers that a player has left the game
     * @param {*} ws The client websocket
     * @memberof Game
     */
    deletePlayer(ws) {
        this.players = this.players.filter(p => p.ws != ws);
        if (this.players.length == 0) {
            this.status = GAME_STATUS.WAITING_PEER;
        }
    }

    /**
     * Submits a new solution for a player
     * @param {*} ws player websocket
     * @param {*} solution New solution
     * @memberof Game
     */
    updateSolution(ws, solution) {
        if (this.status == GAME_STATUS.OVER) {
            communicationManager.sendError(ws, 'Game is over!');
            return;
        }

        const player = this.players.find(p => p.ws == ws);
        player.score = this.board.calculateScore(solution);
        if (player.score == 100) {
            this.status = GAME_STATUS.OVER;
            this.winner = ws;
        }
        this.sendStatusToAll();
    }

    /**
     * Generates a game status objet for a given player
     * @param {*} player The concerned player
     * @returns The game status objet
     * @memberof Game
     */
    getStatus(player) {
        return {
            solution:
                this.status == GAME_STATUS.OVER ? this.board.solution : null,
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

module.exports = {
    GAME_STATUS,
    Game
};
