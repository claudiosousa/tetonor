export default {
    props: ['input', 'choices'],
    template: '#tetonor-input',
    methods: {
        drop: function(e) {
            e.preventDefault();
            const choiceIndex = Number(e.dataTransfer.getData('choiceIndex'));
            if (this.input.index != null)
                this.choices[this.input.index].available += 1;
            this.choices[choiceIndex].available -= 1;
            this.input.index = choiceIndex;
        },
        dragover: function(e) {
            e.preventDefault();
        }
    }
};
