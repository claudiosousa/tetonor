/**
 * UI Component showing the game over view
 */
import { gameManager } from '../services/game-manager.js';

export default {
    props: ['game'],
    methods: {
        /** reload the webpage main view */
        newGame: () => gameManager.restart()
    }
};
