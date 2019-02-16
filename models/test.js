const socket = require('socket.io');
const express = require('express');
const Todo = require('./todo')
const mongoose = require('mongoose')

const app = express();

app.use(express.static('public'));
const server = app.listen(4000,function(){
	console.log('listening to port 4000');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jarvis',{useMongoClient:true});

mongoose.connection.once('open',function(err){
	console.log('connected to mongodb database');
}).on('error',function(err){
	console.log('Error with database',err);
});

const server_socket = socket(server);

server_socket.on('connection',function(client_socket){
	client_socket.on('addTask',function(data){
		console.log('request to add task');
		let Task = new Todo({
			username:data.handle,
			task:data.task
		});
		Task.save().then(function(){
			console.log('saved task');
		});
	});
});