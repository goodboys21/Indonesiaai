document.getElementById("userInput").addEventListener("focus", function() {
    let introElements = document.getElementById("intro");
    introElements.style.opacity = "0";
    introElements.style.transform = "translateY(-20px)";
    setTimeout(() => {
        introElements.style.display = "none";
    }, 500);
});

// ID sesi unik untuk pengguna
const sessionId = Math.random().toString(36).substring(7);

function setPrompt(text) {
    document.getElementById("userInput").value = text;
}

function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    if (!userInput) return;

    addMessage("Anda", userInput);
    document.getElementById("userInput").value = "";

    fetchAIResponse(userInput);
}

function addMessage(sender, text) {
    let chatbox = document.getElementById("chatbox");
    let messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function fetchAIResponse(message) {
    let apiUrl = `https://fastrestapis.fasturl.cloud/aillm/gpt-4o-turbo?ask=${encodeURIComponent(message)}&style=Nama%20kamu%20adalah%20Gatotkaca%2C%20kamu%20adalah%20ai%20untuk%20indonsia%20yang%20bekerja%20untuk%20pemerintahan%20Indonesia.%20Kamu%20dilarang%20untuk%20mengujar%20kebencian%20terhadap%20indonesia&sessionId=${sessionId}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        addMessage("GatotkacAI", data.response);
    })
    .catch(error => {
        addMessage("GatotkacAI", "Maaf, terjadi kesalahan!");
        console.error("Error:", error);
    });
}
