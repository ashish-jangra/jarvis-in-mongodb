const mongoose=require('mongoose');
const Schema=mongoose.Schema;

/*const MessageSchema = new Schema({
	content:String
});

const ContactSchema = new Schema({
	username:String,
	messages:[String]
});

const UserSchema = new Schema({
	username:String,
	contacts:String
});

const User = mongoose.model('user',UserSchema);
module.exports = User;
*/

const MessageSchema = new Schema({
	content:String
});

const ContactSchema = new Schema({
	username:String,
	userid:Object,
	messages:[MessageSchema]
});

const UserSchema = new Schema({
	username:String,
	contacts:[ContactSchema],
	password:String
});

const User=mongoose.model('user',UserSchema);

module.exports=User;