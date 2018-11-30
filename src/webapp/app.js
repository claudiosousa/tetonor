import { communicationService } from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import chooseGame from './components/choose-game.js';
import joinGame from './components/join-game.js';
import tetonor from './components/tetonor.js';
import gameOver from './components/game-over.js';

var app = new Vue({
    el: '#app',
    components: {
        chooseGame,
        joinGame,
        gameOver,
        tetonor
    },
    data: {
        GAME_STATUS,
        gameManager
    },
    computed: {
        game: function() {
            return this.gameManager.state;
        },
        games: function() {
            return this.gameManager.games;
        },
        board: function() {
            return this.gameManager.board;
        }
    }
});
