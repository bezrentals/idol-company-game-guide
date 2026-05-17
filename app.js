// ============================================================
// Apex Girls Guide — app.js  (Full rebuild with calculators)
// ============================================================

// === THEME TOGGLE ===
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  function setIcon(btn, theme) {
    btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
  if (t) { setIcon(t, d); t.addEventListener('click', () => { d = d === 'dark' ? 'light' : 'dark'; r.setAttribute('data-theme', d); setIcon(t, d); }); }
})();

// === TABBED NAVIGATION ===
function switchTab(targetId) {
  // Hide all panels
  document.querySelectorAll('.tab-section').forEach(s => {
    s.classList.remove('active');
  });
  // Deactivate all nav buttons
  document.querySelectorAll('nav[role="tablist"] .nav-link').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  // Show target panel
  const panel = document.getElementById(targetId);
  if (panel) panel.classList.add('active');
  // Activate matching nav button
  const btn = document.querySelector(`nav[role="tablist"] [data-tab="${targetId}"]`);
  if (btn) { btn.classList.add('active'); btn.setAttribute('aria-selected', 'true'); }
  // Scroll to top of content area
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // If switching to CEO, make sure calculator is rendered
  if (targetId === 'ceo') renderCEOCalculator(currentCEOType);
  // If switching to abroad, refresh optimizer
  if (targetId === 'abroad') renderAbroadOptimizer();
}

// Wire nav tab buttons
document.querySelectorAll('nav[role="tablist"] [data-tab]').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Mobile nav toggle
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
  // Close mobile nav when a tab is picked
  document.querySelectorAll('nav[role="tablist"] [data-tab]').forEach(b =>
    b.addEventListener('click', () => nav?.classList.remove('open'))
  );
})();

// Start on Girls tab
switchTab('girls');

// ============================================================
// DATA
// ============================================================

// --- CEO EVENT DATA (all 3 types, all 6 days) ---
// Each item: { label, pts, defaultQty, unitLabel }
// pts = points per unit; defaultQty = example/known quantity (0 = unknown)
const CEO_EVENTS = {
  ultimate: {
    name: 'Ultimate CEO',
    grandTotal: 1347298000,
    days: [
      {
        day: 1, name: 'Vehicle', knownTotal: 310400000,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Car Parts', pts: 500, defaultQty: 0, unit: 'parts' },
          { label: 'Promote Cars', pts: 2500, defaultQty: 0, unit: 'cars' },
          { label: 'Novice Spark Plugs', pts: 80, defaultQty: 0, unit: 'plugs' },
          { label: 'Enhanced Spark Plugs', pts: 10000, defaultQty: 0, unit: 'plugs' },
          { label: 'Elite Spark Plugs', pts: 1250000, defaultQty: 0, unit: 'plugs' },
          { label: 'Novice Ignition Coils', pts: 800, defaultQty: 0, unit: 'coils' },
          { label: 'Enhanced Ignition Coils', pts: 100000, defaultQty: 0, unit: 'coils' },
          { label: 'Elite Ignition Coils', pts: 12500000, defaultQty: 0, unit: 'coils' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel (per gold)', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
      {
        day: 2, name: 'Headquarters', knownTotal: 288325000,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Glass', pts: 500, defaultQty: 0, unit: 'glass' },
          { label: 'Basic Wood', pts: 400, defaultQty: 0, unit: 'wood' },
          { label: 'High-Quality Wood', pts: 50000, defaultQty: 0, unit: 'HQ wood' },
          { label: 'Premium Wood', pts: 6250000, defaultQty: 0, unit: 'prem wood' },
          { label: 'Basic Steel Ingots', pts: 4000, defaultQty: 0, unit: 'ingots' },
          { label: 'High-Quality Steel', pts: 500000, defaultQty: 0, unit: 'HQ steel' },
          { label: 'Premium Steel', pts: 62500000, defaultQty: 0, unit: 'prem steel' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel (per gold)', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
      {
        day: 3, name: 'Collectibles', knownTotal: 417573000,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Purple Gems', pts: 500, defaultQty: 0, unit: 'gems' },
          { label: 'Gold Gems', pts: 1000, defaultQty: 0, unit: 'gems' },
          { label: 'Basic Sandstone', pts: 400, defaultQty: 0, unit: 'sandstone' },
          { label: 'High-Quality Sandstone', pts: 50000, defaultQty: 0, unit: 'HQ sandstone' },
          { label: 'Premium Sandstone', pts: 6250000, defaultQty: 0, unit: 'prem sandstone' },
          { label: 'Basic Tile', pts: 4000, defaultQty: 0, unit: 'tile' },
          { label: 'High-Quality Tile', pts: 500000, defaultQty: 0, unit: 'HQ tile' },
          { label: 'Premium Tile', pts: 62500000, defaultQty: 0, unit: 'prem tile' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel (per gold)', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
      {
        day: 4, name: 'Villa', knownTotal: 331000000,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Drones', pts: 500, defaultQty: 0, unit: 'drones' },
          { label: 'Design Drafts', pts: 5000, defaultQty: 0, unit: 'drafts' },
          { label: 'Basic CEO\'s Coin', pts: 400, defaultQty: 0, unit: 'coins' },
          { label: 'High-Quality CEO\'s Coin', pts: 50000, defaultQty: 0, unit: 'HQ coins' },
          { label: 'Premium CEO\'s Coin', pts: 6250000, defaultQty: 0, unit: 'prem coins' },
          { label: 'Basic Key', pts: 4000, defaultQty: 0, unit: 'keys' },
          { label: 'High-Quality Key', pts: 500000, defaultQty: 0, unit: 'HQ keys' },
          { label: 'Premium Key', pts: 62500000, defaultQty: 0, unit: 'prem keys' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel (per gold)', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
      {
        day: 5, name: 'Artist', knownTotal: null,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Asset Coins', pts: 5, defaultQty: 0, unit: 'coins' },
          { label: 'SR Promote Cards', pts: 1500, defaultQty: 0, unit: 'cards' },
          { label: 'SSR Promote Cards', pts: 4000, defaultQty: 0, unit: 'cards' },
          { label: 'SR Photos', pts: 4000, defaultQty: 0, unit: 'photos' },
          { label: 'SSR Photos', pts: 25000, defaultQty: 0, unit: 'photos' },
          { label: 'Interview', pts: 60000, defaultQty: 0, unit: 'interviews' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Every 24 EXP', pts: 1, defaultQty: 0, unit: 'EXP' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
      {
        day: 6, name: 'Battle', knownTotal: null,
        items: [
          { label: 'Slot Machine pull', pts: 37500, defaultQty: 0, unit: 'pull' },
          { label: 'Acquire Fans w/ Singles', pts: 12, defaultQty: 0, unit: 'fans' },
          { label: 'Defeat Enemy Fans', pts: 12, defaultQty: 0, unit: 'fans' },
          { label: 'Blueprint', pts: 500, defaultQty: 0, unit: 'BPs' },
          { label: 'Demos', pts: 60000, defaultQty: 0, unit: 'demos' },
          { label: 'Gold Bars', pts: 1, defaultQty: 0, unit: 'bars' },
          { label: 'Record Singles', pts: 50000, defaultQty: 0, unit: 'singles' },
          { label: 'Every 24 EXP', pts: 1, defaultQty: 0, unit: 'EXP' },
          { label: 'Concert', pts: 10000, defaultQty: 0, unit: 'concerts' },
          { label: 'Stadium', pts: 40000, defaultQty: 0, unit: 'stadiums' },
          { label: 'Gold Earned in Hotel', pts: 8, defaultQty: 0, unit: 'gold' },
        ]
      },
    ]
  },
  svs: {
    name: 'SvS CEO',
    grandTotal: 1867539417,
    days: [
      {
        day: 1, name: 'Vehicle', knownTotal: null,
        items: [
          { label: 'Car Parts', pts: 500, defaultQty: 0, unit: 'parts' },
          { label: 'Promote Cars', pts: 2500, defaultQty: 0, unit: 'cars' },
          { label: 'Novice Spark Plugs', pts: 2000, defaultQty: 0, unit: 'plugs' },
          { label: 'Enhanced Spark Plugs', pts: 250000, defaultQty: 0, unit: 'plugs' },
          { label: 'Elite Spark Plugs', pts: 31000000, defaultQty: 0, unit: 'plugs' },
          { label: 'Novice Ignition Coils', pts: 20000, defaultQty: 0, unit: 'coils' },
          { label: 'Enhanced Ignition Coils', pts: 3000000, defaultQty: 0, unit: 'coils' },
          { label: 'Elite Ignition Coils', pts: 313000000, defaultQty: 0, unit: 'coils' },
          { label: 'Dispatch SSR Truck x1', pts: 100000, defaultQty: 0, unit: 'dispatch' },
          { label: 'Purchase Packs (per diamond)', pts: 100, defaultQty: 0, unit: 'diamonds' },
        ]
      },
      {
        day: 2, name: 'Headquarters', knownTotal: 38021000,
        items: [
          { label: 'Glass', pts: 500, defaultQty: 0, unit: 'glass' },
          { label: 'Basic Wood', pts: 400, defaultQty: 0, unit: 'wood' },
          { label: 'High-Quality Wood', pts: 50000, defaultQty: 0, unit: 'HQ wood' },
          { label: 'Basic Steel Ingots', pts: 4000, defaultQty: 0, unit: 'ingots' },
          { label: 'High-Quality Steel', pts: 500000, defaultQty: 0, unit: 'HQ steel' },
          { label: 'Dispatch SSR Truck x1', pts: 100000, defaultQty: 0, unit: 'dispatch' },
          { label: 'Purchase Pack per Diamond', pts: 100, defaultQty: 0, unit: 'diamonds' },
        ]
      },
      {
        day: 3, name: 'Collectibles', knownTotal: 272185000,
        items: [
          { label: 'Purple Gems', pts: 500, defaultQty: 0, unit: 'gems' },
          { label: 'Gold Gems', pts: 1000, defaultQty: 0, unit: 'gems' },
          { label: 'Basic Sandstone', pts: 2000, defaultQty: 0, unit: 'sandstone' },
          { label: 'High-Quality Sandstone', pts: 250000, defaultQty: 0, unit: 'HQ sandstone' },
          { label: 'Basic Tile', pts: 20000, defaultQty: 0, unit: 'tile' },
          { label: 'High-Quality Tile', pts: 3000000, defaultQty: 0, unit: 'HQ tile' },
          { label: 'Dispatch SSR Truck x1', pts: 100000, defaultQty: 0, unit: 'dispatch' },
        ]
      },
      {
        day: 4, name: 'Villa', knownTotal: 265283000,
        items: [
          { label: 'Drones', pts: 500, defaultQty: 0, unit: 'drones' },
          { label: 'Design Drafts', pts: 5000, defaultQty: 0, unit: 'drafts' },
          { label: 'Basic CEO\'s Coin', pts: 400, defaultQty: 0, unit: 'coins' },
          { label: 'Basic Key', pts: 4000, defaultQty: 0, unit: 'keys' },
          { label: 'High-Quality Key', pts: 500000, defaultQty: 0, unit: 'HQ keys' },
          { label: 'Dispatch SSR Truck x1', pts: 100000, defaultQty: 0, unit: 'dispatch' },
        ]
      },
      {
        day: 5, name: 'Artist', knownTotal: 1212370417,
        items: [
          { label: 'Asset Coins', pts: 5, defaultQty: 0, unit: 'coins' },
          { label: 'SSR Promote Cards', pts: 4000, defaultQty: 0, unit: 'cards' },
          { label: 'SR Photos', pts: 4000, defaultQty: 0, unit: 'photos' },
          { label: 'SSR Photos', pts: 25000, defaultQty: 0, unit: 'photos' },
          { label: 'Interview', pts: 60000, defaultQty: 0, unit: 'interviews' },
          { label: 'Every 24 EXP (per EXP)', pts: 1, defaultQty: 0, unit: 'EXP' },
        ]
      },
      {
        day: 6, name: 'Battle', knownTotal: 79680000,
        items: [
          { label: 'Acquire Fans w/ Singles', pts: 12, defaultQty: 0, unit: 'fans' },
          { label: 'Defeat Enemy Fans', pts: 12, defaultQty: 0, unit: 'fans' },
          { label: 'Blueprint', pts: 500, defaultQty: 0, unit: 'BPs' },
          { label: 'Demos', pts: 60000, defaultQty: 0, unit: 'demos' },
        ]
      },
    ]
  },
  warmup: {
    name: 'Warm Up CEO',
    grandTotal: 2967731300,
    days: [
      {
        day: '1–2', name: 'Development', knownTotal: 520773960,
        items: [
          { label: 'Car Parts', pts: 500, defaultQty: 0, unit: 'parts' },
          { label: 'Promote Cars', pts: 2500, defaultQty: 0, unit: 'cars' },
          { label: 'Novice Spark Plugs', pts: 80, defaultQty: 0, unit: 'plugs' },
          { label: 'Enhanced Spark Plugs', pts: 10000, defaultQty: 0, unit: 'plugs' },
          { label: 'Novice Ignition Coils', pts: 800, defaultQty: 0, unit: 'coils' },
          { label: 'Enhanced Ignition Coils', pts: 250000, defaultQty: 0, unit: 'coils' },
          { label: 'Glass', pts: 500, defaultQty: 0, unit: 'glass' },
          { label: 'Basic Wood', pts: 400, defaultQty: 0, unit: 'wood' },
          { label: 'High-Quality Wood', pts: 50000, defaultQty: 0, unit: 'HQ wood' },
          { label: 'Basic Steel Ingots', pts: 4000, defaultQty: 0, unit: 'ingots' },
          { label: 'High-Quality Steel', pts: 500000, defaultQty: 0, unit: 'HQ steel' },
        ]
      },
      {
        day: '3–4', name: 'Innovation', knownTotal: 764038000,
        items: [
          { label: 'Purple Gems', pts: 500, defaultQty: 0, unit: 'gems' },
          { label: 'Gold Gems', pts: 1000, defaultQty: 0, unit: 'gems' },
          { label: 'Basic Sandstone', pts: 400, defaultQty: 0, unit: 'sandstone' },
          { label: 'High-Quality Sandstone', pts: 50000, defaultQty: 0, unit: 'HQ sandstone' },
          { label: 'Basic Tile', pts: 4000, defaultQty: 0, unit: 'tile' },
          { label: 'High-Quality Tile', pts: 500000, defaultQty: 0, unit: 'HQ tile' },
          { label: 'Drones', pts: 500, defaultQty: 0, unit: 'drones' },
          { label: 'Design Drafts', pts: 5000, defaultQty: 0, unit: 'drafts' },
          { label: 'Basic CEO\'s Coin', pts: 400, defaultQty: 0, unit: 'coins' },
          { label: 'Basic Key', pts: 4000, defaultQty: 0, unit: 'keys' },
        ]
      },
      {
        day: '5–6', name: 'Promotion', knownTotal: 1682919340,
        items: [
          { label: 'Asset Coins', pts: 5, defaultQty: 0, unit: 'coins' },
          { label: 'SR Promote Cards', pts: 1500, defaultQty: 0, unit: 'cards' },
          { label: 'SSR Promote Cards', pts: 4000, defaultQty: 0, unit: 'cards' },
          { label: 'SR Photos', pts: 4000, defaultQty: 0, unit: 'photos' },
          { label: 'SSR Photos', pts: 25000, defaultQty: 0, unit: 'photos' },
          { label: 'Interview', pts: 60000, defaultQty: 0, unit: 'interviews' },
          { label: 'Demos', pts: 60000, defaultQty: 0, unit: 'demos' },
        ]
      },
    ]
  }
};

// ============================================================
// CEO PLANNER — builds all 3 calculators
// ============================================================

let currentCEOType = 'ultimate';

function renderCEOCalculator(type) {
  currentCEOType = type;
  const event = CEO_EVENTS[type];
  const container = document.getElementById('ceoCalcContainer');
  if (!container) return;

  container.innerHTML = `
    <!-- TOOL TABS -->
    <div class="section-tabs" role="tablist" aria-label="CEO Calculator Tools" style="margin-bottom: var(--space-6);">
      <button class="tab-btn active" role="tab" data-tool="estimator" aria-selected="true">Score Estimator</button>
      <button class="tab-btn" role="tab" data-tool="goal" aria-selected="false">Goal Planner</button>
      <button class="tab-btn" role="tab" data-tool="efficiency" aria-selected="false">Day Efficiency</button>
    </div>

    <!-- ESTIMATOR PANEL -->
    <div id="tool-estimator" class="tool-panel">
      <div class="callout warning" style="margin-bottom: var(--space-5);">
        <strong>Score Estimator:</strong> Enter how many of each resource you have. Your projected score per day updates live. Assume 10–18% efficiency loss on your final total.
      </div>
      ${event.days.map((day, di) => `
        <div class="day-calc-card" style="margin-bottom: var(--space-5);">
          <div class="day-calc-header">
            <div>
              <span class="day-calc-title">Day ${day.day} — ${day.name}</span>
              ${day.knownTotal ? `<span class="day-calc-ref">Reference total: ${day.knownTotal.toLocaleString()}</span>` : ''}
            </div>
            <div class="day-calc-score" id="dayScore-${di}">0</div>
          </div>
          <div class="day-calc-items">
            ${day.items.map((item, ii) => `
              <div class="calc-item-row">
                <label class="calc-item-label" for="est-${di}-${ii}">
                  <span class="calc-item-name">${item.label}</span>
                  <span class="calc-item-pts">${item.pts.toLocaleString()} pts/unit</span>
                </label>
                <input 
                  type="number" 
                  class="calc-number-input" 
                  id="est-${di}-${ii}" 
                  data-day="${di}" 
                  data-item="${ii}" 
                  data-pts="${item.pts}"
                  value="${item.defaultQty}"
                  min="0"
                  placeholder="0"
                  aria-label="Quantity of ${item.label}"
                />
                <span class="calc-item-score" id="itemScore-${di}-${ii}">${(item.pts * item.defaultQty).toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
      <div class="grand-total-card">
        <div class="grand-total-inner">
          <span class="grand-total-label">Your Estimated Grand Total</span>
          <span class="grand-total-value" id="grandTotalEst">0</span>
        </div>
        <div class="grand-total-inner" style="margin-top: var(--space-3);">
          <span class="grand-total-label" style="color: var(--color-text-muted);">After 10% efficiency loss</span>
          <span class="grand-total-value" id="grandTotal90" style="color: var(--color-warning); font-size: var(--text-lg);">0</span>
        </div>
        <div class="grand-total-inner">
          <span class="grand-total-label" style="color: var(--color-text-muted);">After 18% efficiency loss</span>
          <span class="grand-total-value" id="grandTotal82" style="color: var(--color-text-muted); font-size: var(--text-lg);">0</span>
        </div>
        ${event.grandTotal ? `<p style="font-size: var(--text-xs); color: var(--color-text-faint); margin-top: var(--space-3);">Community reference grand total: ${event.grandTotal.toLocaleString()}</p>` : ''}
      </div>
    </div>

    <!-- GOAL PLANNER PANEL -->
    <div id="tool-goal" class="tool-panel" style="display:none;">
      <div class="callout success" style="margin-bottom: var(--space-5);">
        <strong>Goal Planner:</strong> Pick a confirmed milestone target below or type your own, then select a day to see exactly what you'd need to stockpile to hit it.
      </div>

      ${type === 'ultimate' ? `
      <!-- ULTIMATE CEO CONFIRMED MILESTONES -->
      <div class="milestone-block" style="margin-bottom: var(--space-6);">
        <div class="milestone-block-title">Confirmed Ultimate CEO Targets <span class="milestone-source">(community-verified)</span></div>

        <div class="milestone-tier-label">Daily Score Milestones — hit these each day for rewards</div>
        <div class="milestone-row">
          <button class="milestone-btn" data-target="400000">400K <span class="milestone-reward">Daily Reward Tier 1</span></button>
          <button class="milestone-btn" data-target="1500000">1.5M <span class="milestone-reward">Daily Reward Tier 2</span></button>
          <button class="milestone-btn milestone-btn--hot" data-target="4000000">4M <span class="milestone-reward">Daily Reward Tier 3 (max)</span></button>
        </div>

        <div class="milestone-tier-label" style="margin-top: var(--space-4);">Server Leaderboard — points needed to rank</div>
        <div class="milestone-row">
          <button class="milestone-btn milestone-btn--gold" data-target="24000000">24M <span class="milestone-reward">Minimum to appear on server leaderboard</span></button>
        </div>

        <div class="milestone-tier-label" style="margin-top: var(--space-4);">Overall Ranking Prizes — total across all 6 days</div>
        <div class="milestone-prizes">
          <div class="milestone-prize-row">
            <span class="milestone-rank rank-top20">💠 Top 20</span>
            <span class="milestone-prize-text">Exclusive SSR Girl (Nova SSR + 6,000 Photos) — <em>cannot be obtained any other way</em></span>
          </div>
          <div class="milestone-prize-row">
            <span class="milestone-rank rank-top30">🏅 Top 30</span>
            <span class="milestone-prize-text">Same exclusive SSR Girl + additional bonus items</span>
          </div>
          <div class="milestone-prize-row" style="opacity:0.6;">
            <span class="milestone-rank">Ranks 4–10, 11–25, 26–50, 51–100</span>
            <span class="milestone-prize-text">Tier structure confirmed — specific prizes not yet documented publicly</span>
          </div>
        </div>
        <p style="font-size:var(--text-xs);color:var(--color-text-faint);margin-top:var(--space-3);">Source: community guides & YouTube (Apr–Jun 2025). Exact rewards per daily milestone tier not publicly documented — structure confirmed. Rewards for overall ranks 4–100 not published.</p>
      </div>
      ` : ''}

      ${type === 'warmup' ? `
      <!-- WARM-UP CEO CONFIRMED MILESTONES -->
      <div class="milestone-block" style="margin-bottom: var(--space-6);">
        <div class="milestone-block-title">Confirmed Warm-Up CEO Stage Milestones <span class="milestone-source">(community-verified)</span></div>
        <div class="milestone-tier-label">Hit these per stage (Development · Innovation · Promotion) — same thresholds apply to each</div>
        <div class="milestone-prizes" style="margin-top: var(--space-3);">
          <div class="milestone-prize-row">
            <button class="milestone-btn" data-target="500000" style="min-width:90px;">500K</button>
            <span class="milestone-prize-text">100 Blueprint Points</span>
          </div>
          <div class="milestone-prize-row">
            <button class="milestone-btn" data-target="2000000" style="min-width:90px;">2M</button>
            <span class="milestone-prize-text">200 Blueprint Points · 200 SR Collection Gems</span>
          </div>
          <div class="milestone-prize-row">
            <button class="milestone-btn milestone-btn--hot" data-target="4000000" style="min-width:90px;">4M</button>
            <span class="milestone-prize-text">300 Vehicle Parts · 300 Blueprint Points · 300 SR Gems · <strong>1 Air Ticket</strong></span>
          </div>
          <div class="milestone-prize-row">
            <button class="milestone-btn milestone-btn--gold" data-target="8000000" style="min-width:90px;">8M</button>
            <span class="milestone-prize-text"><strong>1 Air Ticket</strong> · 500 SSR Collection Gems · 150 SSR Promote Cards · 150 Vehicle Advance Drawings</span>
          </div>
        </div>
        <p style="font-size:var(--text-xs);color:var(--color-text-faint);margin-top:var(--space-3);">Air Tickets at 4M and 8M are required to travel to the cross-server Adventure Abroad map — hit 8M to collect both. Source: commonsensegamer.com (Apr 2026).</p>
      </div>
      ` : ''}

      <div class="calc-section">
        <div class="calc-row" style="margin-bottom: var(--space-4);">
          <label class="calc-label" for="goalDay">Select Day</label>
          <select class="filter-select" id="goalDay">
            ${event.days.map((d, i) => `<option value="${i}">Day ${d.day} — ${d.name}</option>`).join('')}
          </select>
          <label class="calc-label" for="goalTarget" style="margin-left: var(--space-4);">Target Score</label>
          <input type="number" class="calc-input" id="goalTarget" value="100000000" min="0" style="width: 180px;" />
          <button class="btn-primary" id="calcGoalBtn">Calculate</button>
        </div>
        <div id="goalResult"></div>
      </div>
    </div>

    <!-- EFFICIENCY PANEL -->
    <div id="tool-efficiency" class="tool-panel" style="display:none;">
      <div class="callout" style="margin-bottom: var(--space-5);">
        <strong>Day Efficiency:</strong> Points per single unit of each resource, ranked highest to lowest. Use this to decide where to spend first.
      </div>
      ${event.days.map(day => `
        <div style="margin-bottom: var(--space-6);">
          <h3 class="day-calc-title" style="margin-bottom: var(--space-3);">Day ${day.day} — ${day.name}</h3>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th class='hide-mobile'>Rank</th><th>Resource</th><th>Pts / Unit</th><th>Tier</th></tr></thead>
              <tbody>
                ${[...day.items].sort((a,b) => b.pts - a.pts).map((item, i) => {
                  const tier = item.pts >= 1000000 ? 'elite' : item.pts >= 10000 ? 'high' : item.pts >= 1000 ? 'mid' : 'low';
                  const tierLabel = { elite: '🔥 Elite', high: '⚡ High', mid: '✓ Mid', low: '· Low' }[tier];
                  const tierColor = { elite: 'var(--color-gold)', high: 'var(--color-primary)', mid: 'var(--color-cyan)', low: 'var(--color-text-faint)' }[tier];
                  return `<tr>
                    <td style="color: var(--color-text-muted); font-weight: 700;">#${i+1}</td>
                    <td>${item.label}</td>
                    <td class="num" style="color: var(--color-text); font-weight: 600;">${item.pts.toLocaleString()}</td>
                    <td><span style="color: ${tierColor}; font-weight: 700; font-size: var(--text-xs);">${tierLabel}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Wire up tool tabs
  container.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('[data-tool]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      container.querySelectorAll('.tool-panel').forEach(p => p.style.display = 'none');
      const panel = container.querySelector('#tool-' + btn.dataset.tool);
      if (panel) panel.style.display = 'block';
    });
  });

  // Wire up estimator live-update
  function updateEstimator() {
    let grand = 0;
    event.days.forEach((day, di) => {
      let dayTotal = 0;
      day.items.forEach((item, ii) => {
        const input = container.querySelector(`#est-${di}-${ii}`);
        const qty = parseInt(input?.value) || 0;
        const score = qty * item.pts;
        dayTotal += score;
        const scoreEl = container.querySelector(`#itemScore-${di}-${ii}`);
        if (scoreEl) scoreEl.textContent = score.toLocaleString();
      });
      grand += dayTotal;
      const dayScoreEl = container.querySelector(`#dayScore-${di}`);
      if (dayScoreEl) dayScoreEl.textContent = dayTotal.toLocaleString();
    });
    const grandEl = container.querySelector('#grandTotalEst');
    const grand90 = container.querySelector('#grandTotal90');
    const grand82 = container.querySelector('#grandTotal82');
    if (grandEl) grandEl.textContent = grand.toLocaleString();
    if (grand90) grand90.textContent = Math.floor(grand * 0.9).toLocaleString();
    if (grand82) grand82.textContent = Math.floor(grand * 0.82).toLocaleString();
  }

  container.querySelectorAll('.calc-number-input').forEach(input => {
    input.addEventListener('input', updateEstimator);
  });
  updateEstimator();

  // Wire up goal planner
  // Milestone button quick-fill
  container.querySelectorAll('.milestone-btn[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = container.querySelector('#goalTarget');
      if (input) {
        input.value = btn.dataset.target;
        input.focus();
        // highlight to confirm
        btn.style.outline = '2px solid var(--color-gold)';
        setTimeout(() => btn.style.outline = '', 800);
      }
    });
  });

  container.querySelector('#calcGoalBtn')?.addEventListener('click', () => {
    const di = parseInt(container.querySelector('#goalDay').value);
    const target = parseInt(container.querySelector('#goalTarget').value) || 0;
    const day = event.days[di];
    const resultEl = container.querySelector('#goalResult');
    if (!day || !resultEl) return;

    const rows = [...day.items].sort((a,b) => b.pts - a.pts).map(item => {
      const needed = Math.ceil(target / item.pts);
      return `<tr>
        <td>${item.label}</td>
        <td class="num" style="font-weight:700; color: var(--color-primary);">${needed.toLocaleString()} ${item.unit}</td>
        <td class="num" style="color: var(--color-text-muted);">${item.pts.toLocaleString()} pts/ea</td>
        <td class="num" style="color: var(--color-success);">${(needed * item.pts).toLocaleString()}</td>
      </tr>`;
    }).join('');

    resultEl.innerHTML = `
      <p style="font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-3);">
        To score <strong style="color: var(--color-primary);">${target.toLocaleString()} pts</strong> using only one resource on Day ${day.day} (${day.name}):
      </p>
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Resource</th><th>Need</th><th>Pts</th><th>Score</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p style="font-size: var(--text-xs); color: var(--color-text-faint); margin-top: var(--space-3);">Note: In practice you'll combine multiple resources. This shows the single-resource cost for each item.</p>
    `;
  });
}

// CEO event type tabs — delegated (container built dynamically)
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-ceo]');
  if (!btn) return;
  document.querySelectorAll('[data-ceo]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  btn.classList.add('active'); btn.setAttribute('aria-selected','true');
  renderCEOCalculator(btn.dataset.ceo);
});

// ============================================================
// GIRLS DATA — from Lineup Calculator (battle stats)
// ============================================================

const girlsData = [
  { name: 'Aya', genre: 'R&B', pos: 'Center', type: 'SSR', sing: 35540, dance: 35540, total: 71080, skillDmg: 0, normalDmg: 70, reduceSkill: 0, reduceNormal: 0, fanCap: 14, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 4 (warmup)', monthly: false, skill1: '↑70% basic attack damage dealt', skill2: '↑14% fan cap' },
  { name: 'Yumeno', genre: 'POP', pos: 'Vocalist', type: 'SSR', sing: 42437, dance: 28211, total: 70648, skillDmg: 28, normalDmg: 28, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 4 (dice)', monthly: true, skill1: '↑28% player damage', skill2: '↓12% basic attack damage taken' },
  { name: 'Mio', genre: 'HipHop', pos: 'Dancer', type: 'SSR', sing: 28069, dance: 42152, total: 70221, skillDmg: 0, normalDmg: 70, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 4 (shop)', monthly: true, skill1: '↑70% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Sloane', genre: 'POP', pos: 'Center', type: 'SSR', sing: 33542, dance: 33542, total: 67084, skillDmg: 56, normalDmg: 28, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 4 (warmup)', monthly: false, skill1: '↑28% skill damage', skill2: '↑28% player damage' },
  { name: 'Sienna', genre: 'ROCK', pos: 'Center', type: 'SSR', sing: 33542, dance: 33542, total: 67084, skillDmg: 28, normalDmg: 28, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 4 (warmup)', monthly: false, skill1: '↑28% player damage', skill2: '↓12% skill damage taken' },
  { name: 'Mio EDM', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 33400, dance: 33400, total: 66800, skillDmg: 0, normalDmg: 80, reduceSkill: 0, reduceNormal: 0, fanCap: 16, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo5 (warmup)', monthly: false, skill1: '↑80% basic attack damage dealt', skill2: '↑16% fan cap' },
  { name: 'Landy', genre: 'HipHop', pos: 'Center', type: 'SSR', sing: 33400, dance: 33400, total: 66800, skillDmg: 32, normalDmg: 80, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 5 (WarmUp)', monthly: false, skill1: '↑32% skill damage', skill2: '↑80% basic attack damage dealt' },
  { name: 'Momosaki', genre: 'ROCK', pos: 'Vocalist', type: 'SSR', sing: 44047, dance: 22691, total: 66738, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 5 (dice)', monthly: false, skill1: '↓12% basic attack damage taken', skill2: '↑36% damage to world building guard' },
  { name: 'Momona', genre: 'EDM', pos: 'Dancer', type: 'SSR', sing: 22700, dance: 44000, total: 66700, skillDmg: 0, normalDmg: 80, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali5 (shop)', monthly: false, skill1: '↑80% basic attack damage dealt', skill2: '↑12% fan cap' },
  { name: 'Rhea', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 42400, dance: 24300, total: 66700, skillDmg: 40, normalDmg: 40, reduceSkill: 0, reduceNormal: 0, fanCap: 20, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Auction Abroad', monthly: false, skill1: '↑40% player damage', skill2: '↑20% rally fan cap' },
  { name: 'Hana', genre: 'POP', pos: 'Dancer', type: 'SSR', sing: 22700, dance: 44000, total: 66700, skillDmg: 0, normalDmg: 80, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 5 (Shop)', monthly: false, skill1: '↑80% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Kendell', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 40439, dance: 26213, total: 66652, skillDmg: 28, normalDmg: 28, reduceSkill: 0, reduceNormal: 0, fanCap: 14, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 4 (dice)', monthly: false, skill1: '↑28% player damage', skill2: '↑14% fan cap' },
  { name: 'Margot', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 40439, dance: 26213, total: 66652, skillDmg: 28, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 14, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 4 (dice)', monthly: false, skill1: '↑28% skill damage', skill2: '↑14% fan cap' },
  { name: 'Valerie', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 26071, dance: 40154, total: 66225, skillDmg: 28, normalDmg: 0, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 4 (shop)', monthly: false, skill1: '↑28% skill damage', skill2: '↓12% skill damage taken' },
  { name: 'Valentina', genre: 'R&B', pos: 'Dancer', type: 'SSR', sing: 26071, dance: 40154, total: 66225, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 14, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 4 (shop)', monthly: false, skill1: '↑14% fan cap', skill2: '↓12% basic attack damage taken' },
  { name: 'Flora', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 3 (shop)', monthly: true, skill1: '↑12% fan cap', skill2: '↓12% basic attack damage taken' },
  { name: 'Longkui', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 60, normalDmg: 30, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Home Auction', monthly: false, skill1: '↑30% skill damage', skill2: '↑30% player damage' },
  { name: 'Haruki', genre: 'HipHop', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 0, normalDmg: 60, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 2 (warmup)', monthly: false, skill1: '↑60% basic attack damage dealt', skill2: '↑12% fan cap' },
  { name: 'Isla', genre: 'POP', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 24, normalDmg: 24, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 3 (warmup)', monthly: false, skill1: '↑24% player damage', skill2: '↓12% skill damage taken' },
  { name: 'Octavia', genre: 'POP', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 240, dmgDef: 0, from: 'Rome 2 (shop)', monthly: true, skill1: '↑240 dps when attacking company', skill2: '↑12% fan cap' },
  { name: 'Monica', genre: 'POP', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 60, normalDmg: 60, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Abroad Auction', monthly: false, skill1: '↑30% player damage', skill2: '↑30% player damage' },
  { name: 'Dewi', genre: 'R&B', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 24, normalDmg: 60, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 2 (warmup)', monthly: false, skill1: '↑24% skill damage', skill2: '↑60% basic attack damage dealt' },
  { name: 'Hikari', genre: 'ROCK', pos: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skillDmg: 24, normalDmg: 24, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 3 (warmup)', monthly: false, skill1: '↑24% player damage', skill2: '↓12% skill damage taken' },
  { name: 'Aurelia', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 24, normalDmg: 24, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 2 (warmup)', monthly: false, skill1: '↑24% player damage', skill2: '↑12% fan cap' },
  { name: 'Rin', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 24, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 3 (dice)', monthly: true, skill1: '↑24% skill damage', skill2: '↑12% fan cap' },
  { name: 'Miyuki', genre: 'EDM', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 0, normalDmg: 60, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 2 (shop)', monthly: true, skill1: '↑60% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Ningsih', genre: 'HipHop', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 240, dmgDef: 0, from: 'Bali 2 (shop)', monthly: true, skill1: '↑240 dps when attacking company', skill2: '↑12% fan cap' },
  { name: 'Marina', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 240, dmgDef: 0, from: 'Bali 3 (dice)', monthly: true, skill1: '↑240 dps when attacking gc/club/lm', skill2: '↑12% fan cap' },
  { name: 'Claudius', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 48, normalDmg: 48, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 3 (warmup)', monthly: false, skill1: '↑24% player damage', skill2: '↑24% player damage' },
  { name: 'Lestari', genre: 'POP', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 240, from: 'Bali 2 (dice)', monthly: true, skill1: '↑240 dps when defending', skill2: '↑36% damage to world building guard' },
  { name: 'Cornelia', genre: 'R&B', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 240, from: 'Rome 2 (dice)', monthly: true, skill1: '↑240 dps when defending', skill2: '↓12% skill damage taken' },
  { name: 'Eri', genre: 'R&B', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 3 (shop)', monthly: true, skill1: '↑12% fan cap', skill2: '↓12% basic attack damage taken' },
  { name: 'Vivienne', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 240, from: 'Bali 3 (shop)', monthly: true, skill1: '↑240 dps when defending', skill2: '↓12% basic attack damage taken' },
  { name: 'Kasha', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 24, normalDmg: 84, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Anniversary', monthly: true, skill1: '↑24% player damage', skill2: '↑60% basic attack damage dealt' },
  { name: 'Antonia', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skillDmg: 24, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 12, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 3 (dice)', monthly: true, skill1: '↑24% skill damage', skill2: '↑12% fan cap' },
  { name: 'Riku', genre: 'ROCK', pos: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skillDmg: 24, normalDmg: 24, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 2 (dice)', monthly: true, skill1: '↑24% player damage', skill2: '↓12% basic attack damage taken' },
  { name: 'Kokoro', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 20, normalDmg: 60, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 1 (shop)', monthly: true, skill1: '↑20% skill damage', skill2: '↑60% basic attack damage dealt' },
  { name: 'Anya', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 200, dmgDef: 0, from: 'Anniversary', monthly: true, skill1: '↑200 dps when attacking gc/club/lm', skill2: '↑10% fan cap' },
  { name: 'Daphne', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 1 (shop)', monthly: true, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Hestia', genre: 'HipHop', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: true, skill1: '↑20% player damage', skill2: '↑10% rally cap' },
  { name: 'Chizuru', genre: 'POP', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 1 (warmup)', monthly: true, skill1: '↑20% player damage', skill2: '↑10% rally cap' },
  { name: 'Eirene', genre: 'R&B', pos: 'Vocalist', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 1 (dice)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Talia', genre: 'ROCK', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 1 (dice)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap' },
  { name: 'Mellissa', genre: 'ROCK', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap' },
  { name: 'Noora', genre: 'R&B', pos: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: false, skill1: '↑40% gold mining speed', skill2: '↑50% basic attack damage dealt' },
  { name: 'Kelly', genre: 'ROCK', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: false, skill1: '↑10% fan cap', skill2: '↑10% rally cap' },
  { name: 'Sari', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'Bali 1 (warmup)', monthly: true, skill1: '↑20% player damage', skill2: '↑10% rally cap' },
  { name: 'Xenia', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'Rome 1 (warmup)', monthly: true, skill1: '↑20% player damage', skill2: '↑10% rally cap' },
  { name: 'Nastassja', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 10, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: true, skill1: '↑20% player damage', skill2: '↑10% rally cap' },
  { name: 'Leilani', genre: 'HipHop', pos: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 1 (slot 1)', monthly: true, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Ayaka', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 1 (slot 1)', monthly: true, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Moana', genre: 'POP', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 1 (shop)', monthly: true, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Ruby', genre: 'POP', pos: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 20, normalDmg: 70, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: true, skill1: '↑20% player damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Ariadne', genre: 'POP', pos: 'Center', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 1 (slot 1)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Rosemary', genre: 'POP', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap' },
  { name: 'Ratih', genre: 'R&B', pos: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Bali 1 (slot 2)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Sora', genre: 'R&B', pos: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 1 (dice)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap' },
  { name: 'Calliope', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Rome 1 (slot 2)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap' },
  { name: 'Yuuko', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'Tokyo 1 (slot 2)', monthly: true, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken' },
  { name: 'Megan', genre: 'HipHop', pos: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: false, skill1: '↑20% player damage', skill2: '↑40% gold mining speed' },
  { name: 'Cindy', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'SvS Event', monthly: false, skill1: '↑20% skill damage', skill2: '↓12% basic attack damage taken' },
  { name: 'Isadora', genre: 'EDM', pos: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Everly', genre: 'EDM', pos: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 0, reduceSkill: 0, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↓12% basic attack damage taken' },
  { name: 'Beatrice', genre: 'HipHop', pos: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% player damage', skill2: '↑10% fan cap' },
  { name: 'Audrey', genre: 'HipHop', pos: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑30% damage to world building guard', skill2: '↓12% skill damage taken' },
  { name: 'Alexandra', genre: 'POP', pos: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Aurora', genre: 'POP', pos: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Nova', genre: 'R&B', pos: 'Dancer', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 200, from: '', monthly: true, skill1: '↑200 dps when defending', skill2: '↑50% basic attack damage dealt' },
  { name: 'Claire', genre: 'ROCK', pos: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Josephine', genre: 'HipHop', pos: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Caroline', genre: 'EDM', pos: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 200, dmgDef: 0, from: 'VIP Store', monthly: false, skill1: '↑200 dps when attacking gc/club/lm', skill2: '↑10% fan cap' },
  { name: 'Alice', genre: 'EDM', pos: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Bella', genre: 'HipHop', pos: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'VIP Store', monthly: false, skill1: '↑20% skill damage', skill2: '↑10% fan cap' },
  { name: 'Avery', genre: 'HipHop', pos: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Anastasia', genre: 'POP', pos: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Savannah', genre: 'POP', pos: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 200, dmgDef: 0, from: '', monthly: true, skill1: '↑200 dps when attacking company', skill2: '↑10% fan cap' },
  { name: 'Brooklyn', genre: 'POP', pos: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 200, from: '', monthly: true, skill1: '↑200 dps when defending', skill2: '↑30% damage to world building guard' },
  { name: 'Marguerite', genre: 'R&B', pos: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Elizabeth', genre: 'R&B', pos: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skillDmg: 20, normalDmg: 70, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% player damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Julia', genre: 'R&B', pos: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↑75% drive speed' },
  { name: 'Zendaya', genre: 'R&B', pos: 'Center', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑50% drive speed, ↑20% WBG damage', skill2: '↑50% basic attack damage dealt' },
  { name: 'Kesnia', genre: 'R&B', pos: 'Vocalist', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'SvS Event', monthly: false, skill1: '↑40% gold mining speed', skill2: '↑40% gold mining speed' },
  { name: 'Genevieve', genre: 'ROCK', pos: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Gabriella', genre: 'ROCK', pos: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skillDmg: 40, normalDmg: 20, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: false, skill1: '↑20% player damage', skill2: '↑20% skill damage' },
  { name: 'Paisley', genre: 'ROCK', pos: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skillDmg: 0, normalDmg: 0, reduceSkill: 12, reduceNormal: 12, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken' },
  { name: 'Skylar', genre: 'ROCK', pos: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skillDmg: 20, normalDmg: 0, reduceSkill: 0, reduceNormal: 0, fanCap: 0, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: '', monthly: true, skill1: '↑20% skill damage', skill2: '↑30% damage to world building guard' },
  { name: 'Belle', genre: 'POP', pos: 'Center', type: 'SSR', sing: 19300, dance: 19300, total: 38600, skillDmg: 0, normalDmg: 50, reduceSkill: 0, reduceNormal: 0, fanCap: 10, rallyCap: 0, dmgAtk: 0, dmgDef: 0, from: 'New Star Artist Event', monthly: false, skill1: '↑10% rally fan cap', skill2: '↑50% basic attack damage dealt' },
];

girlsData.sort((a, b) => b.total - a.total);

const genreClass = { 'R&B': 'rnb', 'POP': 'pop', 'ROCK': 'rock', 'HipHop': 'hiphop', 'EDM': 'edm' };
const posClass = { 'Center': 'center', 'Vocalist': 'vocalist', 'Dancer': 'dancer' };

function statBar(val, max, color) {
  if (!val) return '';
  const pct = Math.min(100, Math.round((val / max) * 100));
  return `<div class="progress-bar" style="width: 100%; height:4px; margin-top:2px;"><div class="progress-fill" style="width:${pct}%; background:${color};"></div></div>`;
}

function renderGirls(data) {
  const container = document.getElementById('girlsGrid');
  if (!container) return;
  if (!data.length) { container.innerHTML = '<p style="color:var(--color-text-muted);grid-column:1/-1">No results.</p>'; return; }
  container.innerHTML = data.map(g => `
    <div class="girl-card" role="listitem">
      <div class="girl-card-header">
        <span class="girl-name">${g.name}</span>
        <div style="display:flex;gap:var(--space-1);flex-wrap:wrap;">
          <span class="badge badge-${g.type.toLowerCase()}">${g.type}</span>
          <span class="badge badge-${genreClass[g.genre] || ''}">${g.genre}</span>
        </div>
      </div>
      <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-bottom:var(--space-3);">
        <span class="badge badge-${posClass[g.pos] || ''}">${g.pos}</span>
      </div>
      <!-- Sing/Dance stats -->
      <div class="girl-stats" style="margin-bottom:var(--space-3);">
        <div class="girl-stat"><span class="girl-stat-label">Sing</span><span class="girl-stat-value">${g.sing.toLocaleString()}</span></div>
        <div class="girl-stat"><span class="girl-stat-label">Dance</span><span class="girl-stat-value">${g.dance.toLocaleString()}</span></div>
        <div class="girl-stat"><span class="girl-stat-label">Total</span><span class="girl-stat-value" style="color:var(--color-primary);">${g.total.toLocaleString()}</span></div>
        <div class="girl-stat"><span class="girl-stat-label">From</span><span class="girl-stat-value" style="font-size:var(--text-xs);">${g.from}</span></div>
      </div>
      <!-- Battle Stats -->
      <div class="battle-stats-grid">
        ${g.skillDmg ? `<div class="bstat"><span class="bstat-label">Skill DMG</span><span class="bstat-val" style="color:var(--color-primary);">+${g.skillDmg}%</span>${statBar(g.skillDmg, 100, 'var(--color-primary)')}</div>` : ''}
        ${g.normalDmg ? `<div class="bstat"><span class="bstat-label">Normal DMG</span><span class="bstat-val" style="color:var(--color-cyan);">+${g.normalDmg}%</span>${statBar(g.normalDmg, 110, 'var(--color-cyan)')}</div>` : ''}
        ${g.reduceSkill ? `<div class="bstat"><span class="bstat-label">Reduce Skill</span><span class="bstat-val" style="color:var(--color-success);">-${g.reduceSkill}%</span>${statBar(g.reduceSkill, 50, 'var(--color-success)')}</div>` : ''}
        ${g.reduceNormal ? `<div class="bstat"><span class="bstat-label">Reduce Normal</span><span class="bstat-val" style="color:var(--color-success);">-${g.reduceNormal}%</span>${statBar(g.reduceNormal, 84, 'var(--color-success)')}</div>` : ''}
        ${g.fanCap ? `<div class="bstat"><span class="bstat-label">Fan Cap</span><span class="bstat-val" style="color:var(--color-gold);">+${g.fanCap}%</span>${statBar(g.fanCap, 60, 'var(--color-gold)')}</div>` : ''}
        ${g.rallyCap ? `<div class="bstat"><span class="bstat-label">Rally Cap</span><span class="bstat-val" style="color:var(--color-gold);">+${g.rallyCap}%</span>${statBar(g.rallyCap, 30, 'var(--color-gold)')}</div>` : ''}
        ${g.dmgAtk ? `<div class="bstat"><span class="bstat-label">DMG Attack</span><span class="bstat-val" style="color:var(--color-warning);">+${g.dmgAtk}</span></div>` : ''}
        ${g.dmgDef ? `<div class="bstat"><span class="bstat-label">DMG Defense</span><span class="bstat-val" style="color:var(--color-warning);">+${g.dmgDef}</span></div>` : ''}
      </div>
    </div>
  `).join('');
}

function filterGirls() {
  const s = (document.getElementById('girlSearch')?.value || '').toLowerCase();
  const g = document.getElementById('genreFilter')?.value || '';
  const p = document.getElementById('positionFilter')?.value || '';
  const r = document.getElementById('rarityFilter')?.value || '';
  const sort = document.getElementById('sortFilter')?.value || 'total_desc';

  let filtered = girlsData.filter(d =>
    (!s || d.name.toLowerCase().includes(s)) &&
    (!g || d.genre === g) &&
    (!p || d.pos === p) &&
    (!r || d.type === r)
  );

  // Sort
  filtered = [...filtered].sort((a, b) => {
    switch(sort) {
      case 'total_desc': return b.total - a.total;
      case 'total_asc':  return a.total - b.total;
      case 'sing_desc':  return b.sing - a.sing;
      case 'dance_desc': return b.dance - a.dance;
      case 'name_asc':   return a.name.localeCompare(b.name);
      default:           return b.total - a.total;
    }
  });

  renderGirls(filtered);
}
document.getElementById('girlSearch')?.addEventListener('input', filterGirls);
document.getElementById('genreFilter')?.addEventListener('change', filterGirls);
document.getElementById('positionFilter')?.addEventListener('change', filterGirls);
document.getElementById('rarityFilter')?.addEventListener('change', filterGirls);
document.getElementById('sortFilter')?.addEventListener('change', filterGirls);
filterGirls();

// ============================================================
// ABROAD SHOP OPTIMIZER
// ============================================================

const ABROAD_ITEMS = [
  { name: 'Girl Photos (SSR)', cost: 100, qty: 500, priority: 5, category: 'Artist', desc: 'Unlock or upgrade SSR girl skills — needed for all 3 skill levels' },
  { name: 'SSR Promo Cards', cost: 24, qty: 2000, priority: 4, category: 'Artist', desc: 'Promote SSR girls to higher star levels, increasing their stat power' },
  { name: 'SR Promo Cards', cost: 9, qty: 4000, priority: 3, category: 'Artist', desc: 'Promote SR girls — less impactful than SSR but useful for filler slots' },
  { name: 'Promo Manuals', cost: 750, qty: 200, priority: 2, category: 'Artist', desc: 'Used for artist promotion alongside promo cards — high cost, buy only if needed' },
  { name: 'Blueprints', cost: 3, qty: 10000, priority: 3, category: 'Building', desc: 'Required to advance Blueprint tiers (Tier 1–21), unlocks stronger building bonuses' },
  { name: 'Glass', cost: 3, qty: 20000, priority: 2, category: 'HQ', desc: 'Headquarters upgrade material — needed for every HQ level' },
  { name: 'Car Parts', cost: 3, qty: 10000, priority: 2, category: 'Vehicle', desc: 'Upgrade car rank (all 4 parts must be upgraded equally to advance rank)' },
  { name: 'Yellow Gems', cost: 6, qty: 5000, priority: 3, category: 'Collection', desc: 'Level up Yellow collection tiers — worth 2× CEO points vs Purple on Day 3' },
  { name: 'Purple Gems', cost: 3, qty: 10000, priority: 3, category: 'Collection', desc: 'Level up Purple collection tiers — half the CEO point value of Yellow but cheaper' },
  { name: 'Drones', cost: 3, qty: 10000, priority: 2, category: 'Villa', desc: 'Build and upgrade Villa rooms (Classic through Urban Heights)' },
  { name: 'Villa Drafts', cost: 30, qty: 2000, priority: 2, category: 'Villa', desc: 'Design Drafts needed alongside Drones for each Villa room upgrade' },
  { name: 'CEO Coins', cost: 12, qty: 5000, priority: 1, category: 'Villa', desc: 'Villa Homemaking material — used for CEO coin upgrades in homemaking tiers' },
  { name: 'Keys', cost: 120, qty: 500, priority: 1, category: 'Villa', desc: 'Villa Homemaking material — pairs with CEO coins for each homemaking tier' },
  { name: 'Spark Plugs', cost: 12, qty: 5000, priority: 1, category: 'Vehicle', desc: 'Car Core upgrade component — Novice grade, large quantities needed early' },
  { name: 'Ignition Coils', cost: 120, qty: 500, priority: 1, category: 'Vehicle', desc: 'Car Core upgrade component — pairs with spark plugs; Enhanced grade costs more' },
  { name: 'Wood', cost: 12, qty: 5000, priority: 1, category: 'HQ', desc: 'HQ floor upgrade material — Basic Wood for early floors, HQ Wood for later' },
  { name: 'Steel', cost: 120, qty: 500, priority: 1, category: 'HQ', desc: 'HQ floor upgrade material — Basic Steel Ingots for early, HQ Steel for later floors' },
  { name: 'Vehicle Drawings', cost: 15, qty: 2000, priority: 2, category: 'Vehicle', desc: 'Advance Car Drawings — needed to push car rank from S to SSS tier' },
  { name: 'Building Cards', cost: 25, qty: 1000, priority: 1, category: 'Building', desc: 'Levels up the Building Cards progression (Levels 1–15), grants passive bonuses' },
  { name: 'Asset Coins', cost: 25, qty: 1000, priority: 1, category: 'Artist', desc: 'Level up asset investments (Jewelry, Car, Property) to generate passive income' },
  { name: 'Interviews', cost: 300, qty: 10, priority: 2, category: 'Artist', desc: 'Earns artist EXP — scored in CEO Artist day (60,000 pts each in Ultimate)' },
  { name: 'Demos', cost: 300, qty: 10, priority: 2, category: 'Battle', desc: 'Scored in CEO Battle day (60,000 pts each) — small qty but high point value' },
  { name: 'Yellow House', cost: 50000, qty: 1, priority: 5, category: 'Collection', desc: 'Rare decoration item — grants a Yellow collection slot or theme for the collection museum' },
  { name: 'Yellow Car', cost: 25000, qty: 1, priority: 4, category: 'Vehicle', desc: 'Rare vehicle decoration — unlocks a Yellow car display in your collection' },
  { name: 'Purple Car', cost: 10000, qty: 1, priority: 3, category: 'Vehicle', desc: 'Unlocks a Purple car display in your vehicle collection' },
  { name: 'Purple House', cost: 20000, qty: 1, priority: 3, category: 'Collection', desc: 'Unlocks a Purple house decoration for the collection museum' },
];

function renderAbroadOptimizer() {
  const coins = parseInt(document.getElementById('abroadCoins')?.value) || 0;
  const goal = document.getElementById('abroadGoal')?.value || 'priority';
  const container = document.getElementById('abroadResult');
  if (!container) return;

  // Sort by goal
  let sorted = [...ABROAD_ITEMS];
  if (goal === 'priority') sorted.sort((a,b) => b.priority - a.priority || (a.cost * a.qty) - (b.cost * b.qty));
  if (goal === 'efficiency') sorted.sort((a,b) => b.qty/b.cost - a.qty/a.cost); // qty per coin = value
  if (goal === 'cheapest') sorted.sort((a,b) => a.cost - b.cost);

  let remaining = coins;
  const results = sorted.map(item => {
    const totalCost = item.cost * item.qty;
    const canAfford = totalCost <= remaining;
    if (canAfford) remaining -= totalCost;
    return { ...item, totalCost, canAfford, remaining: canAfford ? remaining : null };
  });

  const affordable = results.filter(r => r.canAfford);
  const spent = coins - remaining;

  container.innerHTML = `
    <div class="scorecard" style="margin-bottom: var(--space-5);">
      <div class="scorecard-grid">
        <div class="scorecard-item">
          <span class="scorecard-label">Available Coins</span>
          <span class="scorecard-value gold">${coins.toLocaleString()}</span>
        </div>
        <div class="scorecard-item">
          <span class="scorecard-label">Items You Can Buy</span>
          <span class="scorecard-value" style="color:var(--color-success);">${affordable.length} of ${ABROAD_ITEMS.length}</span>
        </div>
        <div class="scorecard-item">
          <span class="scorecard-label">Total Spent</span>
          <span class="scorecard-value" style="color:var(--color-warning);">${spent.toLocaleString()}</span>
        </div>
        <div class="scorecard-item">
          <span class="scorecard-label">Coins Remaining</span>
          <span class="scorecard-value" style="color:${remaining > 0 ? 'var(--color-success)' : 'var(--color-text-muted)'};">${remaining.toLocaleString()}</span>
        </div>
      </div>
    </div>
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>What it's used for</th>
            <th>Total Cost</th>
            <th>Status</th>
            <th>Coins After</th>
          </tr>
        </thead>
        <tbody>
          ${results.map((r, i) => `
            <tr style="${r.canAfford ? '' : 'opacity: 0.4;'}">
              <td style="color:var(--color-text-muted);font-weight:700;">${r.canAfford ? '#' + (results.filter((x,j) => x.canAfford && j <= i).length) : '—'}</td>
              <td>
                <div style="font-weight:${r.canAfford ? '600' : '400'};">${r.name}</div>
                <div style="font-size:var(--text-xs);color:var(--color-text-faint);">${r.qty.toLocaleString()} × ${r.cost.toLocaleString()} coins</div>
              </td>
              <td style="font-size:var(--text-xs);color:var(--color-text-muted);max-width:220px;">${r.desc}</td>
              <td class="num" style="font-weight:700;">${r.totalCost.toLocaleString()}</td>
              <td>${r.canAfford
                ? '<span style="color:var(--color-success);font-weight:700;">✓ Buy</span>'
                : `<span style="color:var(--color-text-faint);">Need ${(r.totalCost - coins).toLocaleString()} more</span>`}</td>
              <td class="num">${r.canAfford ? r.remaining.toLocaleString() : '—'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

document.getElementById('abroadCoins')?.addEventListener('input', renderAbroadOptimizer);
document.getElementById('abroadGoal')?.addEventListener('change', renderAbroadOptimizer);
document.getElementById('calcAbroadBtn')?.addEventListener('click', renderAbroadOptimizer);
renderAbroadOptimizer();

// ============================================================
// GEMS CALCULATOR
// ============================================================
const gemsPerLevel = [0,5,22,45,75,112,156,208,267,334,410,494,586,688,798,916,1044,1182,1328,1484,1649,1824,2009,2204,2408,2623,2847,3082,3326,3581,3847,4123,4409,4706,5013,5332,5661,6000,6351,6713,7085,7469,7863,8269,8686,9115,9554,10005,10467,10941];
document.getElementById('calcGemsBtn')?.addEventListener('click', () => {
  const from = Math.max(1, Math.min(49, parseInt(document.getElementById('gemFromLevel')?.value) || 1));
  const to = Math.max(2, Math.min(50, parseInt(document.getElementById('gemToLevel')?.value) || 50));
  const colls = Math.max(1, parseInt(document.getElementById('gemCollections')?.value) || 1);
  if (from >= to) { document.getElementById('gemResult').textContent = 'From must be less than To.'; return; }
  let total = 0;
  for (let i = from; i < to; i++) total += gemsPerLevel[i] || 0;
  total *= colls;
  document.getElementById('gemResult').innerHTML = `
    <span style="color:var(--color-text-muted);font-size:var(--text-sm);font-weight:400;">Levels ${from}→${to} × ${colls} collection(s):</span><br>
    <span style="color:var(--color-primary);font-family:var(--font-display);font-size:var(--text-xl);font-weight:700;">${total.toLocaleString()} gems</span>
  `;
});

// ============================================================
// BLUEPRINTS TABLE
// ============================================================
const bpData = [
  [1,2,null],[2,3,null],[3,4,null],[4,5,null],[5,6,null],[6,7,null],[7,8,null],[8,9,null],[9,10,null],
  [10,11,28800],[11,12,125700],[12,13,141000],[13,14,123000],[14,15,162000],
  [15,16,189000],[16,17,222000],[17,18,258000],[18,19,315000],[19,20,372000],[20,21,429000],[21,'MAX',486000],
];
(function() {
  const tbody = document.getElementById('bpTable');
  if (!tbody) return;
  let cumul = 0;
  tbody.innerHTML = bpData.map(([lvl, nxt, req]) => {
    if (req) cumul += req;
    return `<tr>
      <td style="font-weight:700;color:var(--color-primary);">${lvl}</td>
      <td>${nxt}</td>
      <td class="num">${req ? req.toLocaleString() : '<span style="color:var(--color-text-faint)">—</span>'}</td>
      <td class="num" style="color:var(--color-gold);">${req ? cumul.toLocaleString() : '—'}</td>
    </tr>`;
  }).join('');
})();

// ============================================================
// LINEUP BUILDER
// ============================================================

(function() {
  // State
  let manualLineup = [null, null, null, null, null];

  // Stat weights per event focus
  const FOCUS_WEIGHTS = {
    attack:   { skillDmg: 2, normalDmg: 2, fanCap: 0.5, reduceSkill: 0.3, reduceNormal: 0.3, rallyCap: 0.3, dmgAtk: 0.01, dmgDef: 0, total: 0.001 },
    defense:  { reduceSkill: 3, reduceNormal: 3, skillDmg: 0.5, normalDmg: 0.5, fanCap: 0.3, rallyCap: 0.3, dmgAtk: 0, dmgDef: 0.01, total: 0.001 },
    fans:     { fanCap: 3, normalDmg: 1.5, skillDmg: 1, rallyCap: 2, reduceSkill: 0.2, reduceNormal: 0.2, dmgAtk: 0, dmgDef: 0, total: 0.001 },
    balanced: { skillDmg: 1.5, normalDmg: 1.5, reduceSkill: 1.5, reduceNormal: 1.5, fanCap: 1, rallyCap: 1, dmgAtk: 0.005, dmgDef: 0.005, total: 0.001 },
  };

  const STAT_LABELS = {
    skillDmg: 'Skill DMG', normalDmg: 'Normal DMG',
    reduceSkill: 'Reduce Skill', reduceNormal: 'Reduce Normal',
    fanCap: 'Fan Cap', rallyCap: 'Rally Cap',
    dmgAtk: 'DMG Attack', dmgDef: 'DMG Defense', total: 'Total Stat'
  };

  const STAT_COLORS = {
    skillDmg: 'var(--color-primary)', normalDmg: 'var(--color-cyan)',
    reduceSkill: 'var(--color-success)', reduceNormal: 'var(--color-success)',
    fanCap: 'var(--color-gold)', rallyCap: 'var(--color-gold)',
    dmgAtk: 'var(--color-warning)', dmgDef: 'var(--color-warning)',
    total: 'var(--color-text)'
  };

  function scoreGirl(girl, weights) {
    return Object.entries(weights).reduce((sum, [k, w]) => sum + (girl[k] || 0) * w, 0);
  }

  function getFilteredPool() {
    const genre = document.getElementById('lbGenre')?.value || '';
    const pos   = document.getElementById('lbPosition')?.value || '';
    const sort  = document.getElementById('lbSort')?.value || 'total';

    return [...girlsData]
      .filter(g => (!genre || g.genre === genre) && (!pos || g.pos === pos))
      .sort((a, b) => {
        const av = a[sort] || 0, bv = b[sort] || 0;
        return bv - av || b.total - a.total;
      });
  }

  function computeLineupTotals(girls) {
    const totals = { skillDmg:0, normalDmg:0, reduceSkill:0, reduceNormal:0, fanCap:0, rallyCap:0, dmgAtk:0, dmgDef:0, sing:0, dance:0 };
    girls.forEach(g => { if(g) Object.keys(totals).forEach(k => totals[k] += g[k] || 0); });
    return totals;
  }

  function renderTotalsBar(totals, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const stats = ['skillDmg','normalDmg','reduceSkill','reduceNormal','fanCap','rallyCap','dmgAtk','dmgDef'];
    const active = stats.filter(k => totals[k] > 0);
    if (!active.length) { el.innerHTML = ''; return; }
    el.innerHTML = `
      <div class="lineup-totals-grid">
        ${active.map(k => `
          <div class="lineup-total-item">
            <span class="lineup-total-label" style="color:${STAT_COLORS[k]}">${STAT_LABELS[k]}</span>
            <span class="lineup-total-value" style="color:${STAT_COLORS[k]}">
              ${k === 'dmgAtk' || k === 'dmgDef' ? '+' + totals[k].toLocaleString() : '+' + totals[k] + '%'}
            </span>
          </div>
        `).join('')}
        <div class="lineup-total-item">
          <span class="lineup-total-label">Total Sing</span>
          <span class="lineup-total-value">${totals.sing.toLocaleString()}</span>
        </div>
        <div class="lineup-total-item">
          <span class="lineup-total-label">Total Dance</span>
          <span class="lineup-total-value">${totals.dance.toLocaleString()}</span>
        </div>
      </div>
    `;
  }

  function makeGirlCard(girl, mode, idx) {
    const genreC = { 'R&B':'rnb','POP':'pop','ROCK':'rock','HipHop':'hiphop','EDM':'edm' };
    const posC   = { 'Center':'center','Vocalist':'vocalist','Dancer':'dancer' };
    const stats = ['skillDmg','normalDmg','reduceSkill','reduceNormal','fanCap','rallyCap','dmgAtk','dmgDef']
      .filter(k => girl[k])
      .map(k => `<span class="lb-stat-chip" style="background:color-mix(in srgb,${STAT_COLORS[k]} 15%,transparent);color:${STAT_COLORS[k]};">
        ${STAT_LABELS[k]} ${k === 'dmgAtk' || k === 'dmgDef' ? '+'+girl[k] : '+'+girl[k]+'%'}
      </span>`).join('');

    return `
      <div class="lb-girl-card ${mode === 'pool' ? 'lb-pool-card' : 'lb-slot-filled'}"
           data-name="${girl.name}" data-mode="${mode}" data-idx="${idx}"
           role="button" tabindex="0"
           aria-label="${mode === 'pool' ? 'Add ' + girl.name + ' to lineup' : 'Remove ' + girl.name}">
        <div class="lb-card-top">
          <div>
            <div class="lb-girl-name">${girl.name}</div>
            <div class="lb-girl-meta">
              <span class="badge badge-${genreC[girl.genre]||''}">${girl.genre}</span>
              <span class="badge badge-${posC[girl.pos]||''}">${girl.pos}</span>
              ${girl.type === 'UR' ? '<span class="badge badge-ur">UR</span>' : ''}
            </div>
          </div>
          <div class="lb-girl-total">${girl.total.toLocaleString()}</div>
        </div>
        <div class="lb-stats-row">${stats || '<span style="color:var(--color-text-faint);font-size:var(--text-xs);">Utility skills only</span>'}</div>
        ${mode === 'slot' ? '<div class="lb-remove-hint">tap to remove</div>' : ''}
      </div>
    `;
  }

  function renderPool() {
    const pool = getFilteredPool();
    const container = document.getElementById('lbPool');
    const countEl = document.getElementById('lbPoolCount');
    if (!container) return;
    countEl.textContent = `${pool.length} girls`;
    container.innerHTML = pool.map(g => makeGirlCard(g, 'pool', -1)).join('');
    container.querySelectorAll('.lb-pool-card').forEach(card => {
      card.addEventListener('click', () => addToManual(card.dataset.name));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') addToManual(card.dataset.name); });
    });
  }

  function renderManualSlots() {
    const container = document.getElementById('lbManualSlots');
    if (!container) return;
    container.innerHTML = manualLineup.map((girl, i) => {
      if (!girl) return `<div class="lineup-slot empty" data-slot="${i}">Slot ${i+1}</div>`;
      return makeGirlCard(girl, 'slot', i);
    }).join('');
    container.querySelectorAll('.lb-slot-filled').forEach(card => {
      const idx = parseInt(card.dataset.idx);
      card.addEventListener('click', () => removeFromManual(idx));
    });
    renderTotalsBar(computeLineupTotals(manualLineup.filter(Boolean)), 'lbManualStats');
  if (window.runLineupGrade) window.runLineupGrade(manualLineup, 'lbGradePanel');
  }

  function addToManual(name) {
    const emptyIdx = manualLineup.indexOf(null);
    if (emptyIdx === -1) return; // full
    const girl = girlsData.find(g => g.name === name);
    if (!girl) return;
    if (manualLineup.some(g => g?.name === name)) return; // already in lineup
    manualLineup[emptyIdx] = girl;
    renderManualSlots();
  }

  function removeFromManual(idx) {
    manualLineup[idx] = null;
    renderManualSlots();
  }

  function runAutoSuggest() {
    const genre   = document.getElementById('lbGenre')?.value || '';
    const pos     = document.getElementById('lbPosition')?.value || '';
    const focus   = document.getElementById('lbEvent')?.value || 'balanced';
    const weights = FOCUS_WEIGHTS[focus];

    let pool = girlsData.filter(g => (!genre || g.genre === genre) && (!pos || g.pos === pos));
    pool = pool.map(g => ({ ...g, _score: scoreGirl(g, weights) })).sort((a,b) => b._score - a._score);
    const best5 = pool.slice(0, 5);

    const el = document.getElementById('lbSuggestion');
    const cards = document.getElementById('lbSuggestionCards');
    const meta = document.getElementById('lbSuggestionMeta');
    if (!el || !cards) return;

    const focusLabels = { attack: 'Attacking', defense: 'Defending', fans: 'Fan Growth', balanced: 'Balanced' };
    const genreLabel = genre || 'All Genres';
    const posLabel = pos || 'All Positions';
    meta.textContent = `${focusLabels[focus]} · ${genreLabel} · ${posLabel}`;

    cards.innerHTML = best5.map((g, i) => `
      <div class="lb-suggestion-card">
        <div class="lb-rank-badge">#${i+1}</div>
        ${makeGirlCard(g, 'suggest', i)}
        <div class="lb-score-bar">
          <div class="lb-score-fill" style="width:${Math.round((g._score / (pool[0]._score || 1)) * 100)}%"></div>
        </div>
        <div class="lb-score-label">Combat score: ${Math.round(g._score).toLocaleString()}</div>
      </div>
    `).join('');

    // Show totals for the best 5
    renderTotalsBar(computeLineupTotals(best5), 'lbSuggestionStats');
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Wire events
  document.getElementById('lbGenre')?.addEventListener('change', renderPool);
  document.getElementById('lbPosition')?.addEventListener('change', renderPool);
  document.getElementById('lbSort')?.addEventListener('change', renderPool);
  document.getElementById('lbAutoBtn')?.addEventListener('click', runAutoSuggest);
  document.getElementById('lbClearSuggestion')?.addEventListener('click', () => {
    document.getElementById('lbSuggestion').style.display = 'none';
  });
  document.getElementById('lbClearManual')?.addEventListener('click', () => {
    manualLineup = [null, null, null, null, null];
    renderManualSlots();
  });

  // Init
  renderPool();
  renderManualSlots();
})();

// ============================================================
// LINEUP GRADER
// ============================================================

(function() {

  // Benchmarks based on known strong lineups from source docs
  // These are community-observed totals for a solid 5-girl SSR lineup
  const BENCHMARKS = {
    skillDmg:     { low: 20,  good: 48,  strong: 80,  label: 'Skill DMG' },
    normalDmg:    { low: 24,  good: 60,  strong: 120, label: 'Normal DMG' },
    reduceSkill:  { low: 0,   good: 12,  strong: 24,  label: 'Reduce Skill' },
    reduceNormal: { low: 0,   good: 12,  strong: 24,  label: 'Reduce Normal' },
    fanCap:       { low: 0,   good: 12,  strong: 24,  label: 'Fan Cap' },
    rallyCap:     { low: 0,   good: 10,  strong: 20,  label: 'Rally Cap' },
  };

  const REDUNDANCY_THRESHOLD = 3; // 3+ girls with same stat = overkill

  function gradeLineup(girls) {
    const tips = [];
    const warnings = [];
    const strengths = [];

    // --- Stat totals ---
    const totals = { skillDmg:0, normalDmg:0, reduceSkill:0, reduceNormal:0, fanCap:0, rallyCap:0 };
    girls.forEach(g => Object.keys(totals).forEach(k => totals[k] += g[k] || 0));

    // --- Redundancy check ---
    Object.entries(totals).forEach(([stat, val]) => {
      const bench = BENCHMARKS[stat];
      if (!bench || val === 0) return;

      // Count how many girls contribute to this stat
      const contributors = girls.filter(g => (g[stat] || 0) > 0);
      if (contributors.length >= REDUNDANCY_THRESHOLD) {
        const names = contributors.map(g => g.name).join(', ');
        warnings.push({
          icon: '⚠️',
          title: `${bench.label} stacked on ${contributors.length} girls`,
          detail: `${names} all boost ${bench.label}. You could swap one for a girl that covers a gap instead.`,
          stat
        });
      }
    });

    // --- Benchmark comparison ---
    Object.entries(BENCHMARKS).forEach(([stat, bench]) => {
      const val = totals[stat];

      if (val === 0 && bench.good > 0) {
        // Total gap — find best replacement
        const best = girlsData
          .filter(g => !girls.find(l => l.name === g.name) && (g[stat] || 0) > 0)
          .sort((a, b) => (b[stat] || 0) - (a[stat] || 0))
          .slice(0, 2);
        tips.push({
          icon: '🔴',
          title: `No ${bench.label} in lineup`,
          detail: `Your team has zero ${bench.label}. This leaves you exposed.${best.length ? ' Consider: ' + best.map(g => `${g.name} (+${g[stat]}%)`).join(' or ') + '.' : ''}`,
          severity: 'critical',
          stat
        });
      } else if (val < bench.good && bench.good > 0) {
        // Below benchmark — find upgrade
        const best = girlsData
          .filter(g => !girls.find(l => l.name === g.name) && (g[stat] || 0) > val / girls.length)
          .sort((a, b) => (b[stat] || 0) - (a[stat] || 0))
          .slice(0, 2);
        tips.push({
          icon: '🟡',
          title: `${bench.label} is low (${val > 0 ? '+' + val + '%' : '0'})`,
          detail: `Strong lineups typically hit +${bench.good}%. You're at ${val > 0 ? '+' + val + '%' : 'zero'}.${best.length ? ' Upgrade option: ' + best.map(g => `${g.name} (+${g[stat]}%)`).join(' or ') + '.' : ''}`,
          severity: 'warning',
          stat
        });
      } else if (val >= bench.strong) {
        strengths.push(`${bench.label} +${val}% (excellent)`);
      } else if (val >= bench.good) {
        strengths.push(`${bench.label} +${val}% (solid)`);
      }
    });

    // --- Position balance check ---
    const positions = { Center: 0, Vocalist: 0, Dancer: 0 };
    girls.forEach(g => { if (positions[g.pos] !== undefined) positions[g.pos]++; });
    const dominated = Object.entries(positions).filter(([, c]) => c >= 4);
    const missing = Object.entries(positions).filter(([, c]) => c === 0);
    if (dominated.length) {
      dominated.forEach(([pos]) => warnings.push({
        icon: '⚠️',
        title: `4+ ${pos}s in lineup`,
        detail: `Heavy ${pos} lineups miss genre bonus diversity. Consider mixing positions for broader buffs.`,
        stat: 'position'
      }));
    }
    if (missing.length) {
      missing.forEach(([pos]) => tips.push({
        icon: '🟡',
        title: `No ${pos} in lineup`,
        detail: `Having at least one of each position type is generally recommended for balanced coverage.`,
        severity: 'warning',
        stat: 'position'
      }));
    }

    // --- Single-genre bonus check ---
    const genres = [...new Set(girls.map(g => g.genre))];
    if (genres.length === 1) {
      strengths.push(`Full ${genres[0]} lineup — maximum genre bonus active`);
    } else if (genres.length >= 4) {
      tips.push({
        icon: '💡',
        title: 'Mixed genres — no genre bonus',
        detail: `Your lineup spans ${genres.length} genres. Running 5 girls of the same genre activates a full genre bonus. Consider consolidating if your girls allow it.`,
        severity: 'info',
        stat: 'genre'
      });
    }

    // Sort tips: critical first, then warnings, then info
    const severityOrder = { critical: 0, warning: 1, info: 2 };
    tips.sort((a, b) => (severityOrder[a.severity] || 2) - (severityOrder[b.severity] || 2));

    return { tips, warnings, strengths, totals };
  }

  // Wire grader into the lineup builder
  // We'll expose this so renderManualSlots can call it
  window.runLineupGrade = function(girls, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const filled = girls.filter(Boolean);
    if (filled.length < 2) {
      el.innerHTML = '<p style="font-size:var(--text-sm);color:var(--color-text-faint);margin-top:var(--space-3);">Add at least 2 girls to get lineup tips.</p>';
      return;
    }

    const { tips, warnings, strengths, totals } = gradeLineup(filled);
    const allFeedback = [...warnings, ...tips];

    el.innerHTML = `
      <div class="grade-panel">
        <div class="grade-panel-title">Lineup Analysis</div>
        ${strengths.length ? `
          <div class="grade-section">
            <div class="grade-section-label grade-green">✓ Strengths</div>
            ${strengths.map(s => `<div class="grade-item grade-item--good">✓ ${s}</div>`).join('')}
          </div>
        ` : ''}
        ${allFeedback.length ? `
          <div class="grade-section">
            <div class="grade-section-label">Tips &amp; Warnings</div>
            ${allFeedback.map(t => `
              <div class="grade-item grade-item--${t.severity || 'warning'}">
                <div class="grade-item-title">${t.icon} ${t.title}</div>
                <div class="grade-item-detail">${t.detail}</div>
              </div>
            `).join('')}
          </div>
        ` : '<div class="grade-item grade-item--good">✓ No major issues found with this lineup.</div>'}
      </div>
    `;
  };

})();
