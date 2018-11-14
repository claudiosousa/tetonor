import communicationService from './communication.service.js';

const GAME_STATUS = {
    TO_JOIN: -1,
    WAITING_PEER: 0,
    PLAYING: 1
};

class GameManager {
    get status() {
        return this.state.status;
    }

    constructor() {
        this.state = {
            status: GAME_STATUS.TO_JOIN
        };
    }

    joinGame(name) {
        communicationService.send('join', name);
    }

    updateState(state) {
        this.state = state;
    }

    onclose() {}
}

const gameManager = new GameManager();
export { gameManager, GAME_STATUS };
