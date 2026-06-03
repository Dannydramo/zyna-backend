/**
 * Zyna Chat Widget
 * Embeddable chat widget for customer support
 * Usage: Set window.ZynaChatConfig then include this script
 */

(function () {
  const config = window.ZynaChatConfig || {};
  const widgetId = config.widgetId;
  const apiUrl = config.apiUrl || 'http://localhost:4000';
  const brandColor = config.brandColor || '#2d4a36';
  const businessName = config.businessName || 'Support Team';

  if (!widgetId) {
    console.error('Zyna Chat Widget: widgetId not configured');
    return;
  }

  // Generate or retrieve visitor ID
  const STORAGE_PREFIX = `zyna_chat_${widgetId}`;
  let visitorId =
    localStorage.getItem(`${STORAGE_PREFIX}_visitorId`) ||
    `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem(`${STORAGE_PREFIX}_visitorId`, visitorId);

  // Session tracking
  let sessionId = localStorage.getItem(`${STORAGE_PREFIX}_sessionId`);
  let messages = [];
  let messageIds = new Set(); // Track IDs to prevent duplicates
  let pollingInterval = null;
  let isOpen = false;
  let lastMessageTimestamp = null;
  let greetingShown = false;

  // Create DOM elements
  function createWidget() {
    // Container
    const container = document.createElement('div');
    container.id = `zyna-chat-widget-${widgetId}`;
    container.style.cssText = `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 380px;
      height: 600px;
      display: none;
      flex-direction: column;
      background: white;
      border-radius: 12px;
      box-shadow: 0 5px 40px rgba(0,0,0,0.16);
      z-index: 999999;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background-color: ${brandColor};
      color: white;
      padding: 16px;
      border-radius: 12px 12px 0 0;
      font-weight: 600;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    header.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; flex: 1;">
        <span>Chat with us</span>
        <button id="zyna-new-chat-btn" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          font-size: 11px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
          hover: background rgba(255,255,255,0.3);
        ">New Chat</button>
      </div>
      <button id="zyna-close-btn" style="
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
      ">&times;</button>
    `;

    // Messages area
    const messagesArea = document.createElement('div');
    messagesArea.id = `zyna-messages-${widgetId}`;
    messagesArea.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f5f5f5;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      background: white;
      border-radius: 0 0 12px 12px;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('textarea');
    input.id = `zyna-input-${widgetId}`;
    input.placeholder = 'Type a message...';
    input.style.cssText = `
      flex: 1;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: inherit;
      font-size: 14px;
      resize: none;
      height: 40px;
      max-height: 100px;
      outline: none;
    `;
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = '→';
    sendBtn.style.cssText = `
      background-color: ${brandColor};
      color: white;
      border: none;
      border-radius: 6px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 18px;
      font-weight: bold;
    `;
    sendBtn.addEventListener('click', sendMessage);

    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);

    container.appendChild(header);
    container.appendChild(messagesArea);
    container.appendChild(inputArea);

    // Button (minimized)
    const button = document.createElement('button');
    button.id = `zyna-chat-btn-${widgetId}`;
    button.innerHTML = '💬';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: ${brandColor};
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      z-index: 999998;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    button.addEventListener('click', toggleChat);

    document.body.appendChild(button);
    document.body.appendChild(container);

    // Close button handler
    document.getElementById('zyna-close-btn').addEventListener('click', toggleChat);

    // New chat button handler
    document.getElementById('zyna-new-chat-btn').addEventListener('click', startNewChat);

    return { container, button, input, messagesArea };
  }

  const dom = createWidget();

  function toggleChat() {
    isOpen = !isOpen;
    dom.container.style.display = isOpen ? 'flex' : 'none';
    dom.button.style.display = isOpen ? 'none' : 'flex';

    if (isOpen) {
      dom.input.focus();
      showGreeting();
      startPolling();
    } else {
      stopPolling();
    }
  }

  function startNewChat() {
    // Clear session data
    sessionId = null;
    messages = [];
    messageIds.clear();
    lastMessageTimestamp = null;
    greetingShown = false;

    // Clear localStorage
    localStorage.removeItem(`${STORAGE_PREFIX}_sessionId`);

    // Clear message display
    dom.messagesArea.innerHTML = '';

    // Show greeting
    showGreeting();
    dom.input.focus();

    // Start new session
    startSession();
  }

  function showGreeting() {
    if (greetingShown) return;
    greetingShown = true;

    // Add greeting message with typing animation
    addSystemMessage(`Hi there! 👋 I'm ${businessName}. How can I help you today?`, true);
  }

  function addSystemMessage(text, showTyping = false) {
    const msg = {
      id: `system-${Date.now()}`,
      body: text,
      direction: 'INBOUND',
      isSystem: true,
    };

    messageIds.add(msg.id);

    if (showTyping) {
      const typingEl = renderTypingMessage();
      setTimeout(() => {
        // Remove typing indicator
        if (typingEl && typingEl.parentNode) {
          typingEl.parentNode.removeChild(typingEl);
        }
        // Add message to array and render
        messages.push(msg);
        renderMessage(msg);
        scrollToBottom();
      }, 1500);
    } else {
      messages.push(msg);
      renderMessage(msg);
      scrollToBottom();
    }
  }

  async function startSession() {
    if (sessionId) return; // Already started

    try {
      const response = await fetch(`${apiUrl}/api/v1/chat/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgetId, visitorId }),
      });

      if (response.ok) {
        const data = await response.json();
        sessionId = data.sessionId;
        localStorage.setItem(`${STORAGE_PREFIX}_sessionId`, sessionId);
      }
    } catch (err) {
      console.error('Zyna Chat: Failed to start session', err);
    }
  }

  async function sendMessage() {
    const text = dom.input.value.trim();
    if (!text) return;

    dom.input.value = '';
    await startSession();

    if (!sessionId) {
      alert('Unable to start chat session. Please try again.');
      return;
    }

    // Add optimistic message
    addMessage(text, 'OUTBOUND');

    try {
      const response = await fetch(
        `${apiUrl}/api/v1/chat/sessions/${sessionId}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            widgetId,
            text,
            visitorEmail: undefined,
          }),
        }
      );

      if (!response.ok) {
        console.error('Failed to send message');
      }

      // Prompt for email on first message
      if (messages.filter((m) => m.direction === 'OUTBOUND').length === 1) {
        promptForEmail();
      }
    } catch (err) {
      console.error('Zyna Chat: Failed to send message', err);
    }
  }

  function promptForEmail() {
    const email = prompt('What is your email address? (optional)');
    if (email && email.trim()) {
      updateSessionEmail(email.trim());
    }
  }

  async function updateSessionEmail(email) {
    if (!sessionId) return;

    try {
      await fetch(`${apiUrl}/api/v1/chat/sessions/${sessionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ widgetId, email }),
      });
    } catch (err) {
      console.error('Zyna Chat: Failed to update email', err);
    }
  }

  function addMessage(body, direction) {
    const msg = {
      id: `local-${Date.now()}-${Math.random()}`,
      body,
      direction,
      createdAt: new Date().toISOString(),
    };

    if (!messageIds.has(msg.id)) {
      messages.push(msg);
      messageIds.add(msg.id);
      renderMessage(msg);
      scrollToBottom();
    }
  }

  function renderTypingMessage() {
    const messagesArea = dom.messagesArea;
    const typingEl = document.createElement('div');
    typingEl.style.cssText = `
      padding: 10px 12px;
      border-radius: 8px;
      background-color: #e5e5e5;
      color: #333;
      align-self: flex-start;
      font-size: 14px;
      font-style: italic;
    `;
    typingEl.textContent = 'Support is typing...';
    messagesArea.appendChild(typingEl);
    return typingEl;
  }

  function renderMessage(msg) {
    const messagesArea = dom.messagesArea;
    const messageEl = document.createElement('div');
    // Customer messages: authorType=CUSTOMER or optimistic messages without authorType yet
    // Agent/AI messages: authorType=AGENT or authorType=AI
    const isCustomerMsg =
      msg.authorType === 'CUSTOMER' ||
      (msg.authorType === undefined && msg.direction === 'OUTBOUND');
    messageEl.style.cssText = `
      padding: 10px 12px;
      border-radius: 8px;
      max-width: 80%;
      word-wrap: break-word;
      font-size: 14px;
      ${
        isCustomerMsg
          ? `
        background-color: ${brandColor};
        color: white;
        align-self: flex-end;
        margin-left: auto;
      `
          : `
        background-color: #e5e5e5;
        color: #333;
        align-self: flex-start;
      `
      }
    `;

    // Parse markdown links and render as HTML
    const htmlContent = msg.body
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[(.*?)\]\((article:\/\/(.*?))\)/g, (match, text, url, articleId) => {
        // Convert article:// links to proper knowledge base URLs
        const knowledgeUrl = config.knowledgeBaseUrl || 'http://localhost:3003';
        return `<a href="${knowledgeUrl}/articles/${articleId}" target="_blank" style="color: ${isCustomerMsg ? 'white' : '#0066cc'}; text-decoration: underline; cursor: pointer;">${text}</a>`;
      })
      .replace(/\[(.*?)\]\(((?!article:\/\/).*?)\)/g, `<a href="$2" target="_blank" style="color: ${isCustomerMsg ? 'white' : '#0066cc'}; text-decoration: underline; cursor: pointer;">$1</a>`)
      .replace(/\n/g, '<br>');

    messageEl.innerHTML = htmlContent;
    messagesArea.appendChild(messageEl);
  }

  function scrollToBottom() {
    const messagesArea = dom.messagesArea;
    setTimeout(() => {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }, 0);
  }

  async function pollMessages() {
    if (!sessionId) return;

    try {
      const url = new URL(`${apiUrl}/api/v1/chat/sessions/${sessionId}/messages`);
      url.searchParams.set('widgetId', widgetId);
      if (lastMessageTimestamp) {
        url.searchParams.set('since', lastMessageTimestamp);
      }

      const response = await fetch(url.toString());

      if (response.ok) {
        const data = await response.json();
        const newMessages = data.data || [];

        newMessages.forEach((msg) => {
          if (!messageIds.has(msg.id)) {
            messages.push(msg);
            messageIds.add(msg.id);
            renderMessage(msg);
            lastMessageTimestamp = msg.createdAt;
          }
        });

        if (newMessages.length > 0) {
          scrollToBottom();
        }
      }
    } catch (err) {
      console.error('Zyna Chat: Polling error', err);
    }
  }

  function startPolling() {
    if (pollingInterval) return; // Already polling
    pollMessages(); // Immediate poll
    pollingInterval = setInterval(pollMessages, 3000);
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }

  // Initialize
  if (sessionId) {
    // Session already exists, load messages
    startSession().then(() => {
      showGreeting();
      pollMessages();
    });
  }
})();
