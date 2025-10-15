import { getBotResponse } from './eliza.js';

const DEBUG = false;
const log = (msg) => { if (DEBUG) console.log(msg); };

let chatWindow, messageBox, sendBtn;

function addMessageToChat(message, speaker) {
  const msgEl = document.createElement('p');
  msgEl.classList.add(speaker);
  msgEl.textContent = `${speaker}: ${message}`;

  chatWindow.appendChild(msgEl);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function processMessage(message) {
  const response = getBotResponse(message);
  addMessageToChat(response, 'Bot');
}

function sendMessage() {
  const message = messageBox.value.trim();
  if (!message) return;

  addMessageToChat(message, 'User');
  processMessage(message);

  messageBox.value = '';
  messageBox.focus();
}

function init() {
  log('Initializing chat interface');

  chatWindow = document.getElementById('chatWindow');
  messageBox = document.getElementById('messageBox');
  sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sendMessage();
  });

  messageBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
}

window.addEventListener('DOMContentLoaded', init);