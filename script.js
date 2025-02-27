// Fungsi mengirim pesan
function sendMessage() {
    let userInput = document.getElementById("userInput");
    let message = userInput.value.trim();
    
    if (message === "") return;

    let chatBox = document.getElementById("chatBox");

    // Tambahkan pesan pengguna
    let userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.innerText = message;
    chatBox.appendChild(userMessage);

    // Hapus input
    userInput.value = "";

    // Sembunyikan welcome section dengan animasi
    let welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
        welcomeSection.classList.add("fade-out");
        setTimeout(() => welcomeSection.remove(), 1000);
    }

    // Scroll ke bawah
    scrollToBottom();

    // Kirim pesan ke API luminai.my.id
    fetch("https://luminai.my.id/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message })
    })
    .then(response => response.json())
    .then(data => {
        let botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        botMessage.innerText = data.response || "Maaf, saya tidak mengerti.";
        chatBox.appendChild(botMessage);

        // Scroll ke bawah
        scrollToBottom();
    })
    .catch(error => {
        console.error("Error:", error);
        let errorMessage = document.createElement("div");
        errorMessage.className = "chat-message bot";
        errorMessage.innerText = "Terjadi kesalahan. Coba lagi.";
        chatBox.appendChild(errorMessage);

        // Scroll ke bawah
        scrollToBottom();
    });
}

// Fungsi auto-scroll ke bawah
function scrollToBottom() {
    let chatBox = document.getElementById("chatBox");
    chatBox.scrollTop = chatBox.scrollHeight;
}
