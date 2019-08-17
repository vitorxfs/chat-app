const socket = io();

//elements

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');

const $messages = document.querySelector('#messages');

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationURLTemplate = document.querySelector('#location-url-template').innerHTML;




socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('location', (url) => {
    console.log(url);
    const html = Mustache.render(locationURLTemplate, {
        url
    });
    $messages.insertAdjacentHTML('beforeend', html);
});



$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {

        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if(error) 
            console.log(error);
        else
            console.log('Message Delivered!');
    });
});

$locationButton.addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser'); 
    }

    $locationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude} = coords;

        $locationButton.removeAttribute('disabled');
        
        socket.emit('sendLocation', {
            latitude,
            longitude
        }, (responseMessage) => {
            console.log(responseMessage);
        });
    });

});