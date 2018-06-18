const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');

console.log(process.env.DATABASE)

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

module.exports = {db: mongoose, ObjectId};