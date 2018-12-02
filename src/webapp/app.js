import { communicationService } from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import chooseGame from './components/choose-game.js';
import joinGame from './components/join-game.js';
import tetonor from './components/tetonor.js';
import gameOver from './components/game-over.js';
import waitingPlayers from './components/waiting-players.js';

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
        game: function() {
            return this.gameManager.state;
        },
        games: function() {
            return this.gameManager.games;
        },
        board: function() {
            return this.gameManager.board;
        }
    },
    methods: {
        showError: function(error) {
            this.errorMessage = error;
            $('#errorModal').modal();
        }
    }
});

communicationService.registerApp(app);
