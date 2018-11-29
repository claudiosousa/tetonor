import { communicationService } from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import chooseGame from './components/choose-game.js';
import joinGame from './components/join-game.js';
import tetonor from './components/tetonor.js';

var app = new Vue({
    el: '#app',
    components: {
        chooseGame,
        joinGame,
        tetonor
    },
    data: {
        title: 'Hello to Tetonor!',
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
