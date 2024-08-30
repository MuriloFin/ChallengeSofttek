# Helptek

<img src="https://github.com/user-attachments/assets/c716b303-d3d4-43fc-8190-08230df0a7e0" alt="logo-helptek" height="150">

**Helptek – Levando soluções para todos!**

## Descrição

Helptek é uma plataforma inovadora projetada para agilizar a solução de problemas de usuários finais. Focada em melhorar a eficiência no atendimento, especialmente para atendentes da Softtek, a Helptek combina um banco de dados de soluções anteriores, filtragem inteligente e um chatbot que aprende com os erros para fornecer respostas rápidas e precisas. Isso garante que o atendimento se torne uma engrenagem precisa, onde cada movimento agiliza o próximo, resultando em soluções rápidas e sem interrupções.

## Video Pitch do Projeto

[![Video Pitch](https://img.youtube.com/vi/u2cKK3KzYfg/0.jpg)](https://youtu.be/u2cKK3KzYfg)


## Funcionalidades

- **Histórico de Soluções**: Armazena e gerencia soluções anteriores para facilitar a busca e o atendimento de novos problemas.
- **Filtragem Inteligente**: Localiza soluções similares ao problema atual, reduzindo o tempo de resposta.
- **Chatbot Aprimorado**: Aprende com os erros anteriores para fornecer suporte cada vez mais eficiente aos atendentes.

## Pré-requisitos

Antes de rodar o projeto, certifique-se de que o seu ambiente de desenvolvimento atende aos seguintes requisitos:

1. **IDE**: Recomendamos o uso do [Visual Studio Code (VSCode)](https://code.visualstudio.com/).
2. **Node.js**: Certifique-se de que o Node.js está instalado. Você pode baixá-lo [aqui](https://nodejs.org/).
3. **Extensão Live Server**: Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VSCode para rodar o servidor localmente.
4. **Internet**: É necessário o uso de Internet para o projeto funcionar corretamente.

## Como Rodar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório** para a sua máquina local, abra o Git Bash em algum lugar de sua máquina e digite:
   ```bash
   git clone https://github.com/MuriloFin/ChallengeSofttek.git
   ```

2. **Abra o projeto em sua máquina em alguma IDE (Recomenda-se o Visual Studio Code)**


4. **Abra o terminal do VSCode com o atalho Ctrl+'**

      Essa tela deverá aparecer para você:
   ![exemplo vs code](https://github.com/user-attachments/assets/1d7aaca7-ed42-4136-a88d-ed9261643d0c)



6. **Digite o comando para instalar as dependências do projeto**
   ```bash
   npm install
   ```
  
   ![exemplo npm install](https://github.com/user-attachments/assets/620edbcb-bdbd-4bf3-b187-0ac79a05da64)


7. **Agora, execute o server.js através do Node para rodar localmente nosso servidor que faz a conexão com a IA do Chatbot:**
   ```bash
   node server.js
   ```

   ![Exemplo servidor rodando](https://github.com/user-attachments/assets/addaacd8-c65a-4e72-8a25-5bfa97824907)


8. **Com o projeto aberto no VSCode, no arquivo "index.html" que está na pasta raiz do projeto, clique com o botão direito e em "Open with Live Server"**
   
![Exemplo VSCode](https://github.com/user-attachments/assets/0f2bd07e-28d1-493c-92b5-9cbf6844eb48)


Dessa forma, o projeto será aberto no navegador e você poderá utilizar nossa plataforma para resolução dos problemas. 
Certifique-se de estar conectado a Internet para o projeto funcionar corretamente.

Com o projeto e o servidor rodando localmente, você pode fazer 15 requisições (perguntas) por minuto, podendo perguntar ao chatbot sua dúvida referente ao problema.
![Chatbot](https://github.com/user-attachments/assets/9f67b55f-71c8-482d-b012-edd2eb042246)


Além disso, é possível buscar no histórico soluções anteriores que possam se encaixar no problema, e até usar um filtro para buscar alguma específica na página de Filtros.
![pagina de historico1](https://github.com/user-attachments/assets/c9b668c0-8fbf-4c8e-b2dd-8c6f5616d17d)
![pagina de historico 2](https://github.com/user-attachments/assets/32bf9fc5-38db-4dcb-937d-22eb75cadaf0)


