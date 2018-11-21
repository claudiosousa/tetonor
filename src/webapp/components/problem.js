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
            operator: this.problem.operator
        };
    },
    methods: {
        toggleOperator: function() {
            this.operator = this.problem.operator =
                NEXT_OPERATOR[this.problem.operator];
            this.equationUpdated();
        },
        equationUpdated() {
            if (
                this.problem.inputA.index != null &&
                this.problem.inputB.index != null &&
                this.problem.operator
            ) {
                this.$emit('updated');
            }
        }
    }
};
