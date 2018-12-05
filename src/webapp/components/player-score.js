/**
 * UI Component Showing a player score in the game
 */
export default {
    props: ['player'],
    computed: {
        /** Rounds a player score */
        score: function() {
            return Math.round(this.player.score);
        }
    }
};
