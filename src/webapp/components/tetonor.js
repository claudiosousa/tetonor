import problem from './problem.js';

export default {
    components: { problem },
    data: function() {
        return {
            dragging: false,
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
                    val: v,
                    available: 2
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
                    inputA: {
                        index: null
                    },
                    operator: '',
                    inputB: {
                        index: null
                    }
                }))
            ]
        };
    },
    methods: {
        problemUpdated(problem) {
            console.log('updated', problem);
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
