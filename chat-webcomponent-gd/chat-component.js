import { getBotResponse } from './eliza.js';

class ChatInterface extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          margin: 0;
          padding: 2rem;
          display: flex;
          justify-content: center;
        }

        .chat-container {
          display: flex;
          flex-direction: column;
          width: 400px;
          height: 600px;
          border: 1px solid #ccc;
          border-radius: 8px;
          overflow: hidden;
        }

        title-text {    
          background: #648eef;
          color: white;
          height: 150px;
        }

        title-text h1 {
          padding-top: 1rem;
          font-size: 20px;
          display: flex;
          justify-content: center;
        }

        title-text p {
          display: flex;
          font-size: 13px;
          justify-content: center;
        }

        .messages {
          padding: 1rem;
          height: 600px;
          width: 400px;
          overflow-y: scroll;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: #f0f0f0;
        }

        .message {
          max-width: 75%;
          padding: 0.6rem 1rem;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .message.bot {
          background: #c3c0c3e8;
          align-self: flex-end;
          margin-right: auto;
          border-radius: 15px 15px 15px 4px;
        }

        .message.user {
          background: #648eef;
          color: white;
          align-self: flex-start;
          margin-left: auto;
          border-radius: 15px 15px 4px 15px;
        }

        .input-form {
          display: flex;
          padding: 0.5em;
          background: #fff;
          border-top: 1px solid #ccc;
        }

        .input-form input {
          flex: 1;
          padding: 0.5em;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 15px;
        }

        .input-form button {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
        }

        .input-form button:hover {
          background-color: #0056b3;
        }
      </style>

      <div class="chat-container">
        <title-text>
          <h1>Chat Assistant</h1>
          <p>Web Component: Progressive Enhancement</p>
        </title-text>

        <div class="messages"></div>

        <form class="input-form">
          <input type="text" placeholder="Type a message..." autocomplete="off" />
          <button type="submit">Send</button>
        </form>
      </div>
    `;

    this.setupEventListeners();
    this.addMessage('Bot: Hello! How can I help you today?', false);
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector('.input-form');
    const input = this.shadowRoot.querySelector('input');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = input.value.trim();
      if (message === '') return;

      this.addMessage('User: ' + message, true);
      input.value = '';

      const response = getBotResponse(message);
      this.addMessage('Bot: ' + response, false);
    });
  }

  addMessage(text, isUser) {
    const messagesContainer = this.shadowRoot.querySelector('.messages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${isUser ? 'user' : 'bot'}`;
    messageEl.textContent = text;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  getBotResponse(message) {
    return getBotResponse(message);
  }
}

customElements.define('chat-interface', ChatInterface);