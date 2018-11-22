import tetonorInput from './tetonor-input.js';

const NEXT_OPERATOR = {
    '': '+',
    '+': 'x',
    x: ''
};

const CORRECTNESS = {
    NOK: 'ERROR',
    NA: '',
    OK: 'SOLVED'
};

export default {
    components: { tetonorInput },
    props: ['problem', 'choices'],
    data: function() {
        return {
            problem: this.problem
        };
    },
    computed: {
        correctness: function() {
            if (
                this.problem.inputA.index != null &&
                this.problem.inputB.index != null &&
                this.problem.operator
            ) {
                const a = this.choices[this.problem.inputA.index].val,
                    b = this.choices[this.problem.inputB.index].val;
                const res = this.problem.operator == '+' ? a + b : a * b;
                return res == this.problem.res
                    ? CORRECTNESS.OK
                    : CORRECTNESS.NOK;
            }
            return CORRECTNESS.NA;
        }
    },
    methods: {
        toggleOperator: function() {
            this.problem.operator = NEXT_OPERATOR[this.problem.operator];
            this.equationUpdated();
        },
        equationUpdated() {
            this.$emit('updated');
        }
    }
};
