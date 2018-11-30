import { gameManager } from '../services/game-manager.js';

const TETONOR_USR_KEY = 'TETONOR_USR';

export default {
    data: function() {
        return {
            gameName: gameManager.chosenGameId,
            username: localStorage.getItem(TETONOR_USR_KEY)
        };
    },
    methods: {
        joinGame: function() {
            localStorage.setItem(TETONOR_USR_KEY, this.username);
            gameManager.joinGame({ game: this.gameName, user: this.username });
        }
    }
};
