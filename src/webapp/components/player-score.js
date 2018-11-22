export default {
    props: ['player'],
    computed: {
        score: function() {
            return Math.floor(this.player.score * 100);
        }
    }
};
