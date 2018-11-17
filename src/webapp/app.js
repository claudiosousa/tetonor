import communicationService from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import choseGame from './components/chose-game.js';
import tetonor from './components/tetonor.js';

var app = new Vue({
    el: '#app',
    components: {
        choseGame,
        tetonor
    },
    data: {
        title: 'Hello to Tetonor!',
        game: gameManager,
        GAME_STATUS
    }
});
