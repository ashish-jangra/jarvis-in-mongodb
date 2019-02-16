const mongoose=require('mongoose');
const User=require('../models/user');

mongoose.Promise=global.Promise;

console.log("Trying to update");

function fun () {
	User.findOne({username:"amand"}).then(function(res){
		console.log("found ",res);
	}) 
}
fun()

mongoose.connect('mongodb://localhost/jarvis',{useMongoClient:true});
/*mongoose.connection.once('open',function () {
	console.log('connected');
	fun();
})*/
