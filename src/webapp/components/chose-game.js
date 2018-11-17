import { gameManager } from '../services/game-manager.js';

export default {
    data: function() {
        return {
            gameName: 'default'
        };
    },
    methods: {
        joinGame: function() {
            gameManager.joinGame(this.gameName);
        }
    }
};
