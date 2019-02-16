//Make connection on front end
/*var socket=io.connect('http://localhost:4000');

//Query DOM
var message=document.getElementById('message');
var output=document.getElementById('output');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var feedback=document.getElementById('feedback');


//Add event listener
btn.addEventListener('click',function(){
	console.log(handle.value);
	socket.emit('chat',{
		message:message.value,
		handle:handle.value
	});
	message.value="";
	document.getElementById('message').value="";
	console.log(document.getElementById('message').value);
});

message.addEventListener('keypress',function(){
	socket.emit('typing',handle.value);
});


//Listen for events
socket.on('msg',function(data){
	feedback.innerHTML='';
	output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
});

socket.on('typing',function(data){
	feedback.innerHTML='<p><em>'+data+' is typing...</p></em>';
});