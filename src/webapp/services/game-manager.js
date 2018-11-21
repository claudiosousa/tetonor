import communicationService from './communication.service.js';

const GAME_STATUS = {
    TO_JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1
};

class GameManager {
    constructor() {
        this.state = {
            status: GAME_STATUS.TO_JOIN
        };
    }

    joinGame(gameId) {
        communicationService.send('join', gameId);
    }

    updateState(state) {
        this.state = state;
    }

    updateBoard(board) {
        this.board = board;
    }

    sendGameSolution(solution) {
        communicationService.send('solution', solution);
    }

    onclose() {}
}

const gameManager = new GameManager();
export { gameManager, GAME_STATUS };
