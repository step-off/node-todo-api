require('dotenv').config({ path: 'variables.env' });
const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

const {app, express} = require('./app/app');
require('./db/db');

//Controllers
require('./controllers/todoController/todoController');

app.listen(process.env.PORT, () => {
    console.log('app is on: ', process.env.PORT)
});

app.set('view engine', 'pug');
app.set('views', ROOT_PATH + '/views');

app.use(express.static(ROOT_PATH + '/public'))

module.exports = {}
