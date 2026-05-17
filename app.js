// Apex Girls Guide — app.js
// =============================================

// === THEME TOGGLE ===
(function () {
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  if (t) {
    updateThemeIcon(t, d);
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      updateThemeIcon(t, d);
    });
  }
  function updateThemeIcon(btn, theme) {
    btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    btn.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// === MOBILE NAV TOGGLE ===
(function () {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
})();

// === SMOOTH SCROLL NAVIGATION ===
document.querySelectorAll('.nav-link[data-tab]').forEach(link => {
  link.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    // close mobile nav
    document.getElementById('mainNav')?.classList.remove('open');
  });
});

// Set active nav on scroll
const sections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link[data-tab]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.dataset.tab === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => observer.observe(s));

// === GIRLS DATA ===
const girlsData = [
  // Tier: Top SSR (level 140 + triple gold)
  { name: 'Aya', genre: 'R&B', position: 'Center', type: 'SSR', sing: 35540, dance: 35540, total: 71080, skill1: '↑70% basic attack damage dealt', skill2: '↑14% fan cap', from: 'Tokyo 4 (warmup)', monthly: true },
  { name: 'Yumeno', genre: 'POP', position: 'Vocalist', type: 'SSR', sing: 42437, dance: 28211, total: 70648, skill1: '↑28% player damage', skill2: '↓12% basic attack damage taken', from: 'Tokyo 4 (dice)', monthly: true },
  { name: 'Mio', genre: 'HipHop', position: 'Dancer', type: 'SSR', sing: 28069, dance: 42152, total: 70221, skill1: '↑70% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Tokyo 4 (shop)', monthly: true },
  { name: 'Sloane', genre: 'POP', position: 'Center', type: 'SSR', sing: 33542, dance: 33542, total: 67084, skill1: '↑28% skill damage', skill2: '↑28% player damage', from: 'Rome 4 (warmup)', monthly: false },
  { name: 'Sienna', genre: 'ROCK', position: 'Center', type: 'SSR', sing: 33542, dance: 33542, total: 67084, skill1: '↑28% player damage', skill2: '↓12% skill damage taken', from: 'Bali 4 (warmup)', monthly: false },
  { name: 'Kendell', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 40439, dance: 26213, total: 66652, skill1: '↑28% player damage', skill2: '↑14% fan cap', from: 'Rome 4 (dice)', monthly: false },
  { name: 'Margot', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 40439, dance: 26213, total: 66652, skill1: '↑28% skill damage', skill2: '↑14% fan cap', from: 'Bali 4 (dice)', monthly: false },
  { name: 'Valerie', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 26071, dance: 40154, total: 66225, skill1: '↑28% skill damage', skill2: '↓12% skill damage taken', from: 'Rome 4 (shop)', monthly: false },
  { name: 'Valentina', genre: 'R&B', position: 'Dancer', type: 'SSR', sing: 26071, dance: 40154, total: 66225, skill1: '↑14% fan cap', skill2: '↓12% basic attack damage taken', from: 'Bali 4 (shop)', monthly: false },
  { name: 'Flora', genre: 'EDM', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑12% fan cap', skill2: '↓12% basic attack damage taken', from: 'Rome 3 (shop)', monthly: true },
  { name: 'Longkui', genre: 'EDM', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑30% skill damage', skill2: '↑30% player damage', from: 'Home Auction', monthly: false },
  { name: 'Haruki', genre: 'HipHop', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑60% basic attack damage dealt', skill2: '↑12% fan cap', from: 'Tokyo 2 (warmup)', monthly: false },
  { name: 'Isla', genre: 'POP', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑24% player damage', skill2: '↓12% skill damage taken', from: 'Bali 3 (warmup)', monthly: false },
  { name: 'Octavia', genre: 'POP', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑240 dps when attacking company', skill2: '↑12% fan cap', from: 'Rome 2 (shop)', monthly: true },
  { name: 'Monica', genre: 'R&B', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑30% player damage', skill2: '↑30% player damage', from: 'Abroad Auction', monthly: false },
  { name: 'Dewi', genre: 'R&B', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑24% skill damage', skill2: '↑60% basic attack damage dealt', from: 'Bali 2 (warmup)', monthly: false },
  { name: 'Hikari', genre: 'ROCK', position: 'Center', type: 'SSR', sing: 29950, dance: 29950, total: 59900, skill1: '↑24% player damage', skill2: '↓12% skill damage taken', from: 'Tokyo 3 (warmup)', monthly: false },
  { name: 'Aurelia', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑24% player damage', skill2: '↑12% fan cap', from: 'Rome 2 (warmup)', monthly: false },
  { name: 'Rin', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑24% skill damage', skill2: '↑12% fan cap', from: 'Tokyo 3 (dice)', monthly: true },
  { name: 'Miyuki', genre: 'EDM', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑60% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Tokyo 2 (shop)', monthly: true },
  { name: 'Ningsih', genre: 'HipHop', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑240 dps when attacking company', skill2: '↑12% fan cap', from: 'Bali 2 (shop)', monthly: true },
  { name: 'Marina', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑240 dps when attacking gc/club/lm', skill2: '↑12% fan cap', from: 'Bali 3 (dice)', monthly: true },
  { name: 'Claudius', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑24% player damage', skill2: '↑24% player damage', from: 'Rome 3 (warmup)', monthly: false },
  { name: 'Lestari', genre: 'POP', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑240 dps when defending', skill2: '↑36% damage to world building guard', from: 'Bali 2 (dice)', monthly: true },
  { name: 'Cornelia', genre: 'R&B', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑240 dps when defending', skill2: '↓12% skill damage taken', from: 'Rome 2 (dice)', monthly: true },
  { name: 'Eri', genre: 'R&B', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑12% fan cap', skill2: '↓12% basic attack damage taken', from: 'Tokyo 3 (shop)', monthly: true },
  { name: 'Vivienne', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑240 dps when defending', skill2: '↓12% basic attack damage taken', from: 'Bali 3 (shop)', monthly: true },
  { name: 'Kasha', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑24% player damage', skill2: '↑60% basic attack damage dealt', from: 'Anniversary', monthly: true },
  { name: 'Antonia', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 25071, dance: 34827, total: 59898, skill1: '↑24% skill damage', skill2: '↑12% fan cap', from: 'Rome 3 (dice)', monthly: true },
  { name: 'Riku', genre: 'ROCK', position: 'Vocalist', type: 'SSR', sing: 34827, dance: 25071, total: 59898, skill1: '↑24% player damage', skill2: '↓12% basic attack damage taken', from: 'Tokyo 2 (dice)', monthly: true },
  // Mid-tier SSR
  { name: 'Kokoro', genre: 'EDM', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑20% skill damage', skill2: '↑60% basic attack damage dealt', from: 'Tokyo 1 (shop)', monthly: true },
  { name: 'Anya', genre: 'EDM', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑200 dps when attacking gc/club/lm', skill2: '↑10% fan cap', from: 'Anniversary', monthly: true },
  { name: 'Daphne', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Rome 1 (shop)', monthly: true },
  { name: 'Hestia', genre: 'HipHop', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑20% player damage', skill2: '↑10% rally cap', from: 'New Star Artist Event', monthly: true },
  { name: 'Chizuru', genre: 'POP', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑20% player damage', skill2: '↑10% rally cap', from: 'Tokyo 1 (warmup)', monthly: true },
  { name: 'Eirene', genre: 'R&B', position: 'Vocalist', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Rome 1 (dice)', monthly: true },
  { name: 'Talia', genre: 'ROCK', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap', from: 'Bali 1 (dice)', monthly: true },
  { name: 'Mellissa', genre: 'ROCK', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap', from: 'New Star Artist Event', monthly: true },
  { name: 'Noora', genre: 'R&B', position: 'Center', type: 'SSR', sing: 24959, dance: 24959, total: 49918, skill1: '↑40% gold mining speed', skill2: '↑50% basic attack damage dealt', from: 'New Star Artist Event', monthly: false },
  { name: 'Kelly', genre: 'ROCK', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑10% fan cap', skill2: '↑10% rally cap', from: 'New Star Artist Event', monthly: false },
  { name: 'Sari', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑20% player damage', skill2: '↑10% rally cap', from: 'Bali 1 (warmup)', monthly: true },
  { name: 'Xenia', genre: 'EDM', position: 'Center', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑20% player damage', skill2: '↑10% rally cap', from: 'Rome 1 (warmup)', monthly: true },
  { name: 'Nastassja', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑20% player damage', skill2: '↑10% rally cap', from: 'New Star Artist Event', monthly: true },
  { name: 'Leilani', genre: 'HipHop', position: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Bali 1 (slot 1)', monthly: true },
  { name: 'Ayaka', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Tokyo 1 (slot 1)', monthly: true },
  { name: 'Moana', genre: 'POP', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Bali 1 (shop)', monthly: true },
  { name: 'Ruby', genre: 'POP', position: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑20% player damage', skill2: '↑50% basic attack damage dealt', from: 'New Star Artist Event', monthly: true },
  { name: 'Ariadne', genre: 'POP', position: 'Center', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Rome 1 (slot 1)', monthly: true },
  { name: 'Rosemary', genre: 'POP', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap', from: 'New Star Artist Event', monthly: true },
  { name: 'Ratih', genre: 'R&B', position: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Bali 1 (slot 2)', monthly: true },
  { name: 'Sora', genre: 'R&B', position: 'Vocalist', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap', from: 'Tokyo 1 (dice)', monthly: true },
  { name: 'Calliope', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 29023, dance: 20893, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↑10% fan cap', from: 'Rome 1 (slot 2)', monthly: true },
  { name: 'Yuuko', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑50% basic attack damage dealt', skill2: '↓12% basic attack damage taken', from: 'Tokyo 1 (slot 2)', monthly: true },
  { name: 'Megan', genre: 'HipHop', position: 'Dancer', type: 'SSR', sing: 20893, dance: 29023, total: 49916, skill1: '↑20% player damage', skill2: '↑40% gold mining speed', from: 'New Star Artist Event', monthly: false },
  // UR Girls
  { name: 'Isadora', genre: 'EDM', position: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Unknown', monthly: false },
  { name: 'Beatrice', genre: 'HipHop', position: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% player damage', skill2: '↑10% fan cap', from: 'Unknown', monthly: false },
  { name: 'Alexandra', genre: 'POP', position: 'Center', type: 'UR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Unknown', monthly: false },
  { name: 'Marguerite', genre: 'R&B', position: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Unknown', monthly: false },
  { name: 'Elizabeth', genre: 'R&B', position: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skill1: '↑20% player damage', skill2: '↑50% basic attack damage dealt', from: 'Unknown', monthly: false },
  { name: 'Josephine', genre: 'HipHop', position: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Unknown', monthly: false },
  { name: 'Anastasia', genre: 'POP', position: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Unknown', monthly: false },
  { name: 'Genevieve', genre: 'ROCK', position: 'Dancer', type: 'UR', sing: 19076, dance: 25851, total: 44927, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Unknown', monthly: false },
  { name: 'Gabriella', genre: 'ROCK', position: 'Vocalist', type: 'UR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% player damage', skill2: '↑20% skill damage', from: 'Unknown', monthly: false },
  // More SSR
  { name: 'Cindy', genre: 'EDM', position: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% skill damage', skill2: '↓12% basic attack damage taken', from: 'SvS Event', monthly: false },
  { name: 'Everly', genre: 'EDM', position: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% skill damage', skill2: '↓12% basic attack damage taken', from: 'Monthly Card', monthly: true },
  { name: 'Audrey', genre: 'HipHop', position: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑30% damage to world building guard', skill2: '↓12% skill damage taken', from: 'Monthly Card', monthly: true },
  { name: 'Aurora', genre: 'POP', position: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Monthly Card', monthly: true },
  { name: 'Nova', genre: 'R&B', position: 'Dancer', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑200 dps when defending', skill2: '↑50% basic attack damage dealt', from: 'Monthly Card', monthly: true },
  { name: 'Claire', genre: 'ROCK', position: 'Center', type: 'SSR', sing: 22464, dance: 22464, total: 44928, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Monthly Card', monthly: true },
  { name: 'Caroline', genre: 'EDM', position: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↑200 dps when attacking gc/club/lm', skill2: '↑10% fan cap', from: 'VIP Store', monthly: false },
  { name: 'Alice', genre: 'EDM', position: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑50% basic attack damage dealt', from: 'Monthly Card', monthly: true },
  { name: 'Bella', genre: 'HipHop', position: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑10% fan cap', from: 'VIP Store', monthly: false },
  { name: 'Avery', genre: 'HipHop', position: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Monthly Card', monthly: true },
  { name: 'Savannah', genre: 'POP', position: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↑200 dps when attacking company', skill2: '↑10% fan cap', from: 'Monthly Card', monthly: true },
  { name: 'Brooklyn', genre: 'POP', position: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skill1: '↑200 dps when defending', skill2: '↑30% damage to world building guard', from: 'Monthly Card', monthly: true },
  { name: 'Julia', genre: 'R&B', position: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑75% drive speed', from: 'Monthly Card', monthly: true },
  { name: 'Zendaya', genre: 'R&B', position: 'Center', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↑50% drive speed, ↑20% WBG damage', skill2: '↑50% basic attack damage dealt', from: 'Monthly Card', monthly: true },
  { name: 'Kesnia', genre: 'R&B', position: 'Vocalist', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↑40% gold mining speed', skill2: '↑40% gold mining speed', from: 'SvS Event', monthly: false },
  { name: 'Paisley', genre: 'ROCK', position: 'Dancer', type: 'SSR', sing: 19076, dance: 25851, total: 44927, skill1: '↓12% skill damage taken', skill2: '↓12% basic attack damage taken', from: 'Monthly Card', monthly: true },
  { name: 'Skylar', genre: 'ROCK', position: 'Vocalist', type: 'SSR', sing: 25851, dance: 19076, total: 44927, skill1: '↑20% skill damage', skill2: '↑30% damage to world building guard', from: 'Monthly Card', monthly: true },
  // Lineup Calculator entries
  { name: 'Rena', genre: 'R&B', position: 'Vocalist', type: 'SSR', sing: 44047, dance: 22691, total: 67000, skill1: '↑32% skill damage', skill2: '↑32% normal damage / ↓12% damage taken', from: 'Unknown', monthly: false },
];

// Sort by total desc
girlsData.sort((a, b) => b.total - a.total);

function getGenreClass(genre) {
  const map = { 'R&B': 'rnb', 'POP': 'pop', 'ROCK': 'rock', 'HipHop': 'hiphop', 'EDM': 'edm' };
  return map[genre] || '';
}
function getPositionClass(pos) {
  const map = { 'Center': 'center', 'Vocalist': 'vocalist', 'Dancer': 'dancer' };
  return map[pos] || '';
}

function renderGirls(data) {
  const container = document.getElementById('girlsGrid');
  if (!container) return;
  if (data.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-muted); grid-column: 1/-1;">No girls match your filters.</p>';
    return;
  }
  container.innerHTML = data.map(g => `
    <div class="girl-card" role="listitem">
      <div class="girl-card-header">
        <span class="girl-name">${g.name}</span>
        <div style="display:flex; gap: var(--space-1); flex-wrap:wrap;">
          <span class="badge badge-${g.type.toLowerCase()}">${g.type}</span>
          <span class="badge badge-${getGenreClass(g.genre)}">${g.genre}</span>
        </div>
      </div>
      <div style="display:flex; gap: var(--space-2); flex-wrap:wrap; margin-bottom: var(--space-2);">
        <span class="badge badge-${getPositionClass(g.position)}">${g.position}</span>
        ${g.monthly ? '<span class="badge" style="background: color-mix(in srgb, var(--color-gold) 15%, transparent); color: var(--color-gold); border: 1px solid color-mix(in srgb, var(--color-gold) 30%, transparent);">Monthly Card</span>' : ''}
      </div>
      <div class="girl-stats">
        <div class="girl-stat">
          <span class="girl-stat-label">Sing</span>
          <span class="girl-stat-value">${g.sing.toLocaleString()}</span>
        </div>
        <div class="girl-stat">
          <span class="girl-stat-label">Dance</span>
          <span class="girl-stat-value">${g.dance.toLocaleString()}</span>
        </div>
        <div class="girl-stat">
          <span class="girl-stat-label">Total</span>
          <span class="girl-stat-value" style="color: var(--color-primary);">${g.total.toLocaleString()}</span>
        </div>
        <div class="girl-stat">
          <span class="girl-stat-label">From</span>
          <span class="girl-stat-value" style="font-size: var(--text-xs);">${g.from}</span>
        </div>
      </div>
      <div class="girl-skill">
        <strong>Skill 1:</strong> ${g.skill1}<br/>
        <strong>Skill 2:</strong> ${g.skill2}
      </div>
    </div>
  `).join('');
}

// Filter logic
function filterGirls() {
  const search = (document.getElementById('girlSearch')?.value || '').toLowerCase();
  const genre = document.getElementById('genreFilter')?.value || '';
  const position = document.getElementById('positionFilter')?.value || '';
  const rarity = document.getElementById('rarityFilter')?.value || '';
  const filtered = girlsData.filter(g =>
    (!search || g.name.toLowerCase().includes(search)) &&
    (!genre || g.genre === genre) &&
    (!position || g.position === position) &&
    (!rarity || g.type === rarity)
  );
  renderGirls(filtered);
}

document.getElementById('girlSearch')?.addEventListener('input', filterGirls);
document.getElementById('genreFilter')?.addEventListener('change', filterGirls);
document.getElementById('positionFilter')?.addEventListener('change', filterGirls);
document.getElementById('rarityFilter')?.addEventListener('change', filterGirls);
renderGirls(girlsData);

// === ARTIST DATA ===
const artistData = [
  { name: 'Chizuru', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'Just finish her, ToB', priority: 'Done' },
  { name: 'Riku', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'Just finish her, before Tokyo 4', priority: 'Done' },
  { name: 'Lestari', skill1: 3, skill2: 3, skill3: 3, existing: 197, required: 4603, role: 'LM/Tower Team', priority: 'Long Term Project' },
  { name: 'Anya', skill1: 2, skill2: 4, skill3: 4, existing: 200, required: 3700, role: 'LM/Tower Team', priority: 'Long Term Project' },
  { name: 'Ayaka', skill1: 3, skill2: 3, skill3: 3, existing: 2000, required: 2800, role: 'Defense Team', priority: '2C' },
  { name: 'Julia', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'Just finish her, Speed Team', priority: 'Done' },
  { name: 'Calliope', skill1: 2, skill2: 2, skill3: 3, existing: 0, required: 5400, role: 'Rock Team — Basic Attack and Fan Cap', priority: 'Long Term Project' },
  { name: 'Yuuko', skill1: 3, skill2: 3, skill3: 3, existing: 400, required: 4400, role: 'Rock Team — Basic Attack and Reduce Basic Attack', priority: 'Long Term Project' },
  { name: 'Haruki', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'Hip Hop — Basic Attack and Fan Cap', priority: 'Done' },
  { name: 'Ruby', skill1: 3, skill2: 4, skill3: 3, existing: 0, required: 4200, role: 'Pop — STRONG — Basic Attack and Damage to Player', priority: '1' },
  { name: 'Eri', skill1: 3, skill2: 3, skill3: 4, existing: 0, required: 4200, role: 'Pop — Basic Attack and Reduce Basic Attack', priority: 'Long Term Project' },
  { name: 'Ariadne', skill1: 3, skill2: 3, skill3: 3, existing: 0, required: 4800, role: 'Pop — STRONG — Basic Attack Increase and Reduce', priority: '2B' },
  { name: 'Eirene', skill1: 3, skill2: 4, skill3: 4, existing: 88, required: 3512, role: 'R&B — Basic Attack Increase and Reduce', priority: 'Long Term Project' },
  { name: 'Dewi', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'R&B — SUPER STRONG — Basic and Skill Attack', priority: 'Done' },
  { name: 'Nastassja', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'ToB', priority: 'Done' },
  { name: 'Sari', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'ToB', priority: 'Done' },
  { name: 'Vivienne', skill1: 0, skill2: 0, skill3: 0, existing: 300, required: 5700, role: 'LM/Tower Team — Defense', priority: 'Long Term Project' },
  { name: 'Kasha', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'Rock — SUPER STRONG — Basic Attack and D2P', priority: 'Done' },
  { name: 'Cornelia', skill1: 0, skill2: 0, skill3: 0, existing: 879, required: 5121, role: 'LM/Tower Team — Defense', priority: 'Long Term Project' },
  { name: 'Octavia', skill1: 0, skill2: 0, skill3: 0, existing: 300, required: 5700, role: 'HQ Attacker — Extra Damage on HQs & Fan Cap', priority: 'Long Term Project' },
  { name: 'Xenia', skill1: 5, skill2: 5, skill3: 5, existing: 0, required: 0, role: 'ToB', priority: 'Done' },
  { name: 'Daphne', skill1: 2, skill2: 2, skill3: 3, existing: 1450, required: 3950, role: 'Hip Hop — FIGHTER — Basic and Skill Attack', priority: '2A' },
  { name: 'Rosemary', skill1: 0, skill2: 0, skill3: 0, existing: 2700, required: 3300, role: 'Long Term Project', priority: 'Long Term Project' },
  { name: 'Flora', skill1: 0, skill2: 0, skill3: 0, existing: 300, required: 5700, role: 'Long Term Project', priority: 'Long Term Project' },
  { name: 'Sora', skill1: 0, skill2: 0, skill3: 0, existing: 3, required: 5997, role: 'Long Term Project — Monthly Card', priority: 'Long Term Project' },
  { name: 'Aurora', skill1: 3, skill2: 3, skill3: 3, existing: 300, required: 4500, role: 'Pop — Increase Basic and Skill', priority: 'Long Term Project' },
  { name: 'Antonia', skill1: 0, skill2: 0, skill3: 0, existing: 2330, required: 3670, role: 'Long Term Project', priority: 'Long Term Project' },
];

function getPriorityBadge(p) {
  if (p === 'Done') return '<span class="badge badge-done">Done</span>';
  if (p === '1') return '<span class="badge badge-priority">Priority 1</span>';
  if (p === '2A' || p === '2B' || p === '2C') return `<span class="badge badge-priority" style="background: color-mix(in srgb, var(--color-info, #82b1ff) 20%, transparent); color: var(--color-info, #82b1ff); border-color: var(--color-info, #82b1ff);">Priority ${p}</span>`;
  return '<span class="badge" style="background: var(--color-surface-offset); color: var(--color-text-muted);">Long Term</span>';
}

function renderArtists(data) {
  const container = document.getElementById('artistGrid');
  if (!container) return;
  if (data.length === 0) {
    container.innerHTML = '<p style="color: var(--color-text-muted); grid-column: 1/-1;">No artists match your filters.</p>';
    return;
  }
  container.innerHTML = data.map(a => `
    <div class="girl-card" role="listitem">
      <div class="girl-card-header">
        <span class="girl-name">${a.name}</span>
        ${getPriorityBadge(a.priority)}
      </div>
      <div class="girl-stats">
        <div class="girl-stat">
          <span class="girl-stat-label">Skill Targets</span>
          <span class="girl-stat-value">${a.skill1} / ${a.skill2} / ${a.skill3}</span>
        </div>
        <div class="girl-stat">
          <span class="girl-stat-label">Photos Needed</span>
          <span class="girl-stat-value" style="color: ${a.required === 0 ? 'var(--color-success)' : 'var(--color-warning)'};">${a.required.toLocaleString()}</span>
        </div>
        <div class="girl-stat">
          <span class="girl-stat-label">Have</span>
          <span class="girl-stat-value">${a.existing.toLocaleString()}</span>
        </div>
      </div>
      <div class="girl-skill">${a.role}</div>
    </div>
  `).join('');
}

function filterArtists() {
  const search = (document.getElementById('artistSearch')?.value || '').toLowerCase();
  const priority = document.getElementById('priorityFilter')?.value || '';
  const filtered = artistData.filter(a =>
    (!search || a.name.toLowerCase().includes(search)) &&
    (!priority || a.priority === priority)
  );
  renderArtists(filtered);
}

document.getElementById('artistSearch')?.addEventListener('input', filterArtists);
document.getElementById('priorityFilter')?.addEventListener('change', filterArtists);
renderArtists(artistData);

// === CEO EVENT TABS ===
document.querySelectorAll('[data-ceo]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-ceo]').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    document.querySelectorAll('.ceo-panel').forEach(p => p.style.display = 'none');
    const panel = document.getElementById('ceo-' + btn.dataset.ceo);
    if (panel) panel.style.display = 'block';
  });
});

// === BLUEPRINTS TABLE ===
const bpRequirements = [
  [1, 2, null], [2, 3, null], [3, 4, null], [4, 5, null], [5, 6, null],
  [6, 7, null], [7, 8, null], [8, 9, null], [9, 10, null], [10, 11, 28800],
  [11, 12, 125700], [12, 13, 141000], [13, 14, 123000], [14, 15, 162000],
  [15, 16, 189000], [16, 17, 222000], [17, 18, 258000], [18, 19, 315000],
  [19, 20, 372000], [20, 21, 429000], [21, 'MAX', 486000],
];

(function renderBPTable() {
  const tbody = document.getElementById('bpTable');
  if (!tbody) return;
  let cumulative = 0;
  tbody.innerHTML = bpRequirements.map(([level, next, req]) => {
    if (req !== null) cumulative += req;
    return `<tr>
      <td>${level}</td>
      <td>${next}</td>
      <td class="num">${req !== null ? req.toLocaleString() : '<span style="color:var(--color-text-faint)">Need data</span>'}</td>
      <td class="num">${req !== null ? cumulative.toLocaleString() : '—'}</td>
    </tr>`;
  }).join('');
})();

// === CAR PARTS TABLE ===
const carParts = [
  ['A', '0', 10, 40, 4], ['B', '0', 70, 280, 20], ['B', '*', 220, 880, 80],
  ['C', '0', 780, 3120, 200], ['C', '*', 960, 3840, 500], ['C', '**', 1140, 4560, 1000],
  ['D', '0', 2300, 9200, 1200], ['D', '*', 2800, 11200, 1400], ['D', '**', 3300, 13200, 1800],
  ['D', '***', 3800, 15200, 2000],
  ['E', '0', 5800, 23200, 2300], ['E', '*', 6550, 26200, 2600], ['E', '**', 7300, 29200, 2900],
  ['E', '***', 8050, 32200, 3200], ['E', '****', 8800, 35200, 3500], ['E', '*****', 9550, 38200, 4000],
  ['S', '0', 10300, 41200, 4000], ['S', '*', 11050, 44200, 4000], ['S', '**', 11800, 47200, 4000],
  ['S', '***', 12550, 50200, 4000], ['S', '****', 13340, 53360, 4000], ['S', '*****', 14500, 58000, 8000],
  ['SS', '0', 16500, 66000, 8000], ['SS', '*', 19000, 76000, 8000], ['SS', '**', 21500, 86000, 11500],
  ['SS', '***', 24000, 96000, 11500], ['SS', '****', 28000, 112000, 15000], ['SS', '*****', 33000, 132000, 20000],
  ['SSS', '0', 39500, 158000, 20000], ['SSS', '*', 47000, 188000, 20000], ['SSS', '**', 56000, 224000, 20000],
  ['SSS', '***', 69000, 276000, 20000], ['SSS', '****', 90000, 360000, 20000],
];

(function renderCarParts() {
  const tbody = document.getElementById('carPartsTable');
  if (!tbody) return;
  tbody.innerHTML = carParts.map(([rank, stars, perPart, all4, drawings]) => {
    const rankColor = rank === 'SSS' ? 'var(--color-error)' : rank === 'SS' ? 'var(--color-warning)' : rank === 'S' ? 'var(--color-primary)' : 'var(--color-text-muted)';
    return `<tr>
      <td style="color: ${rankColor}; font-weight: 700; font-family: var(--font-display);">${rank}</td>
      <td>${stars}</td>
      <td class="num">${perPart.toLocaleString()}</td>
      <td class="num" style="color: var(--color-gold);">${all4.toLocaleString()}</td>
      <td class="num">${drawings.toLocaleString()}</td>
    </tr>`;
  }).join('');
})();

// === GEMS CALCULATOR ===
// Gem per level data
const gemsPerLevel = [
  0, 5, 22, 45, 75, 112, 156, 208, 267, 334, 410,
  494, 586, 688, 798, 916, 1044, 1182, 1328, 1484, 1649,
  1824, 2009, 2204, 2408, 2623, 2847, 3082, 3326, 3581, 3847,
  4123, 4409, 4706, 5013, 5332, 5661, 6000, 6351, 6713, 7085,
  7469, 7863, 8269, 8686, 9115, 9554, 10005, 10467, 10941
];

document.getElementById('calcGemsBtn')?.addEventListener('click', () => {
  const from = parseInt(document.getElementById('gemFromLevel').value) || 1;
  const to = parseInt(document.getElementById('gemToLevel').value) || 50;
  const colls = parseInt(document.getElementById('gemCollections').value) || 1;
  if (from >= to) { document.getElementById('gemResult').textContent = 'From must be less than To.'; return; }
  const clampFrom = Math.max(1, Math.min(from, 50));
  const clampTo = Math.max(1, Math.min(to, 50));
  let total = 0;
  for (let i = clampFrom; i < clampTo; i++) {
    total += gemsPerLevel[i] || 0;
  }
  total *= colls;
  document.getElementById('gemResult').innerHTML = `
    <span style="color: var(--color-text-muted); font-size: var(--text-sm); font-weight: 400;">Levels ${clampFrom}→${clampTo} × ${colls} collection(s):</span><br>
    <span style="color: var(--color-primary);">${total.toLocaleString()} gems</span>
  `;
});

// === ABROAD SHOP CALCULATOR ===
const abroadItems = [
  { name: 'Girl Photos (SSR)', cost: 100, qty: 500, total: 50000 },
  { name: 'SSR Promo Cards', cost: 24, qty: 2000, total: 48000 },
  { name: 'SR Promo Cards', cost: 9, qty: 4000, total: 36000 },
  { name: 'Promo Manuals', cost: 750, qty: 200, total: 150000 },
  { name: 'Yellow House', cost: 50000, qty: 1, total: 50000 },
  { name: 'Yellow Car', cost: 25000, qty: 1, total: 25000 },
  { name: 'Blueprints', cost: 3, qty: 10000, total: 30000 },
  { name: 'Car Parts', cost: 3, qty: 10000, total: 30000 },
  { name: 'Glass', cost: 3, qty: 20000, total: 60000 },
  { name: 'Yellow Gems', cost: 6, qty: 5000, total: 30000 },
  { name: 'Purple Gems', cost: 3, qty: 10000, total: 30000 },
];

function updateAbroadCalc() {
  const coins = parseInt(document.getElementById('abroadCoins')?.value) || 0;
  const statusEl = document.getElementById('abroadStatus');
  const itemsEl = document.getElementById('abroadItems');
  if (!statusEl || !itemsEl) return;

  const affordable = abroadItems.filter(item => item.total <= coins);
  const totalCost = affordable.reduce((s, i) => s + i.total, 0);
  const remaining = coins - totalCost;

  statusEl.textContent = affordable.length > 0
    ? `✓ Can afford ${affordable.length} items — ${remaining.toLocaleString()} coins remaining`
    : 'Not enough coins for any full item bundle.';
  statusEl.style.color = affordable.length > 0 ? 'var(--color-success)' : 'var(--color-error)';

  itemsEl.innerHTML = abroadItems.map(item => `
    <div style="display:flex; justify-content: space-between; align-items:center; padding: var(--space-2) 0; border-bottom: 1px solid var(--color-divider); font-size: var(--text-sm);">
      <span style="color: ${item.total <= coins ? 'var(--color-text)' : 'var(--color-text-faint)'};">${item.name}</span>
      <span style="font-variant-numeric: tabular-nums; font-weight: 600; color: ${item.total <= coins ? 'var(--color-success)' : 'var(--color-error)'};">${item.total.toLocaleString()}</span>
    </div>
  `).join('');
}

document.getElementById('abroadCoins')?.addEventListener('input', updateAbroadCalc);
updateAbroadCalc();
