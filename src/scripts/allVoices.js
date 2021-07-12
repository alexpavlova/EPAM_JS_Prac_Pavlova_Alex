const voicesList = document.getElementById('voicesList');

export async function getAudio() 
{
    let response = await fetch('https://voicy-speaker.herokuapp.com/voices');
    let data = await response.json();

    return data;
}

export function printAudio(data) 
{
    voicesList.innerHTML = "";
    let i = data.length >= 5 ? data.length - 5 : 0;

    for (i; i < data.length; i++) 
    {
        const audio = document.createElement('audio');
        audio.controls = true;
        const audioBlob = new Blob([new Uint8Array(data[i].audioBlob[0].data).buffer]);
        const audioUrl = URL.createObjectURL(audioBlob);
        audio.src = audioUrl;

        const li = document.createElement('li');
        li.classList.add('voiceMessage');
        li.appendChild(audio)
        voicesList.appendChild(li);
    }
}