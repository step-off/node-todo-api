const express = require('express');
const {bodyParser} = require('./bodyParser');
const app = express();

app.use(bodyParser.json());

module.exports = {app};