/**
 * UI Component shown when waiting for other players to join the game
 */
export default {
    props: ['gameManager'],
    computed: {
        // retrieves the joined game
        game: function() {
            return this.gameManager.games.find(
                g => g.id == this.gameManager.gameId
            );
        }
    }
};
