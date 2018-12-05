/**
 * UI Component aloowing the user to join a game
 */
import { gameManager } from '../services/game-manager.js';

const TETONOR_USR_KEY = 'TETONOR_USR';

export default {
    data: function() {
        return {
            /**The selected game id to join */
            gameId: gameManager.gameId,
            /** The player name */
            username: localStorage.getItem(TETONOR_USR_KEY)
        };
    },
    methods: {
        /** Joins the game */
        joinGame: function() {
            localStorage.setItem(TETONOR_USR_KEY, this.username);
            gameManager.joinGame({
                gameId: this.gameId,
                user: this.username
            });
        }
    }
};
