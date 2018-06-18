const {app} = require('../../app/app');
const TODO_ROUTES = require('./routes');
const {handleTodoPost, handleGetAllTodods, handleGetTodoById} = require('./handlers');

app.post(TODO_ROUTES.TODOS, handleTodoPost);

app.get(TODO_ROUTES.TODOS, handleGetAllTodods);

app.get(TODO_ROUTES.TODO_ID, handleGetTodoById);

module.exports = {app};

