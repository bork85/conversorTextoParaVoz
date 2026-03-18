const text = document.querySelector("#text");
const upload = document.querySelector("#upload");
const voice = document.querySelector("#voice");
const listenBtn = document.querySelector("#listen-btn");
const downloadBtn = document.querySelector("#download-btn");

const speak = new SpeechSynthesisUtterance();

let avalaibleVoices = [];

const getVoices = () => {
    avalaibleVoices = window.speechSynthesis.getVoices();

    speak.voice = avalaibleVoices[0];

    avalaibleVoices.forEach((voices, index)=>{
        const option = document.createElement("option");
        option.value = index;
        option.textContent = voices.name;
        voice.appendChild(option);
    })
}

window.speechSynthesis.onvoiceschanged = getVoices;

voice.addEventListener("change", ()=>{
    speak.voice = avalaibleVoices[voice.value];
});

listenBtn.addEventListener("click", ()=>{
    speak.text = text.value;
    window.speechSynthesis.speak(speak);
})

downloadBtn.addEventListener("click", ()=>{
    const downloadText = text.value;

    const blob = new Blob([downloadText], {type:"text/plain"});

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url
    a.download = "texto-conversor.txt";
    a.click()

    URL.revokeObjectURL(url)
})

upload.addEventListener("change", (file) => {
    const fileInput = file.target.files[0];
    if(fileInput) {
        const reader = new FileReader();
        reader.onload = (e) => {
            text.value = e.target.result;
        }
        reader.readAsText(fileInput);
    }
})