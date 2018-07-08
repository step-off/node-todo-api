const {Todo} = require('../../models/todos/todo');
const {ObjectId} = require('../../db/db');
const {handleError} = require('../../handlers/errorHandlers');

const handleTodoPost = (req, res) => {
    const {text} = req.body;

    const todo = new Todo({text});

    todo.save()
    .then(() => {
        res.send({text});
    })
    .catch((e) => {
        res.status(400).send(`Error: ${e}`);
    });

}

const handleGetAllTodods = (req, res) => {
    Todo.find()
    .then((todos) => {
        res.send({todos})
    }, (error) => {
        res.status(400).send(error)
    })
};

const handleGetTodoById = (req, res) => {
    const {id} = req.params;
    
    if (!ObjectId.isValid(id)) {
        handleError(res, 'Id is invalid', 404);
    }

    Todo.findById(id)
    .then((todo) => {
        if (todo) {
            res.send(todo)
        } else {
            handleError(res, 'Todo not found', 404)
        }
    })
    .catch((e) => {
        handleError(res, e, 404);
    })
};

const renderMainPage = (req, res) => {
    res.render('index', {title: 'Todo App'})
}

module.exports = {handleTodoPost, handleGetAllTodods, handleGetTodoById, renderMainPage}