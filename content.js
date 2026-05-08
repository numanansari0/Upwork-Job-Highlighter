// ============================================================
// UPWORK BEST MATCH EXTENSION
// ============================================================

const STORAGE_KEY = 'upwork_bm_profile';

const DEFAULT_PROFILE = {
  skills: [], strongCategories: [], redFlags: [],
  topRated: false, jss: 0, totalEarnings: 0
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProfile(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function parseList(str) {
  return str.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
}

// ============================================================
// INJECT ISOLATED STYLES (force override dark mode)
// ============================================================
function injectStyles() {
  if (document.getElementById('up-ext-styles')) return;
  const style = document.createElement('style');
  style.id = 'up-ext-styles';
  style.textContent = `
    #up-ext-backdrop {
      position: fixed !important;
      inset: 0 !important;
      background: rgba(0,0,0,0.6) !important;
      z-index: 2147483640 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    #up-ext-backdrop {
      overflow-y: auto !important;
      align-items: flex-start !important;
      padding: 40px 20px !important;
    }
    #up-ext-panel {
      all: initial !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
      background: #ffffff !important;
      color: #111827 !important;
      border-radius: 20px !important;
      padding: 32px 36px 36px !important;
      width: 640px !important;
      max-width: 95vw !important;
      overflow: visible !important;
      box-shadow: 0 24px 64px rgba(0,0,0,0.4) !important;
      position: relative !important;
      box-sizing: border-box !important;
      display: block !important;
      margin: auto !important;
    }
    #up-ext-panel * {
      box-sizing: border-box !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
    }
    #up-ext-panel h2 {
      font-size: 22px !important;
      font-weight: 700 !important;
      color: #111827 !important;
      margin: 0 0 4px 0 !important;
      padding: 0 !important;
    }
    #up-ext-panel p.sub {
      font-size: 14px !important;
      color: #6b7280 !important;
      margin: 0 0 24px 0 !important;
    }
    #up-ext-panel label.field-label {
      display: block !important;
      font-size: 13px !important;
      font-weight: 600 !important;
      color: #374151 !important;
      margin-bottom: 7px !important;
    }
    #up-ext-panel label.field-label span {
      font-weight: 400 !important;
      color: #9ca3af !important;
    }
    #up-ext-panel textarea,
    #up-ext-panel input[type="number"],
    #up-ext-panel input[type="text"] {
      all: unset !important;
      display: block !important;
      width: 100% !important;
      background: #f9fafb !important;
      color: #111827 !important;
      border: 1.5px solid #e5e7eb !important;
      border-radius: 10px !important;
      padding: 11px 14px !important;
      font-size: 13.5px !important;
      line-height: 1.6 !important;
      resize: vertical !important;
      outline: none !important;
      -webkit-text-fill-color: #111827 !important;
      min-height: 44px !important;
    }
    #up-ext-panel textarea {
      min-height: 80px !important;
    }
    #up-ext-panel textarea:focus,
    #up-ext-panel input[type="number"]:focus {
      border-color: #16a34a !important;
      background: #fff !important;
      box-shadow: 0 0 0 3px rgba(22,163,74,0.12) !important;
    }
    #up-ext-panel textarea::placeholder,
    #up-ext-panel input::placeholder {
      color: #b0b7c3 !important;
      -webkit-text-fill-color: #b0b7c3 !important;
    }
    #up-ext-panel .hint {
      font-size: 11.5px !important;
      color: #9ca3af !important;
      margin: 5px 0 0 2px !important;
      display: block !important;
    }
    #up-ext-panel .field-row {
      margin-bottom: 20px !important;
    }
    #up-ext-panel .grid2 {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 20px !important;
      margin-bottom: 20px !important;
      align-items: start !important;
    }
    #up-ext-panel .grid2 input[type="number"] {
      -moz-appearance: textfield !important;
      appearance: textfield !important;
    }
    #up-ext-panel .grid2 input[type="number"]::-webkit-inner-spin-button,
    #up-ext-panel .grid2 input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none !important;
      display: none !important;
    }
    #up-ext-panel .check-row {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      margin-bottom: 24px !important;
      cursor: pointer !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      color: #374151 !important;
      background: #f0fdf4 !important;
      border: 1.5px solid #bbf7d0 !important;
      border-radius: 10px !important;
      padding: 14px 16px !important;
    }
    #up-ext-panel .check-row input[type="checkbox"] {
      all: unset !important;
      width: 20px !important;
      height: 20px !important;
      min-width: 20px !important;
      border: 2px solid #d1d5db !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      position: relative !important;
      flex-shrink: 0 !important;
      background: #fff !important;
      box-sizing: border-box !important;
    }
    #up-ext-panel .check-row input[type="checkbox"]:checked {
      background: #16a34a !important;
      border-color: #16a34a !important;
    }
    #up-ext-panel .check-row input[type="checkbox"]:checked::after {
      content: '' !important;
      position: absolute !important;
      left: 6px !important;
      top: 2px !important;
      width: 5px !important;
      height: 10px !important;
      border: 2px solid #fff !important;
      border-top: none !important;
      border-left: none !important;
      transform: rotate(45deg) !important;
      display: block !important;
    }
    #up-ext-panel .btn-row {
      display: flex !important;
      gap: 12px !important;
    }
    #up-ext-panel .btn-save {
      all: unset !important;
      background: #16a34a !important;
      color: #fff !important;
      border-radius: 10px !important;
      padding: 13px 28px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: inline-block !important;
      text-align: center !important;
    }
    #up-ext-panel .btn-save:hover { background: #15803d !important; }
    #up-ext-panel .btn-cancel {
      all: unset !important;
      background: #f3f4f6 !important;
      color: #374151 !important;
      border-radius: 10px !important;
      padding: 13px 28px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      display: inline-block !important;
      text-align: center !important;
    }
    #up-ext-panel .btn-cancel:hover { background: #e5e7eb !important; }
    #up-ext-panel .btn-close {
      all: unset !important;
      position: absolute !important;
      top: 20px !important;
      right: 20px !important;
      background: #f3f4f6 !important;
      color: #6b7280 !important;
      border-radius: 8px !important;
      width: 32px !important;
      height: 32px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 15px !important;
      cursor: pointer !important;
      line-height: 1 !important;
    }
    #up-ext-panel .btn-close:hover { background: #e5e7eb !important; color: #111827 !important; }
    #up-ext-panel .header-row {
      display: flex !important;
      align-items: flex-start !important;
      justify-content: space-between !important;
      margin-bottom: 24px !important;
      padding-right: 40px !important;
    }
    #up-ext-panel .divider {
      height: 1px !important;
      background: #f3f4f6 !important;
      margin: 4px 0 20px !important;
    }
  `;
  document.head.appendChild(style);
}

// ============================================================
// SETTINGS PANEL
// ============================================================
function buildSettingsPanel() {
  removePanel(); // remove existing first
  injectStyles();

  const profile = loadProfile() || DEFAULT_PROFILE;

  const backdrop = document.createElement('div');
  backdrop.id = 'up-ext-backdrop';

  const panel = document.createElement('div');
  panel.id = 'up-ext-panel';

  panel.innerHTML = `
    <button class="btn-close" id="up-ext-close-btn">✕</button>

    <div class="header-row">
      <div>
        <h2>⚙️ Best Match Setup</h2>
        <p class="sub">Configure your profile for accurate job matching on Upwork</p>
      </div>
    </div>
    <div class="divider"></div>

    <div class="field-row">
      <label class="field-label">🛠 Your Skills <span>(comma separated)</span></label>
      <textarea id="up-skills" rows="4" placeholder="php, laravel, react, vue, javascript, mysql, node, wordpress, flutter...">${profile.skills.join(', ')}</textarea>
      <span class="hint">💡 Tech keywords matched against job descriptions</span>
    </div>

    <div class="field-row">
      <label class="field-label">💼 Strong Categories <span>(comma separated)</span></label>
      <textarea id="up-cats" rows="3" placeholder="full stack, laravel, react, wordpress, mobile app, api...">${profile.strongCategories.join(', ')}</textarea>
      <span class="hint">💡 Job types where you have the most experience</span>
    </div>

    <div class="field-row">
      <label class="field-label">🚩 Red Flags — Jobs to Avoid <span>(comma separated)</span></label>
      <textarea id="up-red" rows="3" placeholder="java developer, c#, data entry, content writer, devops...">${profile.redFlags.join(', ')}</textarea>
      <span class="hint">💡 These will mark jobs as Not Best Match</span>
    </div>

    <div class="grid2">
      <div>
        <label class="field-label">📊 Job Success Score (JSS %)</label>
        <input id="up-jss" type="number" min="0" max="100" value="${profile.jss}" placeholder="e.g. 100" />
        <span class="hint">💡 Your current JSS on Upwork</span>
      </div>
      <div>
        <label class="field-label">💰 Total Earnings ($)</label>
        <input id="up-earn" type="number" min="0" value="${profile.totalEarnings}" placeholder="e.g. 10000" />
        <span class="hint">💡 Lifetime earnings on Upwork</span>
      </div>
    </div>

    <label class="check-row">
      <input id="up-toprated" type="checkbox" ${profile.topRated ? 'checked' : ''} />
      ⭐ I am Top Rated / Top Rated Plus on Upwork
    </label>

    <div class="btn-row">
      <button class="btn-save" id="up-save-btn">💾 Save & Apply</button>
      <button class="btn-cancel" id="up-cancel-btn">Cancel</button>
    </div>
  `;

  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);

  // ---- Close handlers ----
  const closePanel = () => removePanel();

  document.getElementById('up-ext-close-btn').addEventListener('click', closePanel);
  document.getElementById('up-cancel-btn').addEventListener('click', closePanel);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closePanel(); });

  // ---- Save handler ----
  document.getElementById('up-save-btn').addEventListener('click', () => {
    const p = {
      skills:           parseList(document.getElementById('up-skills').value),
      strongCategories: parseList(document.getElementById('up-cats').value),
      redFlags:         parseList(document.getElementById('up-red').value),
      jss:              parseInt(document.getElementById('up-jss').value) || 0,
      totalEarnings:    parseInt(document.getElementById('up-earn').value) || 0,
      topRated:         document.getElementById('up-toprated').checked
    };
    saveProfile(p);
    closePanel();
    refreshFab();
    resetJobs();
    processJobs();
    showToast('✅ Profile saved! Matching jobs...');
  });
}

function removePanel() {
  const el = document.getElementById('up-ext-backdrop');
  if (el) el.remove();
}

// ============================================================
// FLOATING BUTTON
// ============================================================
function addSettingsButton() {
  if (document.getElementById('up-ext-fab')) return;

  const profile = loadProfile();
  const hasProfile = profile && profile.skills.length > 0;

  // Wrapper pill button
  const btn = document.createElement('div');
  btn.id = 'up-ext-fab';
  Object.assign(btn.style, {
    position: 'fixed', bottom: '24px', right: '24px',
    display: 'flex', alignItems: 'center', gap: '8px',
    background: '#16a34a', borderRadius: '30px',
    padding: '10px 16px 10px 12px',
    cursor: 'pointer', zIndex: '2147483639',
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    fontFamily: 'system-ui, sans-serif',
    userSelect: 'none', transition: 'background 0.2s'
  });

  btn.innerHTML = `
    <span style="font-size:18px;line-height:1;">⚙️</span>
    <span style="color:#fff;font-size:13px;font-weight:600;line-height:1;">
      ${hasProfile ? 'Edit Profile' : 'Setup Matching'}
    </span>
  `;

  btn.addEventListener('mouseenter', () => btn.style.background = '#15803d');
  btn.addEventListener('mouseleave', () => btn.style.background = '#16a34a');
  btn.addEventListener('click', () => buildSettingsPanel());
  document.body.appendChild(btn);
}

// Update FAB label after save
function refreshFab() {
  const fab = document.getElementById('up-ext-fab');
  if (fab) fab.remove();
  addSettingsButton();
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '80px', right: '24px',
    background: '#111827', color: '#fff', padding: '10px 18px',
    borderRadius: '10px', fontSize: '13px', fontWeight: '600',
    zIndex: '2147483641', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transition: 'opacity 0.4s', opacity: '1',
    fontFamily: 'system-ui, sans-serif', whiteSpace: 'nowrap'
  });
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 2500);
}

// ============================================================
// SCORING ENGINE
// ============================================================
function scoreJob(article, profile) {
  const fullText = article.innerText.toLowerCase();
  let score = 0, matched = [], flags = [];

  // Skill match (cap 40)
  profile.skills.forEach(s => {
    if (s && fullText.includes(s)) { score += 4; matched.push(s); }
  });
  score = Math.min(score, 40);

  // Categories (cap 20)
  let cs = 0;
  profile.strongCategories.forEach(c => { if (c && fullText.includes(c)) cs += 5; });
  score += Math.min(cs, 20);

  // Red flags (−30 each)
  profile.redFlags.forEach(f => {
    if (f && fullText.includes(f)) { score -= 30; flags.push(f); }
  });

  // JSS bonus
  if (profile.jss >= 95) score += 15;
  else if (profile.jss >= 90) score += 10;
  else if (profile.jss >= 80) score += 5;

  // Top Rated bonus
  if (profile.topRated) score += 8;

  // Earnings trust
  if (profile.totalEarnings >= 10000) score += 5;
  else if (profile.totalEarnings >= 1000) score += 2;

  // Proposals
  const pEl = article.querySelector('[data-test="proposals-tier"]');
  if (pEl) {
    const pt = pEl.innerText.toLowerCase();
    if (pt.includes('fewer than 5') || pt.includes('5 to 10')) score += 10;
    else if (pt.includes('10 to 15') || pt.includes('15 to 20')) score += 5;
    else if (pt.includes('50+')) score -= 10;
  }

  // Budget
  const bEl = article.querySelector('[data-test="is-fixed-price"]');
  if (bEl) {
    const amt = parseFloat(bEl.innerText.replace(/[^0-9.]/g, ''));
    if (!isNaN(amt) && amt < 50) score -= 15;
    else if (!isNaN(amt) && amt >= 500) score += 5;
  }

  return { score, matched: [...new Set(matched)], flags };
}

function getTier(score) {
  if (score >= 55) return 'best';
  if (score >= 35) return 'possible';
  return 'notmatch';
}

const TIER_CONFIG = {
  best:     { label: '✅ Best Match',     titleColor: '#15803d', cardBg: 'rgba(22,163,74,0.07)',  badgeBg: '#dcfce7', badgeBorder: '#16a34a', badgeColor: '#15803d' },
  possible: { label: '🟡 Possible Match', titleColor: '#92400e', cardBg: 'rgba(234,179,8,0.07)',  badgeBg: '#fef9c3', badgeBorder: '#ca8a04', badgeColor: '#92400e' },
  notmatch: { label: '🔴 Not Best Match', titleColor: '#991b1b', cardBg: 'rgba(220,38,38,0.07)',  badgeBg: '#fee2e2', badgeBorder: '#dc2626', badgeColor: '#991b1b' }
};

// ============================================================
// PROCESS JOBS
// ============================================================
function processJobs() {
  const profile = loadProfile();

  if (!profile || profile.skills.length === 0) {
    if (!document.getElementById('up-ext-backdrop')) buildSettingsPanel();
    return;
  }

  // Remove highlight-color styling
  document.querySelectorAll('.highlight-color').forEach(el => {
    el.style.color = 'inherit';
    el.style.fontWeight = 'inherit';
  });

  document.querySelectorAll('article[data-test="JobTile"]').forEach(article => {
    if (article.dataset.upExtDone === '1') return;
    article.dataset.upExtDone = '1';

    const { score, matched, flags } = scoreJob(article, profile);
    const tier   = getTier(score);
    const config = TIER_CONFIG[tier];

    // Card background
    article.style.setProperty('background-color', config.cardBg, 'important');

    // Title
    const titleEl = article.querySelector('h2.job-tile-title a');
    if (titleEl) {
      titleEl.style.setProperty('color', config.titleColor, 'important');
      titleEl.style.fontWeight = '600';

      if (!article.querySelector('.up-ext-badge')) {
        const badge = document.createElement('span');
        badge.className = 'up-ext-badge';
        badge.title = tier === 'notmatch'
          ? `Score: ${score}${flags.length ? ' | Flags: ' + flags.slice(0,3).join(', ') : ''}`
          : `Score: ${score} | Skills: ${matched.slice(0,5).join(', ')}`;
        badge.textContent = config.label;
        Object.assign(badge.style, {
          display: 'inline-block', marginLeft: '8px',
          padding: '2px 10px', borderRadius: '20px',
          fontSize: '11px', fontWeight: '600',
          background: config.badgeBg,
          border: `1px solid ${config.badgeBorder}`,
          color: config.badgeColor,
          verticalAlign: 'middle', cursor: 'help',
          whiteSpace: 'nowrap', lineHeight: '20px'
        });
        titleEl.insertAdjacentElement('afterend', badge);
      }
    }

    // Location — USA green only
    article.querySelectorAll('[data-test="location"]').forEach(el => {
      const t = el.innerText.toLowerCase();
      if (t.includes('united states') || t.includes(' usa') || t === 'usa') {
        el.style.setProperty('color', '#16a34a', 'important');
        el.style.fontWeight = '700';
      } else {
        el.style.color = '';
        el.style.fontWeight = '';
      }
    });
  });
}

function resetJobs() {
  document.querySelectorAll('article[data-test="JobTile"]').forEach(a => {
    delete a.dataset.upExtDone;
    a.style.backgroundColor = '';
    const badge = a.querySelector('.up-ext-badge');
    if (badge) badge.remove();
    const t = a.querySelector('h2.job-tile-title a');
    if (t) { t.style.color = ''; t.style.fontWeight = ''; }
    a.querySelectorAll('[data-test="location"]').forEach(el => {
      el.style.color = ''; el.style.fontWeight = '';
    });
  });
}

// ============================================================
// INIT
// ============================================================
injectStyles();
addSettingsButton();
processJobs();

const observer = new MutationObserver(() => {
  addSettingsButton();
  processJobs();
});
observer.observe(document.body, { childList: true, subtree: true });