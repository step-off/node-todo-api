require('dotenv').config({ path: 'variables.env' });

const {app} = require('./app/app');
require('./db/db');

//Controllers
require('./controllers/todoController/todoController');

app.listen(process.env.PORT, () => {
    console.log('app is on: ', process.env.PORT)
});

module.exports = {}
