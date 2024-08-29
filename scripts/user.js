document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

if (!sessionStorage.getItem('messages')) {
    sessionStorage.setItem('messages', JSON.stringify([]));
}

function loadMessages() {
    const messages = JSON.parse(sessionStorage.getItem('messages'));
    messages.forEach(message => {
        addMessageToChat(message.role, message.content);
    });
}

function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const userInput = chatInput.value.trim();

    if (userInput) {
        addMessageToChat('user-message', userInput);
        saveMessage('user-message', userInput);
        chatInput.value = ''; 
        showLoadingIndicator(true); 
        sendMessageToAPI(userInput);
    }
}

function addMessageToChat(role, content) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', role);
    messageElement.textContent = content;

    const chatWindow = document.getElementById('chat-window');
    chatWindow.appendChild(messageElement);


    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function showLoadingIndicator(show) {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = show ? 'flex' : 'none';
}

function saveMessage(role, content) {
    const messages = JSON.parse(sessionStorage.getItem('messages'));
    messages.push({ role, content });
    sessionStorage.setItem('messages', JSON.stringify(messages));
}

function sendMessageToAPI(userInput) {
    fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: userInput })
    })
    .then(response => response.json())
    .then(data => {
        showLoadingIndicator(false); 
        if (data.processedText) {
            addMessageToChat('bot-message', data.processedText);
            saveMessage('bot-message', data.processedText);
        } else {
            addMessageToChat('bot-message', 'Desculpe, não consegui processar sua mensagem.');
            saveMessage('bot-message', 'Desculpe, não consegui processar sua mensagem.');
        }
    })
    .catch(error => {
        showLoadingIndicator(false); 
        console.error('Um Erro:', error);
        addMessageToChat('bot-message', 'Ocorreu um erro ao tentar processar sua mensagem.');
        saveMessage('bot-message', 'Ocorreu um erro ao tentar processar sua mensagem.');
    });
}

loadMessages();
