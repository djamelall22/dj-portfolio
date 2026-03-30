/* ── DJAMEL AI CHAT WIDGET ──────────────────────────── */
(function () {
  const SYSTEM_PROMPT = `You are Djamel's AI assistant on his portfolio website DJAMELBUILDSTHINGS.
Djamel is a frontend developer based in Algeria who works exclusively with Western clients (France, Canada, USA, UK, etc.).

His services:
- Landing pages: $500 – $1,200
- Showcase websites (3–5 pages): $1,200 – $3,000
- Creative animated portfolios: $1,500 – $4,000
- Complex custom websites: $3,000 – $8,000+
- Pricing is always custom and depends on the project scope

His tech stack: HTML, CSS, JavaScript, React, Next.js, TypeScript, Tailwind CSS, GSAP, 3D (3ds Max), and many more.

His background: hybrid profile — 3D artist, graphic designer, then frontend developer. He thinks visually and executes technically.

Availability: immediately available for new projects.

Contact email: makdjamel.contact@gmail.com

Languages: Djamel speaks French, English, and Arabic. He can work with clients in any language.

Your behavior:
- Be warm, professional, and concise.
- Always respond in the same language the visitor uses.
- If asked about pricing, give the ranges above and mention it depends on the project.
- If someone wants to start a project or get a quote, invite them to email makdjamel.contact@gmail.com.
- Never make up services or skills Djamel doesn't have.
- Keep responses short and conversational — this is a chat, not an essay.
- You are NOT Djamel himself, you are his assistant. Refer to him in third person.`;

  /* ── Inject styles ── */
  const style = document.createElement("style");
  style.textContent = `
    #djm-chat-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      width: 52px;
      height: 52px;
      background: #fff;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      box-shadow: 0 4px 24px rgba(0,0,0,0.4);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    #djm-chat-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 32px rgba(0,0,0,0.5);
    }
    #djm-chat-btn svg { width: 22px; height: 22px; }

    #djm-chat-window {
      position: fixed;
      bottom: 96px;
      right: 32px;
      width: 340px;
      max-height: 520px;
      background: #0d0d0d;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      z-index: 9998;
      overflow: hidden;
      box-shadow: 0 8px 48px rgba(0,0,0,0.6);
      opacity: 0;
      transform: translateY(12px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      font-family: 'DM Mono', monospace;
    }
    #djm-chat-window.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    #djm-chat-header {
      padding: 14px 18px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #djm-chat-header .djm-dot {
      width: 8px; height: 8px;
      background: #fff;
      border-radius: 50%;
      animation: djm-pulse 2s ease-in-out infinite;
    }
    @keyframes djm-pulse {
      0%,100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
    #djm-chat-header span {
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
    }
    #djm-chat-header .djm-close {
      margin-left: auto;
      cursor: pointer;
      color: rgba(255,255,255,0.3);
      font-size: 18px;
      line-height: 1;
      transition: color 0.15s;
      background: none;
      border: none;
      padding: 0;
    }
    #djm-chat-header .djm-close:hover { color: #fff; }

    #djm-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }
    #djm-chat-messages::-webkit-scrollbar { width: 4px; }
    #djm-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

    .djm-msg {
      max-width: 85%;
      padding: 9px 13px;
      border-radius: 12px;
      font-size: 12px;
      line-height: 1.6;
      animation: djm-fadein 0.2s ease;
    }
    @keyframes djm-fadein {
      from { opacity: 0; transform: translateY(4px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .djm-msg.bot {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.82);
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .djm-msg.user {
      background: #fff;
      color: #0d0d0d;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
      font-family: 'Syne', sans-serif;
    }
    .djm-msg.typing {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 12px 16px;
    }
    .djm-msg.typing span {
      width: 5px; height: 5px;
      background: rgba(255,255,255,0.4);
      border-radius: 50%;
      animation: djm-bounce 1.2s ease-in-out infinite;
    }
    .djm-msg.typing span:nth-child(2) { animation-delay: 0.15s; }
    .djm-msg.typing span:nth-child(3) { animation-delay: 0.3s; }
    @keyframes djm-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-5px); }
    }

    #djm-chat-footer {
      padding: 12px;
      border-top: 1px solid rgba(255,255,255,0.07);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    #djm-chat-input {
      flex: 1;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 8px;
      padding: 8px 12px;
      color: #fff;
      font-size: 12px;
      font-family: 'DM Mono', monospace;
      outline: none;
      transition: border-color 0.2s;
      resize: none;
      height: 36px;
      line-height: 20px;
    }
    #djm-chat-input::placeholder { color: rgba(255,255,255,0.22); }
    #djm-chat-input:focus { border-color: rgba(255,255,255,0.22); }
    #djm-chat-send {
      width: 36px; height: 36px;
      background: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.15s, opacity 0.15s;
    }
    #djm-chat-send:hover { transform: scale(1.05); }
    #djm-chat-send:disabled { opacity: 0.3; cursor: default; transform: none; }
    #djm-chat-send svg { width: 15px; height: 15px; }

    @media (max-width: 480px) {
      #djm-chat-window { width: calc(100vw - 32px); right: 16px; bottom: 80px; }
      #djm-chat-btn { right: 16px; bottom: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ── HTML ── */
  const container = document.createElement("div");
  container.innerHTML = `
    <button id="djm-chat-btn" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </button>

    <div id="djm-chat-window" role="dialog" aria-label="Chat with Djamel's assistant">
      <div id="djm-chat-header">
        <div class="djm-dot"></div>
        <span>Djamel's Assistant</span>
        <button class="djm-close" aria-label="Close chat">×</button>
      </div>
      <div id="djm-chat-messages"></div>
      <div id="djm-chat-footer">
        <input id="djm-chat-input" type="text" placeholder="Ask me anything..." autocomplete="off" />
        <button id="djm-chat-send" aria-label="Send">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  /* ── State ── */
  const win = document.getElementById("djm-chat-window");
  const btn = document.getElementById("djm-chat-btn");
  const closeBtn = document.querySelector(".djm-close");
  const messages = document.getElementById("djm-chat-messages");
  const input = document.getElementById("djm-chat-input");
  const send = document.getElementById("djm-chat-send");

  let history = [];
  let isOpen = false;
  let isLoading = false;
  let greeted = false;

  /* ── Toggle ── */
  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle("open", isOpen);
    if (isOpen && !greeted) {
      greeted = true;
      setTimeout(
        () =>
          addMessage(
            "bot",
            "Hey 👋 I'm Djamel's assistant. Ask me anything about his services, pricing, or how to get in touch!",
          ),
        300,
      );
    }
    if (isOpen) input.focus();
  }

  btn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  /* ── Add message ── */
  function addMessage(role, text) {
    const el = document.createElement("div");
    el.className = `djm-msg ${role}`;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  /* ── Typing indicator ── */
  function showTyping() {
    const el = document.createElement("div");
    el.className = "djm-msg bot typing";
    el.id = "djm-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }
  function hideTyping() {
    const el = document.getElementById("djm-typing");
    if (el) el.remove();
  }

  /* ── Send message ── */
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = "";
    isLoading = true;
    send.disabled = true;

    addMessage("user", text);
    history.push({ role: "user", content: text });

    showTyping();

    try {
      // ✅ Calls Netlify Function → Gemini API (free, key stays secret)
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();
      const reply =
        data.reply || "Sorry, I couldn't get a response. Please try again.";

      hideTyping();
      addMessage("bot", reply);
      history.push({ role: "assistant", content: reply });
    } catch (err) {
      hideTyping();
      addMessage(
        "bot",
        "Connection error. Please try again or email makdjamel.contact@gmail.com directly.",
      );
    }

    isLoading = false;
    send.disabled = false;
    input.focus();
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
})();
