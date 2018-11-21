class GameBoard {
    constructor() {
        this.generateGame();
    }

    generateGame() {
        this.choices = [
            ...[1, 2, null, 4, 4, 5, 6, 6, 6, 9, 10, 10, 13, 13, 16, 16].map(
                v => ({
                    val: v,
                    available: 2
                })
            )
        ];

        this.problems = [
            ...[
                14,
                15,
                16,
                18,
                24,
                17,
                17,
                52,
                10,
                32,
                20,
                12,
                26,
                45,
                100,
                36
            ].map(r => ({
                res: r,
                inputA: {
                    index: null
                },
                operator: '',
                inputB: {
                    index: null
                }
            }))
        ];
    }

    calculateScore(solution) {
        return Math.random() % 100;
    }
}

module.exports = GameBoard;
