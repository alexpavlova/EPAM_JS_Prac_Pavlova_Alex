import { getAudio, printAudio } from './allVoices';
import { handleMicro } from './microphone';
import { streamOn } from './stream';

import { activate } from './functions';

const allVoices = document.getElementById("AllVoices");
const microphone = document.getElementById("Microphone");
const stream = document.getElementById("Stream");

const allVoicesButton = document.getElementById("AllVoicesButton");
const microphoneButton = document.getElementById("MicrophoneButton");
const streamButton = document.getElementById("StreamButton");

const recordButton = document.getElementById('recordCircleBut');

export default class Bar {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    showAllVoicesPage() {
        activate(allVoicesButton, 'activeButton');
        getAudio().then(result => printAudio(result));
        activate(allVoices, 'displayedMode');
    }

    showMicrophonePage() {
        activate(microphoneButton, 'activeButton');
        activate(microphone, 'displayedMode');
        recordButton.addEventListener("click", function() {
            handleMicro();
        });
    }

    showStreamPage() {
        activate(streamButton, 'activeButton');
        activate(stream, 'displayedMode');
        streamOn();
    }

    onClick(event) {
        let action = event.target.dataset.action;
        if (action) {
            this[action]();
        }
    }
}