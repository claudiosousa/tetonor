import communicationService from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import choseGame from './components/chose-game.js';
import tetonor from './components/tetonor.js';

const components = {
    choseGame,
    tetonor
};

var app = new Vue({
    el: '#app',
    data: {
        title: 'Hello to Tetonor!',
        game: gameManager,
        GAME_STATUS
    },
    components
});
