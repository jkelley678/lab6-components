import { getBotResponse } from './eliza.js';

const DEBUG = false;
const log = (msg) => { if (DEBUG) console.log(msg); };

let chatWindow, messageBox, sendBtn;
/**
 * Adds a message to the chat window with the specified speaker
 * @param {string} message - The message text to add
 * @param {string} speaker - The speaker identifier ('User' or 'Bot')
 */
function addMessageToChat(message, speaker) {
  const msgEl = document.createElement('p');
  msgEl.classList.add(speaker);
  msgEl.textContent = `${speaker}: ${message}`;

  chatWindow.appendChild(msgEl);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}
/**
 * Processes a user message and generates a bot response
 * @param {string} message - The user's message to process
 */
function processMessage(message) {
  const response = getBotResponse(message);
  addMessageToChat(response, 'Bot');
}
/**
 * Handles sending a message from the input box to the chat
 * Retrieves the message, displays it, and clears the input
 */
function sendMessage() {
  const message = messageBox.value.trim();
  if (!message) return;

  addMessageToChat(message, 'User');
  processMessage(message);

  messageBox.value = '';
  messageBox.focus();
}
/**
 * Initializes the chat interface by setting up DOM elements
 * and event listeners for the send button and message box
 */
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