/**
 * UI Component showing the tetonor game
 */
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
        // palyer list sorted by score[DESC], connected[True, Talse], UserName[ASC]
        playersByScore: function() {
            return this.game.players.sort((p1, p2) => {
                if (p1.score != p2.score) return p2.score - p1.score;
                if (p1.connected != p2.connected) return p1.connected ? -1 : 1;
                return p1.user.localeCompare(p2.user);
            });
        }
    },
    methods: {
        /** Sends the new state of the problem to the server */
        problemUpdated() {
            gameManager.sendGameSolution(this.board);
        },
        /** Handles the drag start event */
        dragstart: function(choiceIndex, e) {
            this.dragging = true;
            e.dataTransfer.setData('choiceIndex', choiceIndex);
        },
        /** Handles the drag end event */
        dragend: function() {
            this.dragging = false;
        }
    }
};
