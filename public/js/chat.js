const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

socket.on('location', (message) => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser'); 
    }

    navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude} = coords;
        console.log('Location sent!');
        socket.emit('sendLocation', {
            latitude,
            longitude
        });
    });

});