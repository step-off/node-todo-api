const {db} = require('../../db/db');

const Todo = db.model('Todo', {
    text: {
        type: String,
        required: true,
        minLength: 1
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo}
