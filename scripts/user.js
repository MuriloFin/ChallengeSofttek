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
    
    
    const formattedContent = formatContent(content);
    
   
    const imageUrl = role === 'bot-message' ? '../images/logo-helptek.png' : ''; 
    messageElement.innerHTML = imageUrl ? `<img src="../images/logo-helptek.png" alt="${role}" class="message-image" /> ${formattedContent}` : formattedContent;

    const chatWindow = document.getElementById('chat-window');
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


function formatContent(content) {
 
    let formattedContent = content.replace(/\n{2,}/g, '<br /><br />'); // 
    formattedContent = formattedContent.replace(/\n/g, '<br />'); // 
    
   
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');


    formattedContent = formattedContent.replace(/(<br\s*\/?>\s*){2,}/g, '</p><p>'); 
    formattedContent = `<p>${formattedContent}</p>`; 

    return formattedContent;
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