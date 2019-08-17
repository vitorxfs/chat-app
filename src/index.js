const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
server = http.createServer(app);
const io = socketio(server);

const port = 3000;

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('New websocket connection');
    
    socket.emit('message', 'Welcome!');

    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendLocation', ({ latitude:lat, longitude:long }, callback) => {
        io.emit('location', `https://google.com/maps?q=${lat},${long}`);
        callback('Location sent!');
    });
    

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!');
        }
        io.emit('message', message);
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });

});

server.listen(port, () => {
    console.log('Server is up on port ', port);
});