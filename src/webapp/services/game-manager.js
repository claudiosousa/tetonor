import { communicationService } from './communication.service.js';

const GAME_STATUS = {
    DISCONNECTED: -3,
    CHOOSE: -2,
    JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1,
    OVER: 9
};

class GameManager {
    constructor() {
        this.games = [];
        this.state = {
            status: GAME_STATUS.CHOOSE
        };
    }

    gamesList(gameList) {
        this.games = gameList.filter(game => game.status != GAME_STATUS.OVER);
    }

    restart() {
        this.state.status = GAME_STATUS.CHOOSE;
    }

    getGames() {
        communicationService.send('list', '');
    }

    createGame(gameName, players) {
        communicationService.send('create', { gameName, players });
    }

    joinGame(gameId) {
        communicationService.send('join', gameId);
    }

    chooseGame(gameId) {
        this.chosenGameId = gameId;
        this.state.status = GAME_STATUS.JOIN;
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

    disconnected() {
        this.state.status = GAME_STATUS.DISCONNECTED;
    }
}

const gameManager = new GameManager();
export { gameManager, GAME_STATUS };
