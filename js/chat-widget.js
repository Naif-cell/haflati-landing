/**
 * Haflati Chat Widget — FAQ Chatbot
 * Pure client-side, no API needed, no dependencies.
 */

(function () {
  'use strict';

  /* ============================================================
     0. KNOWLEDGE BASE (AR + EN)
     ============================================================ */
  var qa = [
    {
      id: 'what',
      qAr: 'ما هي حفلتي؟',
      qEn: 'What is Haflati?',
      aAr: 'حفلتي هي منصة سعودية تربط بين منظمي المناسبات ومزودي الخدمات. تقدر تلاقي وتحجز كل اللي تحتاجه لمناسبتك في مكان واحد — من قاعات وتصوير وكيك وورود وأكثر!',
      aEn: 'Haflati is a Saudi marketplace that connects event planners with service providers. Find and book everything you need for your event in one place — venues, photography, cakes, flowers, and more!',
      keywords: ['حفلتي', 'haflati', 'ماهي', 'what', 'about'],
    },
    {
      id: 'launch',
      qAr: 'متى سيطلق التطبيق؟',
      qEn: 'When does the app launch?',
      aAr: 'نعمل بجد على تطوير التطبيق حالياً! متوقع الإطلاق في النصف الثاني من 2026 إن شاء الله. سجّل في قائمة الانتظار عشان تكون أول من يعرف!',
      aEn: 'We are working hard on development! The app is expected to launch in the second half of 2026 insha\'Allah. Join the waitlist to be the first to know!',
      keywords: ['متى', 'إطلاق', 'launch', 'when', 'موعد', 'date'],
    },
    {
      id: 'free',
      qAr: 'هل التطبيق مجاني؟',
      qEn: 'Is the app free?',
      aAr: 'نعم! التطبيق مجاني للمستخدمين. تقدر تتصفح وتقارن مزودي الخدمات بدون أي رسوم. فيه باقة مميزة اختيارية بـ 29 ريال/شهر تعطيك مميزات إضافية مثل أولوية الحجز والعروض الحصرية.',
      aEn: 'Yes! The app is free for users. Browse and compare service providers at no cost. There\'s an optional premium plan at 29 SAR/month with priority booking and exclusive deals.',
      keywords: ['مجاني', 'free', 'سعر', 'price', 'cost', 'تكلفة', 'كم', 'رسوم', 'fees'],
    },
    {
      id: 'vendor',
      qAr: 'كيف أسجل كمزود خدمات؟',
      qEn: 'How to register as a vendor?',
      aAr: 'أهلاً بك! الانضمام مجاني تماماً — بدون رسوم شهرية. نأخذ فقط 5% عمولة عند كل حجز ناجح. سجّل في نموذج مزودي الخدمات في الأسفل وبنتواصل معك.',
      aEn: 'Welcome! Joining is completely free — no monthly fees. We only take a 5% commission on successful bookings. Fill out the vendor form below and we\'ll reach out.',
      keywords: ['مزود', 'vendor', 'تسجيل', 'register', 'أسجل', 'signup', 'انضم', 'join'],
    },
    {
      id: 'city',
      qAr: 'هل حفلتي متاح في مدينتي؟',
      qEn: 'Is Haflati available in my city?',
      aAr: 'بنطلق أول شي في الرياض وجدة والدمام. بعدها بنتوسع لباقي مدن المملكة. سجّل في قائمة الانتظار وحدد مدينتك عشان نبلغك أول ما نوصلك!',
      aEn: 'We\'re launching first in Riyadh, Jeddah, and Dammam, then expanding to other Saudi cities. Join the waitlist and mention your city so we can notify you!',
      keywords: ['مدينة', 'city', 'متاح', 'available', 'الرياض', 'riyadh', 'جدة', 'jeddah', 'دمام'],
    },
    {
      id: 'contact',
      qAr: 'كيف أتواصل معكم؟',
      qEn: 'How to contact you?',
      aAr: 'تقدر تتواصل معنا عبر:\n• واتساب: <a href="https://wa.me/966XXXXXXXXX" target="_blank" rel="noopener">اضغط هنا</a>\n• البريد: info@haflati.sa\n• تويتر: <a href="https://twitter.com/HaflatiApp" target="_blank" rel="noopener">@HaflatiApp</a>',
      aEn: 'You can reach us via:\n• WhatsApp: <a href="https://wa.me/966XXXXXXXXX" target="_blank" rel="noopener">Click here</a>\n• Email: info@haflati.sa\n• Twitter: <a href="https://twitter.com/HaflatiApp" target="_blank" rel="noopener">@HaflatiApp</a>',
      keywords: ['تواصل', 'contact', 'ايميل', 'email', 'واتساب', 'whatsapp', 'تويتر', 'twitter'],
    },
    {
      id: 'events',
      qAr: 'ما أنواع المناسبات المدعومة؟',
      qEn: 'What event types are supported?',
      aAr: 'حفلتي يدعم 5 أنواع من المناسبات:\n🎊 حفلات زواج\n🎂 أعياد ميلاد\n🎓 حفلات تخرج\n👶 استقبال مواليد\n🏢 فعاليات شركات\nوبنضيف أنواع أكثر بعد الإطلاق!',
      aEn: 'Haflati supports 5 event types:\n- Weddings\n- Birthdays\n- Graduations\n- Baby Showers\n- Corporate Events\nMore types coming after launch!',
      keywords: ['أنواع', 'مناسبات', 'events', 'types', 'زواج', 'wedding', 'عيد', 'birthday', 'تخرج'],
    },
    {
      id: 'download',
      qAr: 'هل يوجد تطبيق للتحميل؟',
      qEn: 'Is there an app to download?',
      aAr: 'التطبيق تحت التطوير حالياً وبيكون متاح على Google Play قريباً إن شاء الله. سجّل في قائمة الانتظار وبنرسلك رابط التحميل أول ما ينزل!',
      aEn: 'The app is under development and will be available on Google Play soon insha\'Allah. Join the waitlist and we\'ll send you the download link on launch day!',
      keywords: ['تحميل', 'download', 'تطبيق', 'app', 'قوقل', 'google', 'play', 'store', 'متجر'],
    },
  ];

  /** Fallback when no keyword match. */
  var fallbackAr =
    'شكراً لسؤالك! سيتواصل معك فريقنا قريباً. يمكنك أيضاً مراسلتنا على <a href="https://wa.me/966XXXXXXXXX" target="_blank" rel="noopener">واتساب</a>';
  var fallbackEn =
    'Thanks for your question! Our team will get back to you soon. You can also message us on <a href="https://wa.me/966XXXXXXXXX" target="_blank" rel="noopener">WhatsApp</a>';

  var welcomeAr = 'مرحباً! 👋 كيف أقدر أساعدك؟';
  var welcomeEn = 'Hello! 👋 How can I help you?';

  /* ============================================================
     1. STATE
     ============================================================ */
  var isOpen = false;
  var hasGreeted = false;

  /* ============================================================
     2. HELPERS
     ============================================================ */

  /** Get current page language. */
  function getLang() {
    return document.documentElement.getAttribute('lang') || 'ar';
  }

  function isArabic() {
    return getLang() === 'ar';
  }

  /** Get question/answer text based on language. */
  function q(item) {
    return isArabic() ? item.qAr : item.qEn;
  }
  function a(item) {
    return isArabic() ? item.aAr : item.aEn;
  }

  /** Create a DOM element with optional class and text. */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  /** Auto-scroll messages area to bottom. */
  function scrollToBottom() {
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  /* ============================================================
     3. BUILD THE WIDGET DOM
     ============================================================ */
  var chatBtn = document.querySelector('.chat-widget-btn');
  var chatPanel = document.querySelector('.chat-panel');
  var messagesEl = null;
  var inputEl = null;
  var sendBtn = null;

  // If the HTML doesn't already have the panel, build it.
  if (!chatPanel) {
    chatPanel = el('div', 'chat-panel');
    chatPanel.setAttribute('role', 'dialog');
    chatPanel.setAttribute('aria-label', 'Haflati support chat');

    chatPanel.innerHTML =
      '<div class="chat-header">' +
      '  <span class="chat-title" data-ar="دعم حفلتي" data-en="Haflati Support">دعم حفلتي</span>' +
      '  <button class="chat-close" aria-label="Close chat">&times;</button>' +
      '</div>' +
      '<div class="chat-messages" role="log" aria-live="polite"></div>' +
      '<div class="chat-input-area">' +
      '  <input type="text" class="chat-input" placeholder="اكتب سؤالك..." aria-label="Type your question" />' +
      '  <button class="chat-send" aria-label="Send">' +
      '    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>' +
      '  </button>' +
      '</div>';

    document.body.appendChild(chatPanel);
  }

  // If the HTML doesn't already have the toggle button, build it.
  if (!chatBtn) {
    chatBtn = el('button', 'chat-widget-btn');
    chatBtn.setAttribute('aria-label', 'Open support chat');
    chatBtn.innerHTML =
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';
    document.body.appendChild(chatBtn);
  }

  messagesEl = chatPanel.querySelector('.chat-messages');
  inputEl = chatPanel.querySelector('.chat-input');
  sendBtn = chatPanel.querySelector('.chat-send');
  var closeBtn = chatPanel.querySelector('.chat-close');

  /* ============================================================
     4. INJECT WIDGET STYLES
     ============================================================ */
  if (!document.getElementById('chat-widget-style')) {
    var style = document.createElement('style');
    style.id = 'chat-widget-style';
    style.textContent =
      /* Toggle button */
      '.chat-widget-btn{position:fixed;bottom:24px;right:24px;z-index:9998;width:60px;height:60px;border-radius:50%;' +
      'background:linear-gradient(135deg,#2D1B4E,#C8A86E);color:#fff;border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.3);' +
      'display:flex;align-items:center;justify-content:center;transition:transform .3s,box-shadow .3s}' +
      '.chat-widget-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(0,0,0,.4)}' +

      /* Panel */
      '.chat-panel{position:fixed;bottom:96px;right:24px;z-index:9999;width:380px;max-width:calc(100vw - 32px);' +
      'max-height:520px;border-radius:16px;background:#fff;box-shadow:0 12px 40px rgba(0,0,0,.2);display:flex;' +
      'flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px) scale(.95);pointer-events:none;' +
      'transition:opacity .3s,transform .3s}' +
      '.chat-panel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +

      /* Header */
      '.chat-header{background:linear-gradient(135deg,#2D1B4E,#3D2B5E);color:#fff;padding:16px 20px;display:flex;' +
      'align-items:center;justify-content:space-between}' +
      '.chat-title{font-weight:700;font-size:16px}' +
      '.chat-close{background:none;border:none;color:#fff;font-size:24px;cursor:pointer;padding:0 4px;line-height:1}' +

      /* Messages */
      '.chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:280px}' +

      /* Bubbles */
      '.chat-bubble{max-width:85%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.6;word-wrap:break-word;white-space:pre-wrap}' +
      '.chat-bubble a{color:#C8A86E;text-decoration:underline}' +
      '.chat-bubble.bot{background:#f0ece4;color:#2D1B4E;align-self:flex-start;border-bottom-left-radius:4px}' +
      '.chat-bubble.user{background:linear-gradient(135deg,#2D1B4E,#3D2B5E);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}' +

      /* RTL adjustments */
      '[dir="rtl"] .chat-bubble.user{align-self:flex-start;border-bottom-left-radius:4px;border-bottom-right-radius:12px}' +
      '[dir="rtl"] .chat-bubble.bot{align-self:flex-end;border-bottom-right-radius:4px;border-bottom-left-radius:12px}' +

      /* Quick question buttons */
      '.chat-quick-btns{display:flex;flex-wrap:wrap;gap:6px;margin-top:4px}' +
      '.chat-quick-btn{background:#f5f0e8;border:1px solid #ddd3c0;color:#2D1B4E;padding:6px 12px;border-radius:20px;' +
      'font-size:13px;cursor:pointer;transition:background .2s,border-color .2s}' +
      '.chat-quick-btn:hover{background:#e8dcc8;border-color:#C8A86E}' +

      /* Typing indicator */
      '.typing-indicator{display:flex;gap:4px;padding:10px 14px;align-self:flex-start}' +
      '[dir="rtl"] .typing-indicator{align-self:flex-end}' +
      '.typing-dot{width:8px;height:8px;background:#bbb;border-radius:50%;animation:typing-bounce .6s infinite alternate}' +
      '.typing-dot:nth-child(2){animation-delay:.2s}' +
      '.typing-dot:nth-child(3){animation-delay:.4s}' +
      '@keyframes typing-bounce{to{transform:translateY(-6px);background:#888}}' +

      /* Input area */
      '.chat-input-area{display:flex;gap:8px;padding:12px 16px;border-top:1px solid #eee}' +
      '.chat-input{flex:1;border:1px solid #ddd;border-radius:20px;padding:8px 16px;font-size:14px;outline:none;' +
      'font-family:inherit;transition:border-color .2s}' +
      '.chat-input:focus{border-color:#C8A86E}' +
      '.chat-send{width:36px;height:36px;border-radius:50%;background:#C8A86E;color:#fff;border:none;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;transition:background .2s;flex-shrink:0}' +
      '.chat-send:hover{background:#b89a5e}' +

      /* Mobile */
      '@media(max-width:480px){.chat-panel{bottom:0;right:0;left:0;width:100%;max-width:100%;max-height:100vh;' +
      'border-radius:16px 16px 0 0}.chat-widget-btn{bottom:16px;right:16px}}';

    document.head.appendChild(style);
  }

  /* ============================================================
     5. OPEN / CLOSE LOGIC
     ============================================================ */
  function openChat() {
    isOpen = true;
    chatPanel.classList.add('open');
    localStorage.setItem('haflati-chat-open', 'true');

    if (!hasGreeted) {
      hasGreeted = true;
      addBotMessage(isArabic() ? welcomeAr : welcomeEn);
      showQuickButtons();
    }

    // Focus the input for keyboard users.
    setTimeout(function () {
      if (inputEl) inputEl.focus();
    }, 350);
  }

  function closeChat() {
    isOpen = false;
    chatPanel.classList.remove('open');
    localStorage.setItem('haflati-chat-open', 'false');
  }

  chatBtn.addEventListener('click', function () {
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeChat);
  }

  /* ============================================================
     6. MESSAGE RENDERING
     ============================================================ */

  /** Add a bot message bubble. Supports HTML in text. */
  function addBotMessage(text) {
    var bubble = el('div', 'chat-bubble bot');
    bubble.innerHTML = text;
    messagesEl.appendChild(bubble);
    scrollToBottom();
  }

  /** Add a user message bubble. Plain text only. */
  function addUserMessage(text) {
    var bubble = el('div', 'chat-bubble user');
    bubble.textContent = text;
    messagesEl.appendChild(bubble);
    scrollToBottom();
  }

  /** Show typing indicator and return the element for later removal. */
  function showTyping() {
    var indicator = el('div', 'typing-indicator');
    indicator.innerHTML =
      '<span class="typing-dot"></span>' +
      '<span class="typing-dot"></span>' +
      '<span class="typing-dot"></span>';
    messagesEl.appendChild(indicator);
    scrollToBottom();
    return indicator;
  }

  /** Show the quick-select question buttons. */
  function showQuickButtons() {
    var container = el('div', 'chat-quick-btns');

    qa.forEach(function (item) {
      var btn = el('button', 'chat-quick-btn', q(item));
      btn.addEventListener('click', function () {
        handleQuestion(item);
      });
      container.appendChild(btn);
    });

    messagesEl.appendChild(container);
    scrollToBottom();
  }

  /** Handle a selected question: show user bubble, typing, then answer. */
  function handleQuestion(item) {
    // Remove any existing quick-button groups.
    removeQuickButtons();

    addUserMessage(q(item));

    // Typing indicator after short delay.
    setTimeout(function () {
      var typing = showTyping();

      // Answer after 1500ms.
      setTimeout(function () {
        typing.remove();
        addBotMessage(a(item));
        showQuickButtons();
      }, 1000);
    }, 500);
  }

  /** Remove all quick-button groups from the messages area. */
  function removeQuickButtons() {
    messagesEl.querySelectorAll('.chat-quick-btns').forEach(function (group) {
      group.remove();
    });
  }

  /* ============================================================
     7. FREE TEXT INPUT & KEYWORD MATCHING
     ============================================================ */
  function findAnswer(text) {
    var lower = text.toLowerCase().trim();

    for (var i = 0; i < qa.length; i++) {
      var item = qa[i];
      for (var k = 0; k < item.keywords.length; k++) {
        if (lower.indexOf(item.keywords[k].toLowerCase()) !== -1) {
          return item;
        }
      }
    }

    return null;
  }

  function handleFreeText() {
    var text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    removeQuickButtons();
    addUserMessage(text);

    var match = findAnswer(text);

    setTimeout(function () {
      var typing = showTyping();

      setTimeout(function () {
        typing.remove();

        if (match) {
          addBotMessage(a(match));
        } else {
          addBotMessage(isArabic() ? fallbackAr : fallbackEn);
        }

        showQuickButtons();
      }, 1000);
    }, 500);
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', handleFreeText);
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleFreeText();
      }
    });
  }

  /* ============================================================
     8. LANGUAGE CHANGE LISTENER
     ============================================================ */
  window.addEventListener('haflati-lang-change', function () {
    // Update the chat header.
    var title = chatPanel.querySelector('.chat-title');
    if (title) {
      title.textContent = isArabic()
        ? title.getAttribute('data-ar') || 'دعم حفلتي'
        : title.getAttribute('data-en') || 'Haflati Support';
    }

    // Update input placeholder.
    if (inputEl) {
      inputEl.placeholder = isArabic() ? 'اكتب سؤالك...' : 'Type your question...';
    }
  });

  /* ============================================================
     9. RESTORE STATE ON PAGE LOAD
     ============================================================ */
  if (localStorage.getItem('haflati-chat-open') === 'true') {
    openChat();
  }
})();
