/**
 * UI Component for a Tetonor case input
 */
export default {
    props: ['input', 'choices'],
    template: '#tetonor-input',
    data: function() {
        return {
            /** Selected choice index in the list of */
            index: this.input.index
        };
    },
    methods: {
        /** Clears the input */
        clearValue: function() {
            if (this.input.index == null) return;
            this.choices[this.input.index].available += 1;
            this.index = this.input.index = null;
            this.$emit('updated');
        },
        /** Handles the droping of a new choice */
        dropChoice: function(e) {
            e.preventDefault();
            const choiceIndex = Number(e.dataTransfer.getData('choiceIndex'));
            if (this.input.index != null)
                this.choices[this.input.index].available += 1;
            this.choices[choiceIndex].available -= 1;
            this.index = this.input.index = choiceIndex;
            this.$emit('updated');
        },
        /** Accepts dragggin a new choice into the input */
        dragChoice: function(e) {
            e.preventDefault();
        }
    },
    computed: {
        /** The value based on the input chosen index */
        value: function() {
            return this.index != null ? this.choices[this.index].val : null;
        }
    }
};
