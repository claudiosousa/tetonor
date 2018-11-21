import tetonorInput from './tetonor-input.js';

const NEXT_OPERATOR = {
    '': '+',
    '+': 'x',
    x: ''
};

export default {
    components: { tetonorInput },
    props: ['problem', 'choices'],
    methods: {
        toggleOperator: function() {
            this.problem.operator = NEXT_OPERATOR[this.problem.operator];
            this.equationUpdated();
        },
        equationUpdated() {
            if (
                this.problem.inputA.index != 0 &&
                this.problem.inputB.index != 0 &&
                this.problem.operator
            ) {
                const a = this.choices[this.problem.inputA.index].val,
                    b = this.choices[this.problem.inputB.index].val;
                this.problem.operator == '+' ? a + b : a * b;
                this.$emit('updated');
            }
        }
    }
};
