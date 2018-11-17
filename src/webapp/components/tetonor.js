const NEXT_OPERATOR = {
    '': '+',
    '+': 'x',
    x: ''
};

export default {
    data: function() {
        return {
            choices: [
                ...[
                    1,
                    2,
                    null,
                    4,
                    4,
                    5,
                    6,
                    6,
                    6,
                    9,
                    10,
                    10,
                    13,
                    13,
                    16,
                    16
                ].map(v => ({
                    val: v
                }))
            ],
            problems: [
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
                    inputA: null,
                    operator: '',
                    inputB: null
                }))
            ],
            msg: 'TETONOR GAME'
        };
    },
    methods: {
        toggleOperator: problem =>
            (problem.operator = NEXT_OPERATOR[problem.operator])
    }
};
