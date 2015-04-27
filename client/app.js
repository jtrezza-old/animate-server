const xhr = require('xhr');
const Webrtc2Images = require('webrtc2images');

const rtc = new Webrtc2Images({
    width: 200,
    height: 200,
    frames: 10,
    type: 'image/jpeg',
    quality: 0.4,
    interval: 200
});

rtc.startVideo(function(error){
    if(error) return logError(error);
});

const record = document.querySelector('#record');

record.addEventListener('click', function(e){
    e.preventDefault();

    rtc.recordVideo(function(error, frames){
        if (error) return logError(error);

        xhr({
            uri: '/process',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({images: frames})
        }, function(error, res, body){
            if (error) return logError(error);

            console.log(JSON.parse(body));
        });
    });
}, false);

function logError(error)
{
    console.error(error);
}