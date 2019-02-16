const express=require('express');
const bodyparser=require('body-parser');
const socket=require('socket.io');
const mongoose=require('mongoose');
const User=require('../models/user');
const Message=require('../models/message');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/jarvis',{useMongoClient:true});
mongoose.connection.once('open',function(){
	console.log("established connection with database");
	/*Message.find().then(function(result){
		let i=0,len=result.length;
		for(i=0;i<len;i++)
			console.log(result[i].sender,":",result[i].msg)
	})*/
}).on('error',function(err){
	console.log("Error connecting to database");
});

//mongoose.connection.collections.users.drop();
/*admin = new User({
		username:"admin",
		password:"admin"
})
admin.save().then(function(){
	console.log('admin controls')
});
*/
User.findOne({username:"admin"}).then(function(res){
	admin=res;
	console.log('found admin')
})

//App setup
const app=express();
app.set('view engine','ejs');
app.use(express.static('public'));
const server=app.listen(4000,function(){
	console.log("Listening to request on port 4000");
});
app.use(bodyparser.urlencoded({extended:false}));

app.get('/login',function(req,res){
	res.sendFile(__dirname+'/public/login.html');
});

app.post('/signup',function(req,res){
	var user = new User({
		username:req.body.email,
		password:req.body.password
	});
	/*user.contacts.push({username:admin.username,userid:admin._id});
	let con=[...admin.contacts,{username:user.username,userid:user._id}]
	admin.contacts=con;
	admin.save().then(function(){
		console.log('Updated admin');
	});
	let len=admin.contacts.length;
	console.log("New contact in admin",admin.contacts[len-1].username);
	*/user.save().then(function(){
		console.log("Successfully signed up");
	});
	Message.find().then(function(chatmsg){
		res.render('chat',{username:req.body.email,chats:chatmsg});
	});
});

app.post('/signin',function(req,res){
	User.findOne({username:req.body.email,password:req.body.password}).then(function(result){
		if(result == null){
			console.log('Wrong id or password');
			res.redirect('/login');
		}
		else{
			console.log('Successfully logged in');
			var chatmsg=[];
			Message.find().then(function(resultmsg){
				console.log('found all chat messages')
				chatmsg=resultmsg;
				/*let i=0,len=chatmsg.length;
				for(i=0;i<len;i++)
					console.log(chatmsg[i].sender,":",chatmsg[i].msg)*/
				res.render('chat',{username:req.body.email,chats:chatmsg});
			});
		}
	})
})

//socket setup
const io=socket(server);
io.on('connection',function(soc){
	console.log('made socket connection ',soc.id);
	soc.on('chat',function(data){
		io.sockets.emit('msg',data);
		let msg = new Message({
			sender:data.handle,
			msg:data.message
		});
		msg.save().then(function(){
			console.log('added new message to chat room from ',data.handle);
		});
	});
	soc.on('typing',function(data){
		soc.broadcast.emit('typing',data);
	});
});