/**
 * Entry point for webapp
 * Rgisters the main Vue
 */

import { communicationService } from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import chooseGame from './components/choose-game.js';
import joinGame from './components/join-game.js';
import tetonor from './components/tetonor.js';
import gameOver from './components/game-over.js';
import waitingPlayers from './components/waiting-players.js';

/**
 * Create the app main Vue, on the #app element *
 */
const app = new Vue({
    el: '#app',
    components: {
        chooseGame,
        joinGame,
        waitingPlayers,
        gameOver,
        tetonor
    },
    data: {
        GAME_STATUS,
        gameManager,
        errorMessage: null
    },
    computed: {
        /** The game state */
        game: function() {
            return this.gameManager.state;
        },
        /** The game list */
        games: function() {
            return this.gameManager.games;
        },
        /** The current game */
        board: function() {
            return this.gameManager.board;
        }
    },
    methods: {
        /** Display an error to the user */
        showError: function(error) {
            this.errorMessage = error;
            $('#errorModal').modal();
        }
    }
});

communicationService.registerApp(app);
