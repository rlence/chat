const express = require('express');
const app = express();
const path = require('path');
const SocketIO = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, 'public') ));

// start the server
const server = app.listen(app.get('port'), ()=>{
       console.log('server on port', app.get('port'));
});


//stting socketIo
const io = SocketIO(server);//pasando el server a socket ya que necesita de un servidor levantado para funcionar

//websockets
io.on('connection', (socket)=> {
       
       console.log('new connection', socket.id)//socket id te da un id diferente por cada conexion

       socket.on('chat:message', (data)=>{
              io.sockets.emit('chat:message', data );
       });

       socket.on('chat:typing', (data)=>{
              socket.broadcast.emit('chat:typing', data);
       });
});


