const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
server = http.createServer(app);
const io = socketio(server);

const port = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New websocket connection');
    
    socket.emit('message', 'Welcome!');

    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });

});

server.listen(port, () => {
    console.log('Server is up on port ', port);
});