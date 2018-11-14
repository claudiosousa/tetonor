import communicationService from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';
import joinGameView from './views/join-game.view.js';

const components = {
    'join-game-view': joinGameView
};

var app = new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!',
        game: gameManager,
        gameName: null,
        GAME_STATUS
    },
    components,
    methods: {
        joinGame: function() {
            gameManager.joinGame(this.gameName);
        }
    }
});
