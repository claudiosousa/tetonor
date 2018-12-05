/**
 * UI Component hangling a Tetonor case
 */
import tetonorInput from './tetonor-input.js';

/**
 * List of operators with sucessor.
 * current: op -> next:op
 */
const NEXT_OPERATOR = {
    '': '+',
    '+': 'x',
    x: ''
};

/** Tetonor case status to class */
const CORRECTNESS = {
    NOK: 'ERROR',
    NA: '',
    OK: 'SOLVED'
};

export default {
    components: { tetonorInput },
    props: ['boardProblem', 'choices'],
    data: function() {
        return {
            /** A tetonor case */
            problem: this.boardProblem
        };
    },
    computed: {
        /** Case corectness status */
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
        /** Toggles the case operator */
        toggleOperator: function() {
            this.problem.operator = NEXT_OPERATOR[this.problem.operator];
            this.equationUpdated();
        },
        /** Npotifies the caes was updated */
        equationUpdated() {
            this.$emit('updated');
        }
    }
};
