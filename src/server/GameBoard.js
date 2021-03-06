class GameBoard {
    static get MAX_VALUE() {
        return 20;
    }

    constructor() {
        this.generateGame();
    }

    shuffle(arr) {
        for (let i = 0; i < arr.length; i++) {
            let p = i + Math.floor(Math.random() * (arr.length - i));
            [arr[i], arr[p]] = [arr[p], arr[i]];
        }
    }

    generateGame() {
        this.choices = [...Array(16)]
            .map(() => Math.floor(Math.random() * GameBoard.MAX_VALUE) + 1)
            .sort((a, b) => a - b)
            .map(v => ({ val: v, available: 2 }));

        let indices = [...Array(16)].map((_, i) => i);
        indices = [...indices, ...indices];
        this.shuffle(indices);

        const board = indices
            .reduce((res, c) => {
                if (res.length && res[res.length - 1].length < 2)
                    res[res.length - 1].push(c);
                else res.push([c]);
                return res;
            }, [])
            .map(indices => [
                ...indices,
                ...indices.map(i => this.choices[i].val),
                Math.random() < 0.5 ? 'x' : '+'
            ]);
        this.problems = board.map(([i, j, a, b, op]) => ({
            res: op == '+' ? a + b : a * b,
            inputA: {
                index: null
            },
            operator: '',
            inputB: {
                index: null
            }
        }));
        this.solution = board.map(([i, j, a, b, op]) => ({
            res: op == '+' ? a + b : a * b,
            inputA: {
                index: i
            },
            operator: op,
            inputB: {
                index: j
            }
        }));
    }

    calculateScore(solution) {
        let done = 0;
        let used = Array(this.choices.length).fill(0);
        for (let i = 0; i < solution.problems.length; i++) {
            let solProbl = solution.problems[i];
            let boardProbl = this.problems[i];
            if (
                solProbl.inputA.index == null ||
                solProbl.inputB.index == null ||
                !solProbl.operator
            )
                continue;

            const a = this.choices[solProbl.inputA.index].val,
                b = this.choices[solProbl.inputB.index].val;

            used[solProbl.inputA.index]++;
            used[solProbl.inputB.index]++;

            if (
                used[solProbl.inputA.index] > 2 ||
                used[solProbl.inputB.index] > 2
            ) {
                console.log(
                    `Index used more than twice: ${
                        used[solProbl.inputA.index] > 2
                            ? solProbl.inputA.index
                            : solProbl.inputB.index
                    }`
                );
                return 0;
            }
            const res = solProbl.operator == '+' ? a + b : a * b;
            if (res == boardProbl.res) done += 1;
        }
        return (done * 100) / 16;
    }
}

module.exports = GameBoard;
