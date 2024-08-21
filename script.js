$(document).ready(function() {
    $('#send-button').click(function() {
        var userInput = $('#user-input').val();
        if (userInput.trim() !== '') {
            $('#chat-history').append('<div class="user-message"><strong>Usuário:</strong> ' + userInput + '</div>');
            $('#user-input').val('');
            
   
            setTimeout(function() {
                $('#chat-history').append('<div class="bot-message"><strong>Chatbot:</strong> Esta é uma resposta simulada do chatbot.</div>');
                $('#chat-history').scrollTop($('#chat-history')[0].scrollHeight);
            }, 500);
        }
    });

    $('#user-input').keypress(function(e) {
        if (e.which == 13) {
            $('#send-button').click();
        }
    });
});
