import io from 'socket.io-client';

let mediaRec = undefined;

export function handleMicro() {
    let buttonByClass = document.getElementsByClassName('recording');
    const buttonById = document.getElementById('recordCircleBut');

    if (buttonByClass.length > 0) {
        buttonById.classList.toggle('recording');
        buttonById.innerText = "Recording is off";
        stopRecording();
    } else {
        buttonById.classList.toggle('recording');
        buttonById.innerText = "Recording is on";
        record();
    }
}

function record() {
    const socket = io.connect('https://voicy-speaker.herokuapp.com/');

    socket.on("connect", function() {
        console.log(socket.connected);
    });

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRec = mediaRecorder;
            mediaRecorder.start();

            const audioChunks = [];
            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                socket.emit('audioMessage', audioChunks);
            });
        });
}

function stopRecording() {
    mediaRec.stop();
}