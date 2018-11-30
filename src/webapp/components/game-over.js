import { gameManager, GAME_STATUS } from '../services/game-manager.js';

const TRANSLATIONS = {
    [GAME_STATUS.WAITING_PEER]: 'Waiting...',
    [GAME_STATUS.PLAYING]: 'Playing',
    [GAME_STATUS.OVER]: 'Finished'
};

export default {
    props: ['games'],
    data: function() {
        return {
            GAME_STATUS,
            gameName: null,
            players: 2
        };
    },
    created: () => gameManager.getGames(),
    methods: {
        status: function(gameStatus) {
            return TRANSLATIONS[gameStatus];
        },
        chooseGame: function(game) {
            gameManager.chooseGame(game.id);
        },
        createGame: function() {
            gameManager.createGame(this.gameName, this.players);
        }
    }
};
