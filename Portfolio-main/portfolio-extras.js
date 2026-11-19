(() => {
  // The intro is created only when JavaScript runs, so it cannot block a static page.
  const loader = document.createElement('div');
  loader.className = 'workflow-loader';
  loader.innerHTML = `<div class="loader-content"><div class="loader-brand">rg<span style="color:#8eaaff">.</span></div><p class="eyebrow">OPERATIONS, IN MOTION</p><h2>Connecting the dots.</h2><div class="loader-flow" aria-hidden="true"><div class="loader-step active"><b>↳</b><span>Trigger</span></div><i class="loader-wire"></i><div class="loader-step"><b>⌘</b><span>Connect</span></div><i class="loader-wire"></i><div class="loader-step"><b>✓</b><span>Ready</span></div></div><p role="status">Starting your visit…</p><button class="loader-skip" type="button">Skip intro ↗</button></div>`;
  document.body.append(loader);
  const steps = [...loader.querySelectorAll('.loader-step')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dismissed = false;
  function finishIntro() {
    if (dismissed) return;
    dismissed = true;
    const hadFocus = loader.contains(document.activeElement);
    loader.classList.add('is-done');
    loader.inert = true;
    if (hadFocus) document.querySelector('.brand')?.focus();
    setTimeout(() => loader.remove(), 400);
  }
  loader.querySelector('button').addEventListener('click', finishIntro);
  loader.addEventListener('keydown', event => { if (event.key === 'Escape') finishIntro(); });
  setTimeout(() => {
    steps[0].classList.add('complete');
    steps[1].classList.add('active');
    loader.querySelector('[role="status"]').textContent = 'Connecting people, process, and data…';
  }, 450);
  setTimeout(() => {
    steps[1].classList.add('complete');
    steps[2].classList.add('active', 'complete');
    loader.querySelector('[role="status"]').textContent = 'All connected. Welcome to my portfolio.';
  }, 1000);
  setTimeout(finishIntro, reduceMotion ? 0 : 1550);

  const widget = document.createElement('div');
  widget.innerHTML = `<section id="portfolio-chat" class="portfolio-chat" aria-labelledby="chat-title" hidden><header class="chat-header"><div class="chat-heading"><img class="chat-robot" src="baby-robot.svg" alt="" width="38" height="42"><div><h2 id="chat-title">Rej’s portfolio assistant</h2><p>A little curiosity. A lot of clarity.</p></div></div><button type="button" class="chat-close" aria-label="Close chat">×</button></header><div class="chat-messages" role="log" aria-live="polite" aria-label="Conversation" tabindex="0"></div><div class="chat-options"><button type="button" data-topic="Services">Services</button><button type="button" data-topic="Experience">Experience</button><button type="button" data-topic="Projects">Projects</button><button type="button" data-topic="Contact">Contact Rej</button></div><form class="chat-form"><input aria-label="Your question" placeholder="Ask about my work…" maxlength="300" autocomplete="off" required><button type="submit">Send ↗</button></form><p class="chat-note">Automated portfolio guide. Messages stay in this page and aren’t sent to Rej.</p></section><button type="button" class="chat-launcher" aria-controls="portfolio-chat" aria-expanded="false" aria-label="Open portfolio chat"><img class="chat-robot" src="baby-robot.svg" alt="" width="43" height="47"></button>`;
  document.body.append(widget);
  const panel = widget.querySelector('.portfolio-chat');
  const launcher = widget.querySelector('.chat-launcher');
  const input = widget.querySelector('input');
  const log = widget.querySelector('.chat-messages');
  function addMessage(text, user = false, link) {
    const message = document.createElement('p');
    message.className = `chat-message${user ? ' user' : ''}`;
    message.textContent = text;
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      message.append(document.createElement('br'), anchor);
      if (link.href.startsWith('#')) anchor.addEventListener('click', () => setOpen(false));
    }
    log.append(message);
    while (log.children.length > 60) log.firstElementChild.remove();
    log.scrollTop = log.scrollHeight;
  }
  function setOpen(open) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close portfolio chat' : 'Open portfolio chat');
    (open ? input : launcher).focus();
  }
  launcher.addEventListener('click', () => setOpen(panel.hidden));
  widget.querySelector('.chat-close').addEventListener('click', () => setOpen(false));
  panel.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
  function answer(question) {
    const q = question.toLowerCase();
    if (/\b(contact|email|hire|hiring|reach|book|call|talk)\b/.test(q)) return ['You can reach Rej at Rejxgodinez27@gmail.com to discuss your project or the support you need.', {href:'mailto:Rejxgodinez27@gmail.com',label:'Email Rej ↗'}];
    if (/\b(price|pricing|rate|rates|cost|available|availability|schedule)\b/.test(q)) return ['Rates and current availability are confirmed directly with Rej. Share your scope and preferred schedule by email.', {href:'mailto:Rejxgodinez27@gmail.com',label:'Discuss your needs ↗'}];
    if (/\b(project|projects|workflow|workflows|n8n|automation|automations)\b/.test(q)) return ['Since 2026, Rej has worked on n8n, Make, and Zapier prototypes, lead-intake and scheduling workflow designs, Messenger/Groq exploration, responsive portfolios, and AI-assisted content. Exploratory integrations are not claimed as production deployments. Explore the project cards for each status.', {href:'#projects',label:'Explore the Project Lab ↗'}];
    if (/\b(experience|background|career|years|exl|wfm|telstra|accenture|underwriting|insurance|experian|concentrix)\b/.test(q)) return ['Rej worked as an Executive Assistant / Underwriting Assistant in Commercial Truck Insurance (Oct 2024–Sep 2026), WFM Scheduler — Real-Time Analyst at EXL (Feb 2024–Sep 2026), and Workforce Management — Real-Time Analyst at Accenture for Verizon Wireline B2B (May 2020–Dec 2023). Earlier customer service roles include Teleperformance / Telstra (May 2019–Nov 2019), TeleTech / Experian (Aug 2018–Mar 2019), and Concentrix — Health Insurance Innovations (Sep 2016–Dec 2017).', {href:'#experience',label:'View experience ↗'}];
    if (/\b(service|services|support|offer|help|skills|do)\b/.test(q)) return ['Rej supports executive inboxes and RingCentral calls/SMS, commercial trucking insurance submissions and pre-binding requirements, real-time workforce analysis, and stakeholder reporting. Independent work includes AI workflow prototypes, responsive websites, and reviewed digital content.', {href:'#services',label:'Explore services ↗'}];
    if (/\b(tools|excel|software|google|sentry|cypress|bass|rocklake|chatgpt)\b/.test(q)) return ['Rej works with Outlook, RingCentral, Microsoft 365, MS Teams, Slack, Google Workspace, Google Sheets, Sentry IMS, Cypress, BASS Underwriters, Rocklake, and Adobe Acrobat. His toolkit also includes n8n, Make, Zapier, APIs, webhooks, JSON, HTML/CSS/JavaScript, Codex, Claude Code, Excel, Power BI, Tableau, Verint, Genesys, GCXI, Oracle CX, and Citrix.'];
    if (/\b(where|location|timezone|time zone|based|philippines)\b/.test(q)) return ['Rej is based in the Philippines (GMT+8). Contact him directly to discuss schedule overlap.'];
    if (/\b(hello|hi|hey|thanks|thank)\b/.test(q)) return ['Hello! I can help you explore Rej’s services, experience, projects, and contact details. What would you like to know?'];
    if (/\b(who|about|name)\b/.test(q)) return ['Regolo “Rej” Godinez III provides executive support, insurance operations, workforce management, and AI-assisted digital solutions from the Philippines.', {href:'#about',label:'Meet Rej ↗'}];
    return ['I can answer common questions about this portfolio. Try services, experience, projects, or contact. For other questions, Rej can help by email.', {href:'mailto:Rejxgodinez27@gmail.com',label:'Email Rej ↗'}];
  }
  function send(question) {
    const text = question.trim();
    if (!text) return;
    addMessage(text, true);
    const [reply, link] = answer(text);
    addMessage(reply, false, link);
    input.value = '';
  }
  widget.querySelector('form').addEventListener('submit', event => { event.preventDefault(); send(input.value); });
  widget.querySelectorAll('[data-topic]').forEach(button => button.addEventListener('click', () => send(button.dataset.topic)));
  addMessage('Hi! I’m Rej’s automated portfolio guide. Ask me about services, experience, or the workflow projects, or choose a topic below.');
})();

