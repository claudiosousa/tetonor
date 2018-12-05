import { communicationService } from './communication.service.js';

/**
 * Games status client side
*/
const GAME_STATUS = {
    DISCONNECTED: -3,
    CHOOSE: -2,
    JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1,
    OVER: 9
};

/**
 * Handles the game state
 *
 * @class GameManager
 */
class GameManager {
    /**
     *Creates an instance of GameManager.
     * @memberof GameManager
     */
    constructor() {
        this.games = [];
        this.state = {
            status: GAME_STATUS.CHOOSE
        };
    }

    /**
     *Retrives the list of open games
     *
     * @param {*} gameList Game list to filter
     * @memberof GameManager
     */
    gamesList(gameList) {
        this.games = gameList.filter(game => game.status != GAME_STATUS.OVER);
    }

    /**
     *Sets the back to the choose game screen
     *
     * @memberof GameManager
     */
    restart() {
        this.state.status = GAME_STATUS.CHOOSE;
    }

    /**
     * Requests the list of games
     *
     * @memberof GameManager
     */
    getGames() {
        communicationService.send('list', '');
    }

    /**
     * Creates a new game
     *
     * @param {*} gameId New game identifier
     * @param {*} players Minimal number of players
     * @memberof GameManager
     */
    createGame(gameId, players) {
        communicationService.send('create', { gameId, players });
    }

    /**
     * Joins an existing game
     *
     * @param {*} gameId Game identifier
     * @memberof GameManager
     */
    joinGame(gameId) {
        communicationService.send('join', gameId);
    }

    /**
     * Selects the current game
     *
     * @param {*} gameId Game identifier
     * @memberof GameManager
     */
    chooseGame(gameId) {
        this.gameId = gameId;
        setTimeout(() => (this.state.status = GAME_STATUS.JOIN));
    }

    /**
     * Sets the new state machine state
     *
     * @param {*} state New state
     * @memberof GameManager
     */
    updateState(state) {
        this.state = state;
    }

    /**
     * Sets the newly updated board
     *
     * @param {*} board new board
     * @memberof GameManager
     */
    updateBoard(board) {
        this.board = board;
    }

    /**
     * Sends a new game solution to the server
     *
     * @param {*} solution Game solution
     * @memberof GameManager
     */
    sendGameSolution(solution) {
        communicationService.send('solution', {
            ...solution,
            gameId: this.gameId
        });
    }

    /**
     * Sets the user state to the disconnect screen
     *
     * @memberof GameManager
     */
    disconnected() {
        this.state.status = GAME_STATUS.DISCONNECTED;
    }
}

const gameManager = new GameManager();
export { gameManager, GAME_STATUS };
