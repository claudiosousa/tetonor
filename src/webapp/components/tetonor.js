import { gameManager } from '../services/game-manager.js';
import problem from './problem.js';
import playerScore from './player-score.js';

export default {
    props: ['board', 'game'],
    components: { problem, playerScore },
    data: function() {
        return {
            dragging: false
        };
    },
    methods: {
        problemUpdated() {
            gameManager.sendGameSolution(this.board);
        },
        dragstart: function(choiceIndex, e) {
            this.dragging = true;
            e.dataTransfer.setData('choiceIndex', choiceIndex);
        },
        dragend: function() {
            this.dragging = false;
        }
    }
};
