import { gameManager } from '../services/game-manager.js';
import problem from './problem.js';

export default {
    props: ['board'],
    components: { problem },
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
