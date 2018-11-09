const GameStatus = {
    waitingPlayers: 0,
    playing: 1,
    stopped: 2
};
class Game {
    constructor() {
        this.status = GameStatus.waitingPlayers;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.players.length == 2) {
            this.status = GameStatus.playing;
        }
    }

    deletePlayer(player) {
        this.players = this.players.filter(p => p != player);
        if (this.players.length == 0) {
            this.status = GameStatus.stopped;
        }
    }

    getStatus() {
        return {
            status: this.status,
            players: this.players
        };
    }
}

module.exports = Game;
