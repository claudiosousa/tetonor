class GameBoard {
    constructor() {
        this.generateGame();
    }

    generateGame() {
        this.choices = [
            ...[1, 2, 4, 4, 4, 5, 6, 6, 6, 9, 10, 10, 13, 13, 16, 16].map(
                v => ({
                    val: v,
                    available: 2
                })
            )
        ];

        // this.problems = [
        //     ...[
        //         14,
        //         15,
        //         16,
        //         18,
        //         24,
        //         17,
        //         17,
        //         52,
        //         10,
        //         32,
        //         20,
        //         12,
        //         26,
        //         45,
        //         100,
        //         36
        //     ].map(r => ({
        //         res: r,
        //         inputA: {
        //             index: null
        //         },
        //         operator: '',
        //         inputB: {
        //             index: null
        //         }
        //     }))
        // ];

        this.problems = [
            {
                res: 14,
                inputA: {
                    index: 10
                },
                operator: '+',
                inputB: {
                    index: 3
                }
            },
            {
                res: 15,
                inputA: {
                    index: 10
                },
                operator: '+',
                inputB: {
                    index: 5
                }
            },
            {
                res: 16,
                inputA: {
                    index: 15
                },
                operator: 'x',
                inputB: {
                    index: 0
                }
            },
            {
                res: 18,
                inputA: {
                    index: 15
                },
                operator: '+',
                inputB: {
                    index: 1
                }
            },
            {
                res: 24,
                inputA: {
                    index: 15
                },
                operator: '+',
                inputB: {
                    index: 6
                }
            },
            {
                res: 17,
                inputA: {
                    index: 13
                },
                operator: '+',
                inputB: {
                    index: 3
                }
            },
            {
                res: 17,
                inputA: {
                    index: 13
                },
                operator: '+',
                inputB: {
                    index: 4
                }
            },
            {
                res: 52,
                inputA: {
                    index: 13
                },
                operator: 'x',
                inputB: {
                    index: 4
                }
            },
            {
                res: 10,
                inputA: {
                    index: 13
                },
                operator: '+',
                inputB: {
                    index: 4
                }
            },
            {
                res: 32,
                inputA: {
                    index: 14
                },
                operator: '+',
                inputB: {
                    index: 14
                }
            },
            {
                res: 20,
                inputA: {
                    index: 5
                },
                operator: 'x',
                inputB: {
                    index: 4
                }
            },
            {
                res: 12,
                inputA: {
                    index: 6
                },
                operator: 'x',
                inputB: {
                    index: 1
                }
            },
            {
                res: 26,
                inputA: {
                    index: 13
                },
                operator: 'x',
                inputB: {
                    index: 1
                }
            },
            {
                res: 45,
                inputA: {
                    index: 9
                },
                operator: 'x',
                inputB: {
                    index: 5
                }
            },
            {
                res: 100,
                inputA: {
                    index: 10
                },
                operator: 'x',
                inputB: {
                    index: 10
                }
            },
            {
                res: 36,
                inputA: {
                    index: 9
                },
                operator: 'x',
                inputB: {
                    index: 3
                }
            }
        ];
    }

    calculateScore(solution) {
        return Math.random() % 100;
    }
}

module.exports = GameBoard;
