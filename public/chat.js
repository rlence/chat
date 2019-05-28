const socket = io();

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//escuchando envento click en el boton
btn.addEventListener('click', function(){
       
       socket.emit('chat:message',{ //emitiando datos
              message:message.value,
              username:username.value
       });
});

message.addEventListener('keypress', function(){
       socket.emit('chat:typing', username.value);
});

//escuchando datos del server
socket.on('chat:message', function(data){
       console.log(data);
       output.innerHTML += `<p> 
              <strong>${data.username}</strong>: ${data.message}
       </p>`
});

//escuha para el que esta escribiendo
socket.on('chat:typing', function (data){
       actions.innerHTML = `<p><em>${data} is typing a message... </em></p>`
});