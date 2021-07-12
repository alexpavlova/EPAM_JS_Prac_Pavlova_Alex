import io from "socket.io-client";

export function streamOn() {
    const socket = io.connect('https://voicy-speaker.herokuapp.com');
    const streamModes = document.getElementsByClassName('displayedMode');

    socket.on("audioMessage", function(audioChunks) {
        if (streamModes[0].id == 'Stream') {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
        } else return;
    })
}