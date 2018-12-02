export default {
    props: ['gameManager'],
    computed: {
        game: function() {
            return this.gameManager.games.find(
                g => g.id == this.gameManager.gameId
            );
        }
    }
};
