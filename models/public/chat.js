
//create a client_socket connectoin
var client_socket=io.connect('http://localhost:4000');

//Query DOM
var task=document.getElementById('task');
var output=document.getElementById('output');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');


//Add event listener
/*
btn.addEventListener('click',function(){
	socket.emit('chat',{
		task:task.value,
		handle:handle.value
	});
	task.value="";
});
*/

function handleClick(){
	//e.preventDefault();
	client_socket.emit('addTask',{
		task:task.value,
		handle:handle.value
	});
	output.innerHTML+='<p><strong>'+task.value+'</strong></p>';
	task.value="";
}

//Listen for events
/*socket.on('msg',function(data){
	feedback.innerHTML='';
	output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
});
*/