import { gameManager } from '../services/game-manager.js';

export default {
    props: ['game'],
    methods: {
        newGame: () => gameManager.restart()
    }
};
