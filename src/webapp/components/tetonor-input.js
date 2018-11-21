export default {
    props: ['input', 'choices'],
    template: '#tetonor-input',
    data: function() {
        return {
            index: this.input.index
        };
    },
    methods: {
        clearValue: function() {
            if (this.input.index == null) return;
            this.choices[this.input.index].available += 1;
            this.index = this.input.index = null;
            this.$emit('updated');
        },
        dropChoice: function(e) {
            e.preventDefault();
            const choiceIndex = Number(e.dataTransfer.getData('choiceIndex'));
            if (this.input.index != null)
                this.choices[this.input.index].available += 1;
            this.choices[choiceIndex].available -= 1;
            this.index = this.input.index = choiceIndex;
            this.$emit('updated');
        },
        dragChoice: function(e) {
            e.preventDefault();
        }
    },
    computed: {
        value: function() {
            return this.index != null ? this.choices[this.index].val : null;
        }
    }
};
