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
    computed: {
        playersByScore: function() {
            return this.game.players.sort((p1, p2) => {
                if (p1.score != p2.score) return p2.score - p1.score;
                if (p1.connected != p2.connected) return p1.connected ? -1 : 1;
                return p1.user.localeCompare(p2.user);
            });
        }
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
