import tetonorInput from './tetonor-input.js';

const NEXT_OPERATOR = {
    '': '+',
    '+': 'x',
    x: ''
};

export default {
    components: { tetonorInput },
    props: ['problem', 'choices'],
    data: function() {
        return {
            operator: this.problem.operator,
            state: null
        };
    },
    methods: {
        toggleOperator: function() {
            this.operator = this.problem.operator =
                NEXT_OPERATOR[this.problem.operator];
            this.equationUpdated();
        },
        equationUpdated() {
            this.state = null;
            if (
                this.problem.inputA.index != null &&
                this.problem.inputB.index != null &&
                this.problem.operator
            ) {
                const a = this.choices[this.problem.inputA.index].val,
                    b = this.choices[this.problem.inputB.index].val;
                const res = this.problem.operator == '+' ? a + b : a * b;
                this.state = res == this.problem.res ? 'SOLVED' : 'ERROR';
                this.$emit('updated');
            }
        }
    }
};
