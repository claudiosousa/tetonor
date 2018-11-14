import communicationService from './services/communication.service.js';
import { gameManager, GAME_STATUS } from './services/game-manager.js';

var app = new Vue({
    el: '#app',
    data: {
        title: 'Hello Vue!',
        game: gameManager,
        gameName: null,
        GAME_STATUS
    },
    methods: {
        joinGame: function() {
            gameManager.joinGame(this.gameName);
        }
    }
});
