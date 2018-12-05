/**
 * UI Component listing the games
 */
import { gameManager, GAME_STATUS } from '../services/game-manager.js';

const TRANSLATIONS = {
    [GAME_STATUS.WAITING_PEER]: 'Waiting...',
    [GAME_STATUS.PLAYING]: 'Playing',
    [GAME_STATUS.OVER]: 'Finished'
};

export default {
    props: ['games'],
    data: function() {
        return { GAME_STATUS, gameId: null, players: 2 };
    },
    /** retrieve game list on created */
    created: () => gameManager.getGames(),
    methods: {
        /** A game textual status */
        status: function(gameStatus) {
            return TRANSLATIONS[gameStatus];
        },
        /** Chooses a game */
        chooseGame: function(gameId) {
            gameManager.chooseGame(gameId);
        },
        /** Creates a game */
        createGame: function() {
            gameManager.createGame(this.gameId, this.players);
        }
    }
};
