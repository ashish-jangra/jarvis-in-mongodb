const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	username:String,
	task:String,
	deadline:Date
});

const Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;