import problem from './problem.js';

export default {
    props: ['game'],
    components: { problem },
    data: function() {
        return {
            dragging: false
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
