const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
	sender:String,
	msg:String
});

const Message = mongoose.model('message',MessageSchema);

module.exports = Message;